import { apiRequest } from "../../api/requests";

const TOKEN_URL = `token/`;
const REFRESH_URL = `${TOKEN_URL}refresh/`;
const USERS_URL = `users/`;

const state = {
  accessToken: localStorage.getItem("access_token") || null,
  refreshToken: localStorage.getItem("refresh_token") || null,
  user: {},
  error: null
};

const mutations = {
  updateAccessToken(state, token) {
    state.accessToken = token;
    // TODO: Use a safer way to automatticly log the user in
    localStorage.setItem("access_token", token);
    state.error = null;
  },
  updateAccessTokenError(state, error) {
    state.error = error;
  },
  updateRefreshToken(state, token) {
    state.refreshToken = token;
    localStorage.setItem("refresh_token", token);
    state.error = null;
  },
  destroyToken(state) {
    state.accesToken = null;
    state.refreshToken = null;
  },
  updateUser(state, user) {
    state.user = user;
  }
};
const getters = {
  loggedIn(state) {
    // If there is an access token, we are logged in.
    return state.accessToken != null;
  },
  hasError(state) {
    return state.error != null;
  }
};
const actions = {
  async refreshToken({ state, commit }) {
    console.log("Refreshing token !");
    let error;
    const r = await apiRequest
      .post(REFRESH_URL, {
        refresh: state.refreshToken
      })
      .catch(err => (error = err));

    if (r.status === 200) {
      commit("updateAccessToken", r.data.access);
      return r.data.access; // Return the access token so that we can access it when catching the error that triggers the refresh
    } else {
      // ERROR
      console.warn("Error in refreshToken:", { error, r });
      commit("updateAccessTokenError", r.data.detail);

      return Promise.reject(error);
    }
  },
  async loginUser({ commit }, credentials) {
    let error;
    const r = await apiRequest
      .post(TOKEN_URL, {
        ...credentials
      })
      .catch(err => (error = err));

    if (r.status === 200) {
      commit("updateAccessToken", r.data.access);
      commit("updateRefreshToken", r.data.refresh);
    } else {
      console.warn("Error when logging in:", { r, data: r.data, error });
      commit("updateAccessTokenError", r.data.detail);
    }
  },
  async registerUser({ commit }, data) {
    // TODO: Rework this
    let error;
    const r = await apiRequest
      .post(`${USERS_URL}create/`, {
        ...data
      })
      .catch(err => (error = err));

    if (r.status === 200) {
      commit("updateUser", r.data);
    } else {
      console.warn("Error when registering:", { r, data: r.data, error });
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
