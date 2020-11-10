<template>
  <b-field
    :label="label"
    label-position="on-border"
    :type="typeString"
    :message="message"
  >
    <b-input
      v-model="currentValue"
      :icon="icon"
      :type="type"
      :placeholder="placeholder"
    ></b-input>
  </b-field>
</template>

<script>
export default {
  name: "InputField",
  model: {
    prop: "value",
  },
  props: {
    value: [String, Number],
    // The label to display
    label: {
      type: String,
      required: true,
    },
    // A short description to display underneat the input
    message: String,
    // The icon to put next to the input
    icon: String,
    // The input type of the input element, e.g.: text, number, password, etc...
    type: {
      type: String,
      required: true,
    },
    // The placeholder (text) to display in the input
    placeholder: String,
    // Wheter the input value is invalid. Note: if you want to show an error message, update the message prop.
    invalid: {
      type: Boolean,
      required: false,
      default: false,
    },
    // Wheter an input element is disabled (or not)
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    typeString() {
      if (this.invalid) {
        return "is-danger";
      }
      return "";
    },
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

<style lang="scss" scoped></style>
