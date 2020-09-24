import { authRequest } from "../../api/requests";

const ACCOUNTS_URL = "savings/";

const state = {
  pending: true,
  accounts: [],
  error: null
};

const mutations = {
  setAccountsSuccess(state, accounts) {
    state.accounts = accounts;
    state.pending = false;
    state.error = null;
  },
  setAccountsError(state, error) {
    state.pending = false;
    state.error = error;
  },
  addAccount(state, account) {
    state.accounts.push(account);
    state.error = null;
  },
  setAccountError(state, error) {
    // Used for general setting of the error
    state.error = error;
  },
  updateAccount(state, account) {
    state.error = null;
    const toUpdateInx = state.accounts.findIndex(
      item => item.pk === account.pk
    );
    const newAccounts = [
      ...state.accounts.slice(0, toUpdateInx),
      account,
      ...state.accounts.slice(toUpdateInx + 1)
    ];
    state.accounts = newAccounts;
  },
  deleteAccount(state, account) {
    state.error = null;
    const indx = state.accounts.findIndex(item => item.pk === account.pk);
    state.accounts.splice(indx, 1);
  }
};
const getters = {
  allAccounts: state => state.accounts,
  isPending: state => state.pending,
  getAccountByPk: state => pk => {
    return state.accounts.find(account => {
      return account.pk === parseInt(pk);
    });
  }
};

const actions = {
  async getAllAccounts(context) {
    // let error;
    try {
      const r = await authRequest.get(ACCOUNTS_URL);
      context.commit("setAccountsSuccess", r.data);
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
  async createAccount(context, account) {
    if (!account.name) {
      //? How do we handle errors like this?
      context.dispatch("setAccountError", "Account name is required!");
      return;
    }
    try {
      const r = await authRequest.post(`${ACCOUNTS_URL}`, account);
      context.commit("addAccount", r.data);
    } catch (error) {
      if (error.response && error.respone.status === 401) {
        await context.dispatch("auth/refreshToken", null, { root: true });
        context.dispatch("createAccount", account);
      } else {
        context.dispatch("setAccountError", String(error)); // Using `String(error)` gives us the readable error message
        console.warn("Error in createAccount", { error, account });
      }
    }
  },
  async updateAccount(context, account) {
    if (!account.pk) {
      throw "Account pk required"; // This is not something the user can handle in the form, so we throw an error here!
    }
    try {
      const url = `${ACCOUNTS_URL}${account.pk}/`;
      const r = await authRequest.patch(url, account);
      context.commit("updateAccount", r.data);
    } catch (error) {
      if (error.response && error.respone.status === 401) {
        await context.dispatch("auth/refreshToken", null, { root: true });
        context.dispatch("updateAccount", account);
      } else {
        context.dispatch("setAccountError", String(error)); // Using `String(error)` gives us the readable error message
        console.warn("Error in updateAccount", { error, account });
      }
    }
  },
  async deleteAccount(context, account) {
    if (!account.pk) {
      throw "Account pk required"; // This is not something the user can handle in the form, so we throw an error here!
    }
    try {
      const url = `${ACCOUNTS_URL}${account.pk}/delete/`;
      await authRequest.get(url);
      context.commit("deleteAccount", account);
    } catch (error) {
      if (error.response && error.respone.status === 401) {
        await context.dispatch("auth/refreshToken", null, { root: true });
        context.dispatch("deleteAccount", account);
      } else {
        context.dispatch("setAccountError", String(error)); // Using `String(error)` gives us the readable error message
        console.warn("Error in deleteAccount", { error, account });
      }
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
