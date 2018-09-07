<template lang="pug">
v-menu
  v-btn(slot="activator", icon, fixed, top, right)
    v-icon more_vert
  v-list
    v-list-tile.color-picker(@click.stop)
      v-color-picker(:value="color", @input="changeColor")
    v-list-tile(@click="remove")
      v-list-tile-title Delete
</template>

<script>
import { Slider as VColorPicker } from 'vue-color'

export default {
  components: {
    VColorPicker
  },
  props: {
    id: { type: String, required: true },
    color: { type: String, default: '#E6E6E6' }
  },
  methods: {
    changeColor ({ hex: color }) {
      this.$emit('color-tile', color)
    },
    remove () {
      this.$emit('remove-tile')
    }
  }
}
</script>

<style scoped>
.color-picker {
  max-width: 180px;
  padding-top: 16px;
  padding-bottom: 16px;
}
</style>
