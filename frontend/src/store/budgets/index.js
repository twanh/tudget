import { authRequest } from "../../api/requests";

const BUDGET_URL = "budgets/";
const CURRENCY_BUDGET_URL = `${BUDGET_URL}currency/`;
const TRANSACTION_BUDGET_URL = `${BUDGET_URL}transaction/`;

function getBudgetType(budget) {
  if (budget.maxAmount) {
    return "currency";
  } else if (budget.maxTransactions) {
    return "transaction";
  } else {
    return "error";
  }
}

const state = {
  pending: true,
  budgets: [],
  error: null
};

const mutations = {
  setBudgetsSuccess(state, budgets) {
    state.budgets = budgets;
    state.pending = false;
    state.error = null;
  },
  setBudgetsError(state, error) {
    state.pending = false;
    state.error = error;
  },
  addBudget(state, budget) {
    state.error = null;
    state.budgets.push(budget);
  },
  updateBudget(state, budget) {
    const updateIndx = state.budgets.findIndex(
      item =>
        item.pk === budget.pk && getBudgetType(item) === getBudgetType(budget)
    );
    const newBudgets = [
      ...state.budgets.slice(0, updateIndx),
      budget,
      ...state.budgets.slice(updateIndx + 1)
    ];
    state.budgets = newBudgets;
  },
  deleteBudget(state, budget) {
    const indx = state.budgets.findIndex(
      item =>
        item.pk === budget.pk && getBudgetType(item) === getBudgetType(budget)
    );
    state.budgets.splice(indx, 1);
  }
};

const getters = {};

const actions = {
  async getAllBudgets(context) {
    try {
      const t_budgets = await authRequest.get(CURRENCY_BUDGET_URL);
      const c_budgets = await authRequest.get(TRANSACTION_BUDGET_URL);
      if (t_budgets.status === 200 && c_budgets.status === 200) {
        const budgets = [...t_budgets.data, ...c_budgets.data];
        context.commit("setBudgetsSuccess", budgets);
      }
    } catch (error) {
      if (error.response.status === 401) {
        await context.dispatch("auth/refreshToken", null, { root: true });
        context.dispatch("getAllBudgets");
      } else {
        console.warn("Error in getAllBudgets:", { error });
        if (error.response.data.detail) {
          context.commit("setBudgetsError", error.response.data.detail);
        } else {
          context.commit("setBudgetsError", error);
        }
      }
    }
  },
  async createBudget(context, budget) {
    if (getBudgetType(budget) === "currency") {
      if (!budget.name || !budget.maxAmount || !budget.filterCategory) {
        context.dispatch(
          "setBudgetsError",
          "Budget name, filter category and max amount are required!"
        );
        return;
      }
      try {
        const r = await authRequest.post(CURRENCY_BUDGET_URL, budget);
        context.commit("addBudget", r.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          await context.dispatch("auth/refreshToken", null, { root: true });
          context.dispatch("createBudget", budget);
        } else {
          context.dispatch("setBudgetsError", String(error));
          console.warn("Error in createBudget", {
            budget,
            error
          });
        }
      }
    } else if (getBudgetType(budget) === "transaction") {
      if (!budget.name || !budget.maxTransactions || !budget.filterCategory) {
        context.dispatch(
          "setBudgetsError",
          "Budget name, filter category and max transactions are required!"
        );
        return;
      }
      try {
        const r = await authRequest.post(TRANSACTION_BUDGET_URL, budget);
        context.commit("addBudget", r.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          await context.dispatch("auth/refreshToken", null, { root: true });
          context.dispatch("createBudget", budget);
        } else {
          context.dispatch("setBudgetsError", String(error));
          console.warn("Error in createBudget", {
            budget,
            error
          });
        }
      }
    } else {
      throw "Budget type is not valid!"; // Throw this error because the user cannot change this!
    }
  },
  async updateBudget(context, budget) {
    if (getBudgetType(budget) === "currency") {
      if (
        !budget.name ||
        !budget.maxAmount ||
        !budget.filterCategory ||
        !budget.pk
      ) {
        context.dispatch(
          "setBudgetsError",
          "Budget name, filter category and max amount are required!"
        );
        return;
      }
      try {
        const r = await authRequest.patch(
          `${CURRENCY_BUDGET_URL}${budget.pk}/`,
          budget
        );
        context.commit("updateBudget", r.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          await context.dispatch("auth/refreshToken", null, { root: true });
          context.dispatch("updateBudget", budget);
        } else {
          context.dispatch("setBudgetsError", String(error));
          console.warn("Error in updateBudget", {
            budget,
            error
          });
        }
      }
    } else if (getBudgetType(budget) === "transaction") {
      if (
        !budget.name ||
        !budget.maxTransactions ||
        !budget.filterCategory ||
        !budget.pk
      ) {
        context.dispatch(
          "setBudgetsError",
          "Budget name, filter category and max transactions are required!"
        );
        return;
      }
      try {
        const r = await authRequest.patch(
          `${TRANSACTION_BUDGET_URL}${budget.pk}/`,
          budget
        );
        context.commit("updateBudget", r.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          await context.dispatch("auth/refreshToken", null, { root: true });
          context.dispatch("updateBudget", budget);
        } else {
          context.dispatch("setBudgetsError", String(error));
          console.warn("Error in updateBudget", {
            budget,
            error
          });
        }
      }
    } else {
      throw "Budget type is not valid!"; // Throw this error because the user cannot change this!
    }
  },
  async deleteBudget(context, budget) {
    if (!budget.pk) {
      throw "A pk needs to be set in order to delete a budget";
    }
    if (getBudgetType(budget) === "currency") {
      try {
        await authRequest.get(`${CURRENCY_BUDGET_URL}${budget.pk}/delete/`);
        context.commit("deleteBudget", budget);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          await context.dispatch("auth/refreshToken", null, { root: true });
          context.dispatch("deleteBudget", budget);
        } else {
          context.dispatch("setBudgetsError", String(err));
          console.warn("Error in deleteBudget", { err, budget });
        }
      }
    } else if (getBudgetType(budget) === "transaction") {
      try {
        await authRequest.get(`${TRANSACTION_BUDGET_URL}${budget.pk}/delete/`);
        context.commit("deleteBudget", budget);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          await context.dispatch("auth/refreshToken", null, { root: true });
          context.dispatch("deleteBudget", budget);
        } else {
          context.dispatch("setBudgetsError", String(err));
          console.warn("Error in deleteBudget", { err, budget });
        }
      }
    } else {
      throw "Budget type is not valid!"; // Throw this error because the user cannot change this!
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
