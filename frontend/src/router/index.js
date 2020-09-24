import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/accounts",
    name: "Accounts",
    component: () =>
      import(/* webpackChunkName: "accounts" */ "../views/Accounts.vue"),
    meta: {
      requiresLogin: true,
    },
  },
  {
    path: "/account/:pk",
    name: "Account",
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/Account.vue"),
    meta: {
      requiresLogin: true,
    },
  },
  {
    path: "/budgets",
    name: "Budgets",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "budgets" */ "../views/Budgets.vue"),
    meta: {
      requiresLogin: true,
    },
  },
  {
    path: "/savings",
    name: "Savings",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "savings" */ "../views/Savings.vue"),
    meta: {
      requiresLogin: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "savings" */ "../views/Login.vue"),
    meta: {
      shouldNotBeLoggedIn: true,
    },
  },
  {
    path: "/logout",
    name: "Logout",
    component: () =>
      import(/* webpackChunkName: "savings" */ "../views/Logout.vue"),
    meta: {
      requiresLogin: true,
    },
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresLogin: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
