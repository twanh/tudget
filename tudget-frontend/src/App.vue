<template>
  <div id="app">
    <div class="columns main-column">
      <div class="column is-one-fifth">
        <sidebar />
      </div>
      <div class="column mt-5">
        <router-view />
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";

export default {
  name: "App",
  components: { Sidebar }
};
</script>

<style lang="scss">
.main-column {
  height: 100vh;
}
</style>