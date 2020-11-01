<template>
  <div>
    <div v-if="variant === 'button'">
      <b-button
        type="is-background-hightlight"
        @click.prevent="isModalOpen = true"
        class="text-white mt-4"
      >
        Create Account
      </b-button>
    </div>
    <div v-if="variant === 'nav-link'">
      <b-menu-item
        label="Create account"
        icon="plus-box"
        class="pl-0"
        @click.prevent="isModalOpen = true"
      ></b-menu-item>
    </div>
    <b-modal v-model="isModalOpen" scroll="keep">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            Create an account
          </p>
          <a
            @click.prevent="isModalOpen = false"
            class="card-header-icon"
            aria-label="closeTheModal"
          >
            <b-icon icon="close" size="is-small" />
          </a>
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
                v-model="accountData.name"
                placeholder="Account Name"
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
                v-model="accountData.description"
                placeholder="Account Description"
                type="textarea"
              />
            </b-field>
          </form>
        </div>
        <footer class="card-footer">
          <a
            href="#"
            class="card-footer-item text-center"
            @click.prevent="save()"
          >
            <span>Save</span>
          </a>
          <a
            href="#"
            class="card-footer-item text-center"
            @click.prevent="cancel()"
          >
            <span>Cancel</span>
          </a>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "CreateAccountModal",
  props: ["variant"],
  data() {
    return {
      isModalOpen: false,
      accountData: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    save() {
      this.$store.dispatch("accounts/createAccount", this.accountData);
    },
    cancel() {
      this.isModalOpen = false;
      this.accountData = {
        name: "",
        description: "",
      };
    },
  },
};
</script>

<style></style>
