<template>
  <div class="size ml-3">
    <div class="columns is-6">
      <div
        v-for="account in accounts"
        class="column account-box"
        :class="isActive(account.pk) && 'accountIsActive '"
        :key="account.pk"
        @click.prevent="handleClick(account.pk)"
      >
        <span class="title is-6">{{account.name}}</span>
        <br />
        <span class="subtitle is-6">&euro;{{account.balance}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountsBar",
  props: ["accounts"],
  methods: {
    handleClick(pk) {
      this.$router.history.push(`/account/${pk}`);
    },
    isActive(pk) {
      if (this.$route.params.pk == pk) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/settings.scss";
.size {
  //* Have this determined by an prop?
  width: 50%;
  max-width: 100%;
}

@media only screen and (max-width: $tablet) {
  .size {
    width: 100%;
  }
}

.account-box {
  padding: 0.3rem !important;
  cursor: pointer;
  background: $backgroundHighlight;
  box-shadow: 2px 3px 0px 0px rgba(255, 255, 255, 0.125);
  min-width: 100px;
  // width: 110px;
  // max-width: 10%;
  margin-right: 0.75rem;
  &:hover {
    box-shadow: 3px 3px 1px 0px $backgroundAccent;
  }
  span {
    padding: 0;
  }
}

.accountIsActive {
  background-color: $secondary !important;
  span {
    color: $background !important;
  }
}
</style>