<template>
  <div>
    <h5 class="subtitle has-text-weight-light is-size-6 has-text-weight-bold">Recent {{this.title}}:</h5>

    <div
      v-for="transaction in transactions"
      class="transaction-box mr-5"
      :key="transaction.pk"
      @click.prevent="handleTransactionClick(transaction.type, transaction.pk)"
    >
      <div class="level mb-0">
        <div class="level-left has-text-secondary">{{transaction.name}}</div>
        <div
          v-if="transaction.type === 'income' "
          class="level-right has-text-success"
        >&euro;{{transaction.amount}}</div>
        <div
          v-if="transaction.type === 'expense' "
          class="level-right has-text-danger"
        >-&euro;{{transaction.amount}}</div>
      </div>

      <div class="level pb-1">
        <div class="level-left is-size-7">{{transaction.account}}</div>
        <div class="level-right is-size-7">Amount</div>
      </div>
    </div>
    <div class="buttons mr-5 mt-3">
      <b-button
        @click="handleAddTransaction()"
        type="is-background-hightlight"
        class="has-text-white"
        expanded
      >Add transaction</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransactionsList",
  // Type: income/exenese/all
  props: ["type", "transactions"],
  methods: {
    handleTransactionClick(type, pk) {
      //! This route does not exist yet !
      this.$router.history.push(`/transactions/${type}/${pk}`);
    },
    handleAddTransaction() {
      //! This route does not exist yet !
      this.$router.history.push("/transactions/add");
    }
  },
  computed: {
    title() {
      if (this.type === "income") {
        return "income";
      } else if (this.type === "expense") {
        return "expense";
      } else {
        return "transactions";
      }
    }
  }
};

// transsaction
// type
// pk
// name
// account
// amount
// spendOn (date)
</script>

<style lang="scss">
@import "../assets/scss/settings.scss";

.transaction-box {
  border-bottom: 1px solid $backgroundHighlight;
  cursor: pointer;
  &:hover {
    box-shadow: inset 0px -5px 0px 0px $backgroundAccent;
    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>