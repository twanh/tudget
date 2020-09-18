<template>
  <div class="login-container">
    <h1 class="title has-text-white">Login:</h1>
    <b-message
      v-if="$store.getters['auth/hasError']"
      type="is-danger"
      size="is-small"
    >The credentials you entered are incorrect!</b-message>
    <form @submit.prevent="handleSubmit">
      <b-field
        label="Username"
        label-position="on-border"
        message="The username you used to sign up"
      >
        <b-input v-model="username" icon="account-circle" placeholder="Username"></b-input>
      </b-field>
      <b-field
        label="Password"
        label-position="on-border"
        message="The password you used to signup."
      >
        <b-input
          class="password-input"
          type="password"
          icon="form-textbox-password"
          v-model="password"
          placeholder="*********"
          password-reveal
        ></b-input>
      </b-field>
      <b-button @click.prevent="handleSubmit" type="is-success">Login</b-button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters["auth/loggedIn"];
    }
  },
  methods: {
    handleSubmit() {
      this.$store.dispatch("auth/loginUser", {
        username: this.username,
        password: this.password
      });
    }
  },
  watch: {
    loggedIn() {
      this.$router.push({ name: "Dashboard" });
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/settings.scss";
.login-container {
  width: 500px;
  .icon.is-right {
    color: $gray !important;
    &:hover {
      color: $info !important;
    }
  }
}
</style>