<template>
  <b-field
    message="From what account did you make the transaction?"
    label="Account"
    label-position="on-border"
  >
    <b-select
      placeholder="Select an account"
      icon="account"
      :disabled="disabled"
      v-model="currentValue"
    >
      <option
        v-for="account in accounts"
        :value="account.pk"
        :key="account.pk"
        >{{ account.name }}</option
      >
    </b-select>
  </b-field>
</template>

<script>
export default {
  name: "AccountSelect",
  model: {
    prop: "value",
  },
  props: {
    accounts: Array,
    value: Number,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
};
</script>

<style></style>
