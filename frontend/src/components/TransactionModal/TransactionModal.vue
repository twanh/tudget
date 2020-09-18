<template>
  <div>
    <b-modal
      v-model="modalOpen"
      scroll="keep"
      v-if="transaction"
      :on-cancel="closeTheModal"
    >
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            {{ transaction.name }}
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
          <div class="card-footer-item ">
            <span
              v-if="!isDeleting"
              class="transaction-modal-delete-btn"
              @click="deleteTransaction"
              >Delete
            </span>
            <div v-else class="has-text-centered">
              <span> Are you sure?</span>
              <br />
              <div class="buttons">
                <b-button
                  size="is-small"
                  type="is-danger"
                  icon-left="delete"
                  @click="confirmDelete"
                  >Yes</b-button
                >
                <b-button
                  size="is-small"
                  type="is-success"
                  icon-left="undo"
                  @click="cancelDelete"
                  >No</b-button
                >
              </div>
            </div>
          </div>
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
  props: ["transactionPk", "transactionType", "open", "close", "accountName"],
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
      isDeleting: false,
      saveClicked: false,
      modalOpen: this.open,
    };
  },
  watch: {
    open(newVal) {
      if (newVal) {
        this.modalOpen = true;
      } else {
        this.modalOpen = false;
      }
    },
  },
  methods: {
    deleteTransaction() {
      this.isDeleting = true;
    },
    confirmDelete() {
      this.isDeleting = false;
      this.$store.dispatch("transactions/deleteTransaction", this.transaction);
      this.closeTheModal();
      this.$buefy.snackbar.open({
        duration: 5000,
        message: "Transaction deleted",
        type: "is-danger",
        actionText: "OK",
      });
    },
    cancelDelete() {
      this.isDeleting = false;
    },
    closeTheModal() {
      // Reset the state (for the next time opening)
      this.isEditing = false;
      this.saveClicked = false;
      this.isDeleting = false;
      // Close the modal
      this.close();
    },
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

<style lang="scss">
@import "../../assets/scss/settings.scss";
.transaction-modal-delete-btn {
  cursor: pointer;
  &:hover {
    color: $primary;
  }
}
</style>
