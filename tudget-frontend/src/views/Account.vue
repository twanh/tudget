<template>
  <div>
    <accounts-bar
      :accounts="[{pk: 0, name: 'Account #1', balance: '500'},{pk: 1,name: 'Account #2', balance: '60'},{pk: 2,name: 'Account #3', balance: '10000'},{pk: 3,name: 'Account #4', balance: '-200'}]"
    />
  </div>
</template>

<script>
import AccountsBar from "@/components/AccountsBar";

export default {
  name: "Accounts",
  components: {
    "accounts-bar": AccountsBar
  }
};
</script>