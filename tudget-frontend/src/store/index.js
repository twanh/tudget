import Vue from "vue";
import Vuex from "vuex";

import accounts from "./accounts";
import transactions from "./transactions";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    accounts,
    transactions,
  },
});
