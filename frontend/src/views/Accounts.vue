<template>
  <div>
    <h2 class="subtitle has-text-weight-light is-size-4 is-family-secondary">
      All accounts:
    </h2>
    <div v-if="!accountsPending">
      <div v-if="allAccounts.length < 1">
        Please create an account to use this feature!
        <br />
      </div>

      <div v-else>
        <accounts-bar :accounts="allAccounts" />
      </div>
      <div class="mt-5">
        <create-account-modal variant="button" />
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import AccountsBar from "@/components/AccountsBar";
import CreateAccountModal from "@/components/AccountsModal/CreateAccountModal";

export default {
  name: "Accounts",
  components: {
    "accounts-bar": AccountsBar,
    "create-account-modal": CreateAccountModal,
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
      accountsPending: "accounts/isPending",
    }),
  },
};
</script>
