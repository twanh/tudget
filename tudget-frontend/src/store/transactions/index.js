import { BASE_API_URL } from "../api";

const TRANSACTIONS_URL = BASE_API_URL + "transactions/";
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
  },
  setTransactionsError(state, error) {
    state.pending = false;
    state.error = error;
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
  async getAllTransactions({ commit }) {
    let error;
    const exp_req = await fetch(EXPENSES_URl).catch((err) => (error = err));
    const expenses = await exp_req.json();
    const inc_req = await fetch(INCOME_URl).catch((err) => (error = err));
    const income = await inc_req.json();
    const transactions = [...expenses, ...income];

    if (exp_req.ok && inc_req.ok && transactions.length > 0 && !error) {
      commit("setTransactionsSuccess", transactions);
    } else {
      console.error("Error when fetching all transactions: ", error);
      commit("setTransactionsError", error);
    }
  },
  async updateTransaction({ commit }, transaction) {
    if (transaction.type === "expense") {
      let error;
      const url = `${EXPENSES_URl}${transaction.pk}/`;
      const rHeaders = new Headers();
      rHeaders.append("Content-Type", "application/json");
      const settings = {
        method: "PATCH",
        mode: "cors",
        headers: rHeaders,
        body: JSON.stringify(transaction),
        redirect: "follow",
      };
      const r = await fetch(url, settings).catch((err) => (error = err));
      const data = await r.json();
      if (r.ok && data && !error) {
        console.log("commiting expense", data);
        commit("updateExpense", data);
      } else {
        console.error(
          "Something went wrong when trying to update an expense",
          error
        );
      }
      console.log(r);
    } else if (transaction.type === "income") {
      let error;
      const url = `${INCOME_URl}${transaction.pk}/`;
      const rHeaders = new Headers();
      rHeaders.append("Content-Type", "application/json");
      const settings = {
        method: "PATCH",
        mode: "cors",
        headers: rHeaders,
        body: JSON.stringify(transaction),
        redirect: "follow",
      };
      const r = await fetch(url, settings);
      const data = await r.json();
      if (r.ok && data && !error) {
        console.log("commiting income", data);
        commit("updateIncome", data);
      } else {
        console.error("Something went wrong when trying to update an income", {
          error,
          data,
          r,
        });
      }
      console.log(r);
    } else {
      console.error("Transaction type is not correctly set!!!");
    }

    console.log("Updating....");
    console.log(transaction);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
