import { authRequest } from "../../api/requests";

const ACCOUNTS_URL = "accounts/";

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
  async getAllAccounts(context) {
    // let error;
    try {
      const r = await authRequest.get(ACCOUNTS_URL);
      if (r.status === 200) {
        context.commit("setAccountsSuccess", r.data);
      }
    } catch (error) {
      // if the status code is 401, it means there was an authenticatien error
      // so then we refresh the token
      if (error.response && error.response.status === 401) {
        await context.dispatch("auth/refreshToken", null, { root: true });
        context.dispatch("getAllAccounts");
      } else if (error.respose && error.response.data.detail) {
        context.commit("setAccountsError", error.response.data.detail);
      } else {
        console.warn("Error in getAllAccounts", { error });
        context.commit("setAccountsError", error);
      }
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
