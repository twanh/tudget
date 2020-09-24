<template>
  <div>
    <h2 class="subtitle has-text-weight-light is-size-4 is-family-secondary">
      All accounts:
    </h2>
    <div v-if="!accountsPending">
      <accounts-bar :accounts="allAccounts" />
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import AccountsBar from "@/components/AccountsBar";

export default {
  name: "Accounts",
  components: {
    "accounts-bar": AccountsBar
  },
  mounted() {
    if (this.allAccounts.length === 0) {
      this.$store.dispatch("accounts/getAllAccounts");
      console.log("loading");
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
