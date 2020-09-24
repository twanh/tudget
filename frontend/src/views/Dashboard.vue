<template>
  <div>
    <h2 class="subtitle has-text-weight-light is-size-4 is-family-secondary">
      Dashboard
    </h2>
    <div v-if="!accountsPending">
      <h5 class="subtitle has-text-weight-light is-size-6 has-text-weight-bold">
        All your accounts:
      </h5>
      <accounts-bar :accounts="allAccounts" />
    </div>
    <div class="columns mt-4">
      <div class="column">
        <h5
          class="subtitle has-text-weight-light is-size-6 has-text-weight-bold"
        >
          All your Savings
        </h5>
      </div>
      <div class="column">
        <h5
          class="subtitle has-text-weight-light is-size-6 has-text-weight-bold"
        >
          All your budgets
        </h5>
      </div>
      <div class="column">
        <transactions-list
          v-if="!transactionsPending"
          type="all"
          :accounts="allAccounts"
          :transactions="sortedTransactions.slice(0, 11)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import AccountsBar from "@/components/AccountsBar";
import TransactionsList from "@/components/TransactionsList";

import { sortTransactionsByDate } from "@/utils/sorting";

export default {
  name: "Dashboard",
  components: {
    "accounts-bar": AccountsBar,
    "transactions-list": TransactionsList
  },
  mounted() {
    if (this.allAccounts.length === 0) {
      this.$store.dispatch("accounts/getAllAccounts");
    }

    if (this.allTransactions.length === 0) {
      this.$store.dispatch("transactions/getAllTransactions");
    }
  },
  computed: {
    ...mapGetters({
      allAccounts: "accounts/allAccounts",
      accountsPending: "accounts/isPending",
      allTransactions: "transactions/allTransactions",
      transactionsPending: "transactions/isPending"
    }),
    sortedTransactions() {
      return sortTransactionsByDate(this.allTransactions);
    }
  }
};
</script>
