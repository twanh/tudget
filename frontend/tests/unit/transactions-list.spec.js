import { mount, createLocalVue } from "@vue/test-utils";

import store from "@/store/";

import Vuex from "vuex";

import TransactionsList from "@/components/TransactionsList.vue";

import Buefy from "buefy";

// Use localVue to register the bulma (buefy) components used
// in the transcationlist component
const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(Vuex);

// see: https://vue-test-utils.vuejs.org/guides/using-with-vuex.html

describe("TransactionsList.vue", () => {
  beforeEach(() => {
    store = store;
  });

  it("should show all transactions", () => {
    const wrapper = mount(TransactionsList, {
      localVue,

      props: {
        transactions: [
          { name: "Test 1", type: "income", amount: 20, account: 1 },
          { name: "Test 2", type: "income", amount: 20, account: 2 },
          { name: "Test 2", type: "expense", amount: 20, account: 2 }
        ],
        accounts: [
          { pk: 1, name: "Account 1" },
          { pk: 2, name: "Account 2" }
        ],
        type: "income"
      }
    });
  });

  // Should show all transcactions
  // Correct amount
  // + / - depending on the type
  // Should also update the class (color)
  // Correct name
  // Correct date
  // Should show the correct name with the correct transcation
  // Should say "Nothing here yet! Add ... to get started!"
  // Should update title based on the type (all, income, expense)
  // Should open modal with the correct transaction (this.modalTransaction)
  // Should have add transaction button
});
