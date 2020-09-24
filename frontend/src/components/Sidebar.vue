<template>
  <div class="sidebar-page pl-2" id="sidebar">
    <section class="sidebar-layout">
      <b-sidebar
        position="static"
        mobile="fullwidth"
        open
        :fullheight="true"
        id="sidebar-elem"
      >
        <div class="mt-4">
          <div class="block">
            <h3 class="title">Tudget</h3>
          </div>
          <b-menu class="is-custom-mobile">
            <b-menu-list label="Navigation" v-if="loggedIn">
              <b-menu-item
                icon="alpha-d-box"
                label="Dashboard"
                @click.prevent="$router.history.push('/')"
                :active="isActive('Dashboard')"
              ></b-menu-item>
              <b-menu-item
                icon="account-box-multiple"
                label="Accounts"
                @click.prevent="$router.history.push('/accounts')"
                :active="isActive('Accounts')"
              ></b-menu-item>
              <b-menu-item
                icon="notebook"
                label="Budgets"
                @click.prevent="$router.history.push('/budgets')"
                :active="isActive('Budgets')"
              ></b-menu-item>
              <b-menu-item
                icon="cash-100"
                label="Savings"
                @click.prevent="$router.history.push('/savings')"
                :active="isActive('Savings')"
              ></b-menu-item>
            </b-menu-list>
            <b-menu-list label="Account">
              <div v-if="loggedIn">
                <b-menu-item icon="logout" label="Logout"></b-menu-item>
              </div>
              <div v-else>
                <b-menu-item
                  icon="login"
                  label="Login"
                  :active="isActive('Login')"
                  @click.prevent="$.preventrouter.push({ name: 'Login' })"
                ></b-menu-item>
                <!-- TODO: Update the click event handler to redirect to the register page -->
                <b-menu-item
                  icon="account-plus-outline"
                  label="Register"
                ></b-menu-item>
              </div>
            </b-menu-list>
          </b-menu>
        </div>
      </b-sidebar>
    </section>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  methods: {
    isActive(name) {
      if (name === this.$route.name) {
        return true;
      }
      return false;
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters["auth/loggedIn"];
    }
  }
};
</script>

<style lang="scss">
#sidebar {
  height: 100%;
  section {
    height: 100%;

    #sidebar-elem {
      height: 100%;
    }
  }
}
</style>
