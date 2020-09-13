<template>
  <div>
    <div v-if="!accountsPending">
      <accounts-bar class="mb-5" :accounts="allAccounts" />
      <div class="columns">
        <div class="column is-one-third">
          <div v-if="account" class="account-info-box">
            <h2 class="has-text-secondary has-text-weight-bold is-size-4">
              {{ account.name }}
            </h2>

            <div class="small-info">
              <span
                class="has-text-left"
                :class="
                  account.balance > 0 ? 'has-text-success' : 'has-text-danger'
                "
                >&euro;{{ account.balance }}</span
              >
              |
              <span class="has-text-grey-lighter has-text-left">{{
                account.description
              }}</span>
              <!-- TODO: Add link to account edit page  (perhaps replace with router-link -->
              <a href="#" class="has-text-right is-size-7">Edit Account</a>
            </div>
          </div>
        </div>
        <div class="column is-one-third">
          <transactions-list
            type="income"
            :transactions="account.income_set"
            :accounts="[account]"
          />
        </div>
        <div class="column is-one-third">
          <transactions-list
            type="expense"
            :transactions="account.expense_set"
            :accounts="[account]"
          />
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import AccountsBar from "@/components/AccountsBar";
import TransactionsList from "@/components/TransactionsList";

export default {
  name: "Account",
  components: {
    "accounts-bar": AccountsBar,
    "transactions-list": TransactionsList,
  },
  mounted() {
    if (this.allAccounts.length === 0) {
      this.$store.dispatch("accounts/getAllAccounts");
    }
  },
  computed: {
    ...mapGetters({
      allAccounts: "accounts/allAccounts",
      accountsPending: "accounts/isPending",
    }),
    account() {
      return this.$store.getters["accounts/getAccountByPk"](
        this.$route.params.pk
      );
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/settings.scss";
.account-info-box {
  padding: 10px;
  // width: 200px;
  // margin-right: 50px;
  border: 1px solid $backgroundHighlight;
  transition: box-shadow 0.2s linear;
  &:hover {
    box-shadow: 9px 8px 0px 0px $backgroundHighlight;
  }

  .small-info {
    position: relative;
    a {
      display: inline-block;
      right: 0px;
      bottom: 0px;

      position: absolute;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
