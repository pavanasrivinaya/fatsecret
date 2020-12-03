<template>
  <div
    class="togglebutton-wrapper"
    :class="isactive ? 'togglebutton-checked' : ''"
  >
    <label :for="name">
      <span class="togglebutton-label">{{ label }}</span>
      <span class="tooglebutton-box"></span>
    </label>
    <input
      :id="name"
      v-model="isactive"
      type="checkbox"
      :name="name"
      @change="onToogle"
    />
  </div>
</template>
<script>
export default {
  model: {
    prop: 'checked',
    event: 'change',
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['label', 'name'],
  data() {
    return {
      isactive: false,
    }
  },
  methods: {
    onToogle() {
      this.$emit('clicked', this.isactive)
    },
  },
}
</script>
