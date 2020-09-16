import Vue from "vue";
import Vuex from "vuex";

import accounts from "./accounts";
import transactions from "./transactions";
import auth from "./auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    accounts,
    transactions,
  },
});
