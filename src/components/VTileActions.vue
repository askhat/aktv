<template lang="pug">
v-menu
  v-btn(slot="activator", icon, fixed, top, right, color="white")
    v-icon more_vert
  input(ref="imageInput", type="file", style="display: none", @change="addImage")
  v-list
    v-list-tile.color-picker(@click.stop)
      v-color-picker(:value="color", @input="changeColor")
    v-list-tile(@click="selectImage")
      v-list-tile-title Add image
    v-list-tile(@click="remove")
      v-list-tile-title Delete
</template>

<script>
import { arrayBufferToBlob } from 'blob-util'
import { Slider as VColorPicker } from 'vue-color'

export default {
  components: {
    VColorPicker
  },
  props: {
    id: { type: String, required: true },
    color: { type: String, default: 'red' }
  },
  methods: {
    changeColor ({ hex: color }) {
      this.$emit('color-tile', color)
    },
    remove () {
      this.$emit('remove-tile')
    },
    selectImage () {
      this.$refs.imageInput.click()
    },
    addImage ({ target: { files }}) {
      const [image] = files
      const fileReader = new FileReader
      fileReader.onloadend = async e => {
        const { result: arrayBuffer } = e.target
        const blob = await arrayBufferToBlob(arrayBuffer, image.type)
        this.$emit('tile-image', blob)
      }
      fileReader.readAsArrayBuffer(image)
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
