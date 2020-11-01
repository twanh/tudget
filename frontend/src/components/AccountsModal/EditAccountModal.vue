<template>
  <div>
    <a
      href="#"
      class="has-text-right is-size-7"
      @click.prevent="isModalOpen = true"
      >Edit Account</a
    >
    <b-modal v-model="isModalOpen" scroll="keep">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Edit {{ accountInfo.name }}</p>
        </header>
        <div class="card-content">
          <form action="" @submit.prevent="save()">
            <!-- Name -->
            <b-field
              message="Short name to describe this account."
              label="Name"
              label-position="on-boder"
            >
              <b-input
                v-model="accountInfo.name"
                :placeholder="accountData.name"
                icon="format-title"
              />
            </b-field>
            <!-- Description  -->
            <b-field
              message="Short description to describe this account."
              label="Description"
              label-position="on-boder"
            >
              <b-input
                v-model="accountInfo.description"
                :placeholder="accountData.description"
                type="textarea"
              />
            </b-field>
          </form>
        </div>
        <div
          class="is-flex py-3 edit-account-footer"
          style="justify-content: space-evenly"
        >
          <span class="save-cancel-link" @click="save()">Save</span>
          <span class="save-cancel-link" @click="isModalOpen = false"
            >Cancel</span
          >
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "EditAccountModal",
  props: ["accountData"],
  data() {
    return {
      isModalOpen: false,
      accountInfo: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    save() {
      // this.$store.dispatch("accounts/createAccount", this.accountData);
      console.log("saving");
      let name;
      let description;
      if (this.accountInfo.name === "") {
        name = this.accountData.name;
      } else {
        name = this.accountInfo.name;
      }
      if (this.accountInfo.description === "") {
        description = this.accountData.description;
      } else {
        description = this.accountInfo.description;
      }

      console.log({ name, description });

      this.$store.dispatch("accounts/updateAccount", {
        pk: this.accountData.pk,
        name,
        description,
      });

      this.isModalOpen = false;
    },
    cancel() {
      this.isModalOpen = false;
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/settings.scss";
.edit-account-footer {
  border-top: 1px solid $background;
}
.save-cancel-link {
  &:hover {
    cursor: pointer;
    color: $secondary;
  }
}
</style>
