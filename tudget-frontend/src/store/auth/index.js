import { BASE_API_URL } from "../api";

const TOKEN_URL = `${BASE_API_URL}token/`;
const USERS_URL = `${BASE_API_URL}users/`;

const state = {
  accessToken: null, //TODO: Save to local storage and load it here (prevens singingout when reloading)
  refreshToken: null,
  user: {},
  error: null,
};

const mutations = {
  updateAccessToken(state, token) {
    state.accessToken = token;
    state.error = null;
  },
  updateAccessTokenError(state, error) {
    state.error = error;
  },
  updateRefreshToken(state, token) {
    state.refreshToken = token;
  },
  destroyToken(state) {
    state.accesToken = null;
    state.refreshToken = null;
  },
  updateUser(state, user) {
    state.user = user;
  },
};
const getters = {
  loggedIn(state) {
    // If there is an access token, we are logged in.
    return state.accessToken != null;
  },
  hasError(state) {
    return state.error != null;
  },
};
const actions = {
  async refreshToken({ state, commit }) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify({ refresh: state.refreshToken });
    const options = {
      method: "POST",
      headers,
      body,
      redirect: "follow",
    };
    const r = await fetch(`${TOKEN_URL}refresh/`, options).catch((err) =>
      commit("updateAccessTokenError", err)
    );
    const data = await r.json();
    commit("updateAccessToken", data.access);
  },
  async loginUser({ commit }, credentials) {
    let error;
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify({
      username: credentials.username,
      password: credentials.password,
    });
    const options = {
      method: "POST",
      headers,
      body,
      redirect: "follow",
    };
    const r = await fetch(`${TOKEN_URL}`, options).catch(
      (err) => (error = err)
    );
    const data = await r.json();
    if (r.ok && data && !error) {
      commit("updateAccessToken", data.access);
      commit("updateRefreshToken", data.refresh);
    } else {
      console.error("Error when logging in:", { r, data, error });
      commit("updateAccessTokenError", data.detail);
    }
  },
  async registerUser({ commit }, data) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({
      name: data.name,
      username: data.username,
      password: data.password,
      email: data.email,
    });

    const options = {
      method: "POST",
      headers: headers,
      body,
      redirect: "follow",
    };

    const r = await fetch(`${USERS_URL}create/`, options).catch((error) =>
      console.log(error)
    );

    const rData = await r.json();
    commit("updateUser", rData);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
