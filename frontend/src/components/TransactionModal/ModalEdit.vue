<template>
  <div>
    <form action="" @submit.prevent="handleSubmit()">
      <!-- Name -->
      <b-field
        message="Short name to descripte the transaction"
        label="Name"
        label-position="on-border"
      >
        <b-input
          v-model="transactionData.name"
          placeholder="Groceries"
          icon="format-title"
        >
        </b-input>
      </b-field>
      <!-- Amount -->
      <b-field
        message="The amount you spend"
        label="Amount"
        label-position="on-border"
      >
        <b-input
          v-model="transactionData.amount"
          placeholder="10.00"
          type="number"
          icon="cash"
        >
        </b-input>
      </b-field>
      <!-- Type -->
      <b-field message="Was the it an expense or income?" label="Type">
        <b-tooltip
          animated
          position="is-right"
          multilined
          label="Type cannot be changed after you create the transaction. If you did make a mistake, you should delete this transaction."
        >
          <b-radio
            disabled
            v-model="transactionData.type"
            native-value="expense"
            >Expense</b-radio
          >
          <b-radio disabled v-model="transactionData.type" native-value="income"
            >Income</b-radio
          >
        </b-tooltip>
      </b-field>
      <!-- Description -->
      <b-field
        message="A short description of the transaction"
        label="Description"
        label-position="on-border"
      >
        <b-input
          v-model="transactionData.description"
          maxlength="200"
          type="textarea"
        ></b-input>
      </b-field>
      <!-- Account -->
      <b-field
        message="From what account did you make the transaction?"
        label="Account"
        label-position="on-border"
      >
        <b-select
          placeholder="Select an account"
          icon="account"
          v-model="transactionData.account"
        >
          <option value="1">Cash</option>
          <option value="2">Debit card</option>
          <option value="3">Credit card</option>
        </b-select>
      </b-field>
      <!-- Category -->
      <b-field
        message="In what categorie does this transaction fit best?"
        label="Category"
        label-position="on-border"
      >
        <b-select
          v-model="transaction.category"
          placeholder="Select a category"
          icon="alpha-c-box"
        >
          <option value="1">Groceries</option>
          <option value="2">Salery</option>
          <option value="3">Rent Payment</option>
        </b-select>
      </b-field>
      <!-- Date -->
      <b-field
        label="Spend On:"
        message="On what day did you make this transaction?"
        label-position="on-border"
      >
        <!-- TODO: Change to real datepicker -->
        <b-input v-model="transaction.spendOn"></b-input>
        <!-- <b-datepicker icon="calendar" position="is-top-right"></b-datepicker> -->
      </b-field>
      <!-- Tags -->
      <b-field
        label="Tags"
        label-position="on-border"
        message="What tags apply to this transaction"
      >
        <b-taginput
          v-model="transaction.tags"
          ellipsis
          icon="label"
          placeholder="Add a tag"
        >
        </b-taginput>
      </b-field>
    </form>
  </div>
</template>

<script>
export default {
  name: "ModalEdit",
  props: ["transaction", "saveClicked"],
  data() {
    return {
      transactionData: {}
    };
  },
  mounted() {
    this.transactionData = { ...this.transaction };
  },
  methods: {
    handleSubmit() {
      console.log("Form submitted");
      console.log(event);
    },
    save() {
      console.log("saving :0");
      //? Should we pass this up or is this okey?
      this.$store.dispatch(
        "transactions/updateTransaction",
        this.transactionData
      );
    }
  }
};
</script>

<style lang="scss" scoped>
select {
  color: white;
  option {
    color: white;
  }
}
</style>
