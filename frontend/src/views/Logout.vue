<template>
  <div>
      <h1 class="title has-text-secondary">See you soon :)</h1>
      <h2 class="subtitle">Logging you out...</h2>
  </div>
</template>

<script>
export default {
    name: "Logout",
    mounted() {
        this.$store.dispatch('auth/logoutUser');
        // Redirect the user to the login page after 4 seccconds
        setTimeout(() => {
            this.$router.push('/login');
        }, 2000);
    }
}
</script>

<style>

</style>