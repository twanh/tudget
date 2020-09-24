import Vue from "vue";
import Vuex from "vuex";

import accounts from "./accounts";
import transactions from "./transactions";
import auth from "./auth";
import budgets from "./budgets";
import groupings from "./groupings";
import savings from "./savings";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    accounts,
    transactions,
    budgets,
    groupings,
    savings
  }
});
