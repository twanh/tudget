import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/scss/styles.scss";
import Buefy from "buefy";
import TrendChart from "vue-trend-chart";

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(TrendChart);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
