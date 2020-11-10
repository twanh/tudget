<template>
  <b-field
    message="In what categorie does this transaction fit best?"
    label="Category"
    label-position="on-border"
  >
    <b-select
      v-model="currentValue"
      placeholder="Select a category"
      icon="alpha-c-box"
    >
      <option v-for="cat in categories" :key="cat.pk" :value="cat.pk">{{
        cat.name
      }}</option>
    </b-select>
  </b-field>
</template>

<script>
export default {
  name: "CategorySelect",
  odel: {
    prop: "value",
  },
  props: {
    categories: Array,
    value: Number, // Is an number because the value is the primary key
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
