<template>
  <div>
    <h2 class="subtitle has-text-weight-light is-size-4 is-family-secondary">Dashboard</h2>
    <h5 class="subtitle has-text-weight-light is-size-6">All your accounts:</h5>
    <accounts-bar
      :accounts="[{pk: 0, name: 'Account #1', balance: '500'},{pk: 1,name: 'Account #2', balance: '60'},{pk: 2,name: 'Account #3', balance: '10000'},{pk: 3,name: 'Account #4', balance: '-200'}]"
    />
  </div>
</template>

<script>
import AccountsBar from "@/components/AccountsBar";

export default {
  name: "Dashboard",
  components: {
    "accounts-bar": AccountsBar
  }
};
</script>
