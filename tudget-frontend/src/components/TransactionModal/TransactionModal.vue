<template>
  <div>
    <b-modal v-model="open" scroll="keep" v-if="transaction">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            {{ transaction.name }}
          </p>
          <!-- TODO: Not update the prop -->
          <a
            @click.prevent="open = false"
            class="card-header-icon"
            aria-label="close"
          >
            <b-icon icon="close" size="is-small" />
          </a>
        </header>
        <div class="card-content">
          <modal-edit
            v-if="isEditing"
            :transaction="transaction"
            ref="editModal"
          />
          <modal-info
            v-else
            :transaction="transaction"
            :accountName="accountName"
          />
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item" @click.prevent="save()">
            <span v-if="isEditing">Save</span>
            <span v-else>Edit</span>
          </a>
          <a href="#" class="card-footer-item">Delete</a>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import ModalInfo from "./ModalInfo";
import ModalEdit from "./ModalEdit";

export default {
  name: "TransactionModal",
  props: ["transactionPk", "transactionType", "open", "accountName"],
  components: {
    ModalInfo,
    ModalEdit,
  },
  mounted() {
    if (!this.$store.state.transactions.transactions.length > 0) {
      this.$store.dispatch("transactions/getAllTransactions");
    }
  },
  computed: {
    transaction() {
      return this.$store.getters["transactions/getTransaction"](
        this.transactionPk,
        this.transactionType
      );
    },
  },
  data() {
    return {
      isEditing: false,
      saveClicked: false,
    };
  },
  methods: {
    save() {
      if (this.isEditing) {
        this.$refs.editModal.save();
      }
      this.isEditing = !this.isEditing;
      // // this.saveClicked = true;
    },
  },
};
</script>
