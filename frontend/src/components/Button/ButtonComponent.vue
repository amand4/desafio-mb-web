<script>
export default {
  name: "ButtonComponent",
  props: {
    label: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
    color: {
      type: String,
    },
    background: {
      type: String,
    },
    type: {
      type: String,
    }
  }
}
</script>

<style scoped>
  @import url("./style.css")
</style>

<template>
  <div class="button-component">
    <button :type="type" :disabled="disabled" :style="{ color, background }">{{ label }}</button>
  </div>

</template>