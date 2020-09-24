<template>
  <div>
    <h5 class="subtitle has-text-weight-light is-size-6 has-text-weight-bold">
      Recent {{ this.title }}:
    </h5>
    <div v-if="transactions.length < 1">
      <span class="is-size-7"
        >Nothing here yet! Add {{ this.title }} to get started!</span
      >
    </div>
    <div v-else>
      <div
        v-for="(transaction, indx) in transactions"
        class="transaction-box mr-5"
        :key="indx"
        @click.prevent="
          handleTransactionClick(transaction.type, transaction.pk)
        "
      >
        <div class="level mb-0">
          <div class="level-left has-text-secondary">
            {{ transaction.name }}
          </div>
          <div
            v-if="transaction.type === 'income'"
            class="level-right has-text-success"
          >
            &euro;{{ transaction.amount }}
          </div>
          <div
            v-if="transaction.type === 'expense'"
            class="level-right has-text-danger"
          >
            -&euro;{{ transaction.amount }}
          </div>
        </div>

        <div class="level pb-1">
          <div class="level-left is-size-7">
            {{ getTransactionAccountName(transaction.account) }}
          </div>
          <div class="level-right is-size-7">{{ transaction.spendOn }}</div>
        </div>
      </div>

      <transaction-modal
        :transactionPk="modalTransaction.pk"
        :transactionType="modalTransaction.type"
        :open="openModal"
        :close="handleModalClose"
        :accountName="getTransactionAccountName(modalTransaction.account)"
      />
    </div>
    <div class="buttons mr-5 mt-3">
      <b-button
        @click="handleAddTransaction()"
        type="is-background-hightlight"
        class="has-text-white"
        expanded
        >Add transaction</b-button
      >
    </div>
  </div>
</template>

<script>
import TransactionModal from "@/components/TransactionModal/TransactionModal";

export default {
  name: "TransactionsList",
  components: {
    TransactionModal
  },
  // Type: income/exenese/all
  props: ["type", "transactions", "accounts"],
  data() {
    return {
      openModal: false,
      modalTransaction: {}
    };
  },
  methods: {
    handleModalClose() {
      this.openModal = false;
    },
    handleTransactionClick(type, pk) {
      //! This route does not exist yet !
      this.modalTransaction = this.transactions.find(
        trans => trans.pk === pk && trans.type === type
      );
      this.openModal = true;
      // this.$router.history.push(`/transactions/${type}/${pk}`);
    },
    handleAddTransaction() {
      //! This route does not exist yet !
      this.$router.history.push("/transactions/add");
    },
    getTransactionAccountName(accountPk) {
      if (this.accounts.length === 1) {
        return this.accounts[0].name;
      }
      const accnt = this.accounts.find(
        account => account.pk === parseInt(accountPk)
      );

      //! FIXME!
      if (!accnt) return "404";

      return accnt.name;
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
