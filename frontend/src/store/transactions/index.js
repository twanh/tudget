import { authRequest } from "../../api/requests";

const TRANSACTIONS_URL = "transactions/";
const EXPENSES_URl = TRANSACTIONS_URL + "expenses/";
const INCOME_URl = TRANSACTIONS_URL + "income/";

const state = {
  pending: true,
  transactions: [],
  error: null,
};

const mutations = {
  setTransactionsSuccess(state, transactions) {
    state.transactions = transactions;
    state.pending = false;
    state.error = null;
  },
  setTransactionsError(state, error) {
    state.pending = false;
    state.error = error;
  },
  deleteTransaction(state, transaction) {
    const indx = state.transactions.findIndex(
      (item) => item.pk === transaction.pk && item.type === transaction.type
    );
    state.transactions.splice(indx, 1);
  },
  updateExpense(state, expense) {
    // Get the index of the item we want to update
    // We need to check for the same primary key (pk) and the expense type, becuase the transactions array
    // can contain items with the same pk becuase it contains expenses & income
    const toUpdateInx = state.transactions.findIndex(
      (item) => item.pk === expense.pk && item.type === "expense"
    );
    console.log("updating expense in the mutations!");
    const newTransactions = [
      ...state.transactions.slice(0, toUpdateInx),
      expense,
      ...state.transactions.slice(toUpdateInx + 1),
    ];
    state.transactions = newTransactions;
  },
  updateIncome(state, income) {
    // Get the index of the item we want to update
    // We need to check for the same primary key (pk) and the expense type, becuase the transactions array
    // can contain items with the same pk becuase it contains expenses & income
    console.log("updating income in the mutations!");
    const toUpdateInx = state.transactions.findIndex(
      (item) => item.pk === income.pk && item.type === "income"
    );
    const newTransactions = [
      ...state.transactions.slice(0, toUpdateInx),
      income,
      ...state.transactions.slice(toUpdateInx + 1),
    ];
    state.transactions = newTransactions;
  },
  addTransaction(state, transaction) {
    state.error = null;
    state.transactions.push(transaction);
  },
};
const getters = {
  allTransactions: (state) => {
    return state.transactions;
  },
  isPending: (state) => state.pending,
  getTransaction: (state) => (pk, type) => {
    return state.transactions.find(
      (transaction) =>
        transaction.pk === parseInt(pk) && transaction.type === type
    );
  },
  getTransactionsFromAccount: (state) => (accountPk) => {
    return state.transactions.filter(
      (trans) => trans.account === parseInt(accountPk)
    );
  },
  getExpensesFromAccount: (state) => (accountPk) => {
    return state.transactions.filter(
      (trans) =>
        trans.account === parseInt(accountPk) && trans.type === "expense"
    );
  },
  getIncomeFromAccount: (state) => (accountPk) => {
    return state.transactions.filter(
      (trans) =>
        trans.account === parseInt(accountPk) && trans.type === "income"
    );
  },
};
const actions = {
  async getAllTransactions(context) {
    try {
      const exp_r = await authRequest.get(EXPENSES_URl);
      const inc_r = await authRequest.get(INCOME_URl);
      const transactions = [...exp_r.data, ...inc_r.data];
      context.commit("setTransactionsSuccess", transactions);
    } catch (error) {
      if (error.response.status === 401) {
        await context.dispatch("auth/refreshToken", null, { root: true });
        context.dispatch("getAllTransactions");
      } else {
        console.warn("Error in getAllTransactions:", { error });
        if (error.response.data.detail) {
          context.commit("setTransactionsError", error.response.data.detail);
        } else {
          context.commit("setTransactionsError", error);
        }
      }
    }
  },
  async updateTransaction(context, transaction) {
    if (transaction.type === "expense") {
      try {
        const url = `${EXPENSES_URl}${transaction.pk}/`;
        const r = await authRequest.patch(url, { ...transaction });
        context.commit("updateExpense", r.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          await context.dispatch("auth/refreshToken", null, { root: true });
          context.dispatch("updateTransaction", transaction);
        } else {
          console.warn("Error in updateTransaction (expense)", {
            transaction,
            error,
          });
        }
      }
    } else if (transaction.type === "income") {
      try {
        const url = `${INCOME_URl}${transaction.pk}/`;
        const r = await authRequest.patch(url, { ...transaction });
        context.commit("updateExpense", r.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          //? This might create an infinite loop if the auth acces token keeps timing out?
          await context.dispatch("auth/refreshToken", null, { root: true });
          context.dispatch("updateTransaction", transaction);
        } else {
          console.warn("Error in updateTransaction", {
            transaction,
            error,
          });
        }
      }
    }
  },
  async deleteTransaction(context, transaction) {
    if (transaction.type === "expense") {
      try {
        const url = `${EXPENSES_URl}${transaction.pk}/delete`;
        await authRequest.get(url);
        context.commit("deleteTransaction", transaction);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          await context.dispatch("auth/refreshToken", null, { root: true });
          context.dispatch("deleteTransaction", transaction);
        } else {
          console.warn("Error in deleteTransaction (expense)", {
            transaction,
            error,
          });
        }
      }
    } else if (transaction.type === "income") {
      try {
        const url = `${INCOME_URl}${transaction.pk}/delete`;
        await authRequest.get(url);
        context.ommit("deleteTransaction", transaction);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          await context.dispatch("auth/refreshToken", null, { root: true });
          context.dispatch("deleteTransaction", transaction);
        } else {
          console.warn("Error in deleteTransaction (income)", {
            transaction,
            error,
          });
        }
      }
    } else {
      console.warn("Transaction type is not correctly set", transaction);
    }
  },
  async createTransaction(context, transaction) {
    if (!transaction.type || !transaction.name || !transaction.account) {
      context.commit(
        "setTransactionsError",
        "Name, account & type are required!"
      );
    }
    if (transaction.type === "expense") {
      try {
        const r = await authRequest.post(EXPENSES_URl, transaction);
        context.commit("createTransaction", r.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          await context.dispatch("auth/refreshToken", null, { root: true });
          context.dispatch("createTransaction", transaction);
        } else {
          console.warn("Error in createTransaction (expense)", {
            transaction,
            error,
          });
        }
      }
    } else if (transaction.type === "income") {
      try {
        const r = await authRequest.post(INCOME_URl, transaction);
        context.commit("createTransaction", r.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          await context.dispatch("auth/refreshToken", null, { root: true });
          context.dispatch("createTransaction", transaction);
        } else {
          console.warn("Error in createTransaction (income)", {
            transaction,
            error,
          });
        }
      }
    } else {
      throw "Transaction type is not set correctly!";
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
