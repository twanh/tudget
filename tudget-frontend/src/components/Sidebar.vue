<template>
  <div class="sidebar-page pl-2" id="sidebar">
    <section class="sidebar-layout">
      <b-sidebar position="static" mobile="fullwidth" open :fullheight="true" id="sidebar-elem">
        <div class="p-1">
          <div class="block">
            <h3 class="title">Tudget</h3>
          </div>
          <b-menu class="is-custom-mobile">
            <b-menu-list label="Overview">
              <b-menu-item icon="cash-multiple" label="Balance: $500"></b-menu-item>
            </b-menu-list>
            <b-menu-list label="Navigation">
              <b-menu-item
                icon="alpha-d-box"
                label="Dashboard"
                href="/"
                :active="isActive('Dashboard')"
              ></b-menu-item>
              <b-menu-item
                icon="account-box-multiple"
                label="Accounts"
                href="/accounts"
                :active="isActive('Accounts')"
              ></b-menu-item>
              <b-menu-item
                icon="notebook"
                label="Budgets"
                href="/budgets"
                :active="isActive('Budgets')"
              ></b-menu-item>
              <b-menu-item
                icon="cash-100"
                label="Savings"
                href="/savings"
                :active="isActive('Savings')"
              ></b-menu-item>
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