<template>
  <div>
    <h2 class="subtitle has-text-weight-light is-size-4 is-family-secondary">Dashboard</h2>
    <h5 class="subtitle has-text-weight-light is-size-6 has-text-weight-bold">All your accounts:</h5>
    <accounts-bar
      :accounts="[{pk: 0, name: 'Account #1', balance: '500'},{pk: 1,name: 'Account #2', balance: '60'},{pk: 2,name: 'Account #3', balance: '10000'},{pk: 3,name: 'Account #4', balance: '-200'}]"
    />
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
import AccountsBar from "@/components/AccountsBar";
import TransactionsList from "@/components/TransactionsList";

export default {
  name: "Dashboard",
  components: {
    "accounts-bar": AccountsBar,
    "transactions-list": TransactionsList
  }
};
</script>
