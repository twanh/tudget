<template>
  <div>
    <h2 class="subtitle has-text-weight-light is-size-4 is-family-secondary">Dashboard</h2>
    <div v-if="!accountsPending">
      <h5 class="subtitle has-text-weight-light is-size-6 has-text-weight-bold">All your accounts:</h5>
      <accounts-bar :accounts="allAccounts" />
    </div>
    <div class="columns mt-4">
      <div class="column">
        <h5 class="subtitle has-text-weight-light is-size-6 has-text-weight-bold">All your Savings</h5>
      </div>
      <div class="column">
        <h5 class="subtitle has-text-weight-light is-size-6 has-text-weight-bold">All your budgets</h5>
      </div>
      <div class="column">
        <transactions-list
          type="all"
          :transactions="[{
          pk: 0,
          type: 'income',
          name: 'TV',
          account: 'Account #1',
          spendOn: '12/09/20',
          amount: '200'
        }, {
          pk: 1,
          type: 'income',
          name: 'TV',
          account: 'Account #1',
          spendOn: '12/09/20',
          amount: '200'
        }, {
          pk: 2,
          type: 'expense',
          name: 'TV',
          account: 'Account #1',
          spendOn: '12/09/20',
          amount: '200'
        }, ]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import AccountsBar from "@/components/AccountsBar";
import TransactionsList from "@/components/TransactionsList";

export default {
  name: "Dashboard",
  components: {
    "accounts-bar": AccountsBar,
    "transactions-list": TransactionsList
  },
  mounted() {
    let cnt = 0;
    if (this.allAccounts.length === 0) {
      this.$store.dispatch("accounts/getAllAccounts");
      console.log("Loading shit");
      cnt++;
      console.log(cnt);
    }
  },
  computed: {
    ...mapGetters({
      allAccounts: "accounts/allAccounts",
      accountsPending: "accounts/isPending"
    })
  }
};
</script>
