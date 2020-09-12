import { BASE_API_URL } from "../api";

const ACCOUNTS_URL = BASE_API_URL + "accounts/";

const state = {
  pending: true,
  accounts: [],
  error: null,
};
const mutations = {
  setAccountsSuccess(state, accounts) {
    state.accounts = accounts;
    state.pending = false;
  },
  setAccountsError(state, error) {
    state.pending = false;
    state.error = error;
  },
};
const getters = {
  allAccounts: (state) => state.accounts,
  isPending: (state) => state.pending,
  getAccountByPk: (state) => (pk) => {
    return state.accounts.find((account) => {
      return account.pk === parseInt(pk);
    });
  },
};
const actions = {
  async getAllAccounts({ commit }) {
    let error;
    const r = await fetch(ACCOUNTS_URL).catch((err) => (error = err));
    const accounts = await r.json();
    if (r.ok && accounts.length > 0 && !error) {
      commit("setAccountsSuccess", accounts);
    } else {
      console.error("Error when fetching all accounts: ", error);
      commit("setAccountsError", error);
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
