import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/scss/styles.scss";
import Buefy from "buefy";

Vue.config.productionTip = false;

Vue.use(Buefy);

router.beforeEach((to, _, nextFn) => {
  // if the route the user is trying to access has the meta tag `requiredLogin` on it
  // then check if the user is logged in before we let the user go to the route
  if (to.matched.some((record) => record.meta.requiresLogin)) {
    if (store.getters["auth/loggedIn"]) {
      // Allow the user to visit the route
      nextFn();
    } else {
      // Route the user to the login page
      nextFn({ name: "Login" });
    }
  } else if (to.matched.some((record) => record.meta.shouldNotBeLoggedIn)) {
    // some routes (like: login/register) should not be accesible when to user is logged in
    // if the user tries to acces any of these routes (denoted by the meta tag: `shouldNotBeLoggedIn`)
    // then redirect them to the dashboard page
    if (store.getters["auth/loggedIn"]) {
      // redirect to dashboard
      nextFn({ name: "Dashboard" });
    } else {
      // If the user is not logged in they can acces the route
      nextFn();
    }
  } else {
    // If none of the above is true, we will allow the user to acces the route
    nextFn();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
