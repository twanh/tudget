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
};
const getters = {
  allTransactions: (state) => {
    return state.transactions;
  },
  isPending: (state) => state.pending,
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
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
