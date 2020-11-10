<template>
  <div>
    <div class="buttons mr-5 mt-5">
      <b-button
        type="is-background-hightlight"
        class="has-text-white"
        expanded
        @click.prevent="isModalOpen = true"
      >
        {{ addBtnTxt }}
      </b-button>
    </div>

    <b-modal v-model="isModalOpen">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            Add transaction
          </p>
          <a
            @click.prevent="close"
            class="card-header-icon"
            aria-label="closeTheModal"
          >
            <b-icon icon="close" size="is-small" />
          </a>
        </header>
        <div class="card-content">
          <form action="" @submit.prevent="handleSubmit()">
            <!-- Name -->
            <input-field
              type="text"
              label="Name"
              v-model="transactionData.name"
              message="Short name for the transaction"
              placeholder="Groceries"
              icon="format-title"
            ></input-field>
            <!-- Amount -->
            <input-field
              type="number"
              label="Amount"
              message="The amount you spend"
              placeholder="10.00"
              icon="cash"
              v-model="transactionData.amount"
            ></input-field>
            <!-- Type -->
            <b-field message="Was the it an expense or income?" label="Type">
              <b-tooltip
                animated
                position="is-right"
                multilined
                label="Type cannot be changed after you create the transaction. If you did make a mistake, you should delete this transaction."
              >
                <b-radio
                  :disabled="type !== 'all' ? true : false"
                  v-model="transactionData.type"
                  native-value="expense"
                  >Expense</b-radio
                >
                <b-radio
                  :disabled="type !== 'all' ? true : false"
                  v-model="transactionData.type"
                  native-value="income"
                  >Income</b-radio
                >
              </b-tooltip>
            </b-field>
            <!-- Description -->
            <input-field
              label="Description"
              message="A (short) description of the transaction"
              type="textarea"
              v-model="transactionData.description"
            ></input-field>
            <!-- Account -->
            <b-field
              message="From what account did you make the transaction?"
              label="Account"
              label-position="on-border"
            >
              <b-select
                placeholder="Select an account"
                icon="account"
                :disabled="currentAccount && true"
                v-model="transactionData.account"
              >
                <option
                  v-for="account in accounts"
                  :value="account.pk"
                  :key="account.pk"
                  >{{ account.name }}</option
                >
              </b-select>
            </b-field>
            <!-- Category -->
            <b-field
              message="In what categorie does this transaction fit best?"
              label="Category"
              label-position="on-border"
            >
              <b-select
                v-model="transactionData.category"
                placeholder="Select a category"
                icon="alpha-c-box"
              >
                <option
                  v-for="cat in categories"
                  :key="cat.pk"
                  :value="cat.pk"
                  >{{ cat.name }}</option
                >
              </b-select>
            </b-field>
            <!-- Date -->
            <b-field
              label="Spend On:"
              message="On what day did you make this transaction?"
              label-position="on-border"
            >
              <!-- TODO: Change to real datepicker -->
              <b-input v-model="transactionData.spendOn"></b-input>
              <!-- <b-datepicker icon="calendar" position="is-top-right"></b-datepicker> -->
            </b-field>
            <!-- Tags -->
            <b-field
              label="Tags"
              label-position="on-border"
              message="What tags apply to this transaction"
            >
              <b-taginput
                v-model="transactionData.tags"
                ellipsis
                :data="possibleTags"
                autocomplete
                icon="label"
                placeholder="Add a tag"
              >
              </b-taginput>
            </b-field>
          </form>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item" @click.prevent="save()">
            <span>Add</span>
          </a>
          <div class="card-footer-item ">
            <span class="transaction-modal-delete-btn" @click="close()"
              >Cancel</span
            >
          </div>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import InputField from "@/components/input/InputField.vue";

export default {
  name: "AddTransactionModal",
  props: ["type", "currentAccount", "accounts", "categories", "tags"],
  components: {
    "input-field": InputField,
  },
  data() {
    return {
      isModalOpen: false,
      errorMessage: "",
      possibleTags: [],
      transactionData: {
        name: "",
        account: 0,
        description: "",
        amount: 0,
        category: "",
        tags: [],
        spendOn: "",
      },
    };
  },
  created() {
    // Check if the type is transaction (from the props)
    // and change the state based on it.
    if (this.type === "expense") {
      this.transactionData.type = "expense";
    } else if (this.type === "income") {
      this.transactionData.type = "income";
    }
    // If there is a currentAccount given
    // then set the accouont of the data the the given account
    if (this.currentAccount) {
      this.transactionData.account = this.currentAccount.pk;
      // this.transactionData.accouont = this.currentAccount.name;
    }
    // Assign the possibleTags (for the tag autocomplete) all the tag names
    // Note: This needs to be converted back when in save()
    if (this.tags) {
      this.possibleTags = this.tags.map((tag) => tag.name);
    }

    // TODO: Change this to the correct date format
    const now = new Date();
    this.transactionData.spendOn = now.toLocaleString();
  },
  updated() {
    // Make sure that when the user navigates around the page/site the account gets updated
    // with the current on (on that page for example)
    // --> Basicly reloading the prop
    if (this.currentAccount) {
      this.transactionData.account = this.currentAccount.pk;
    }
  },
  methods: {
    close() {
      // Close the modal
      this.isModalOpen = false;
      // Reset the transaction data, for the next time opening
      // Note: not resetting account here, because the account is linked to props
      // and is set on created()
      this.transactionData = {
        name: "",
        description: "",
        amount: 0,
        category: "",
        tags: [],
        spendOn: "",
      };
    },
    async save() {
      // TODO: Check if all required data is provided & valid

      // Convert tag names to tag pk's
      const tagPks = this.tags.map((tag) => {
        if (this.transactionData.tags.includes(tag.name)) {
          return tag.pk;
        }
      });

      // Change out the tags to be primary keys
      const data = { ...this.transactionData };
      if (data.tags.length < 1) {
        data.tags = [];
      } else {
        data.tags = tagPks;
      }

      await this.$store.dispatch("transactions/createTransaction", data);
    },
  },
  computed: {
    addBtnTxt() {
      if (this.type === "all") {
        return "Add transaction";
      }

      return `Add ${this.type}`;
    },
  },
};
</script>

<style></style>
