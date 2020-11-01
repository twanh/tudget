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
              <!-- <a href="#" class="has-text-right is-size-7">Edit Account</a> -->
              <edit-account-modal :accountData="account" />
            </div>
          </div>
          <b-collapse
            class="mt-5"
            :open="cashFlowOpen"
            position="is-bottom"
            aria-id="contentIdForA11y1"
          >
            <a
              slot="trigger"
              slot-scope="props"
              aria-controls="contentIdForA11y1"
              @click="fillData()"
            >
              <b-icon :icon="!props.open ? 'menu-down' : 'menu-up'"></b-icon>
              {{ !props.open ? "Show Cashflow" : "Hide Cashflow" }}
            </a>

            <cash-flow-chart
              v-if="!$store.state.transactions.pending"
              :chart-data="cashFlowData"
            />
          </b-collapse>
        </div>
        <div class="column is-one-third">
          <transactions-list
            type="income"
            :transactions="accountIncome"
            :accounts="[account]"
          />
        </div>
        <div class="column is-one-third">
          <transactions-list
            type="expense"
            :transactions="accountExpenses"
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

import EditAccountModal from "@/components/AccountsModal/EditAccountModal";
import AccountsBar from "@/components/AccountsBar";
import TransactionsList from "@/components/TransactionsList";
import CashFlowChart from "@/components/CashFlowChart";

import { sortTransactionsByDate } from "@/utils/sorting";

export default {
  name: "Account",
  components: {
    "edit-account-modal": EditAccountModal,
    "accounts-bar": AccountsBar,
    "transactions-list": TransactionsList,
    "cash-flow-chart": CashFlowChart,
  },
  data() {
    return {
      cashFlowData: {},
      cashFlowOpen: false,
    };
  },
  methods: {
    fillData() {
      const pk = this.$route.params.pk;
      const allTransactions = sortTransactionsByDate(
        this.$store.getters["transactions/getTransactionsFromAccount"](pk)
      ).reverse();
      let labels = allTransactions.map((exp) => {
        return exp.spendOn;
      });

      // Remove duplicates
      labels = labels.filter((label, indx) => labels.indexOf(label) === indx);

      const rawIncomeData = this.$store.getters[
        "transactions/getIncomeFromAccount"
      ](pk);
      const rawExpenseData = this.$store.getters[
        "transactions/getExpensesFromAccount"
      ](pk);

      let incomeData = [];
      let expenseData = [];

      labels.forEach((label) => {
        // Get the income frrom the current label
        const income = rawIncomeData.filter((inc) => inc.spendOn === label);
        if (income.length < 1) {
          incomeData.push(0);
        } else {
          const amounts = income.map((i) => i.amount);
          incomeData.push(amounts.reduce((a, b) => a + b));
        }

        const expense = rawExpenseData.filter((exp) => exp.spendOn === label);
        if (expense.length < 1) {
          expenseData.push(0);
        } else {
          const amounts = expense.map((e) => -e.amount);
          const sum = amounts.reduce((a, b) => a + b);
          console.log({ sum });
          expenseData.push(sum);
        }
      });

      const data = {
        labels,
        datasets: [
          {
            label: "Income",
            backgroundColor: "rgba(39,174,96, 0.3)",

            data: incomeData,
          },
          {
            label: "Expenses",
            backgroundColor: "#e74c3c4d",
            data: expenseData,
          },
        ],
      };
      console.log(data);
      this.cashFlowData = data;
    },
  },

  mounted() {
    if (this.allAccounts.length === 0) {
      this.$store.dispatch("accounts/getAllAccounts");
    }
    if (this.$store.state.transactions.pending) {
      this.$store.dispatch("transactions/getAllTransactions");
    }
    // this.fillData();
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

    accountExpenses() {
      return this.$store.getters["transactions/getExpensesFromAccount"](
        this.account.pk
      );
    },
    accountIncome() {
      return this.$store.getters["transactions/getIncomeFromAccount"](
        this.account.pk
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
