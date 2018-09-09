<template lang="pug">
v-menu
  v-btn(slot="activator", icon, fixed, top, right, color="white")
    v-icon more_vert
  input(ref="imageInput", type="file", style="display: none", @change="addImage")
  v-dialog(:value="embedForm", max-width="480", persistent)
    v-card
      v-card-title
        h3.headline Paste html code below
      v-textarea(box, v-model="embedCode")
      v-card-actions
        v-btn(flat, color="blue", @click="addEmbed") Save
        v-btn(flat, color="red", @click="toggleEmbedForm") Cancel
  v-list
    v-list-tile.color-picker(@click.stop)
      v-color-picker(:value="currentColor", @input="changeColor")
    v-list-tile(@click="toggleEmbedForm")
      v-list-tile-title Embed media
    v-list-tile(@click="removeEmbed")
      v-list-tile-title Remove embed
    v-list-tile(@click="selectImage")
      v-list-tile-title Add image
    v-list-tile
      v-menu(open-on-hover)
        v-list-tile-title(slot="activator") Image settings
        v-list
          v-list-tile(@click="align('top')")
            v-list-tile-title Align top
          v-list-tile(@click="align('bottom')")
            v-list-tile-title Align bottom
          v-list-tile(@click="deleteImage")
            v-list-tile-title Delete image
    v-list-tile(@click="remove")
      v-list-tile-title Delete card
</template>

<script>
import { Slider as VColorPicker } from 'vue-color'

export default {
  components: {
    VColorPicker
  },
  props: {
    id: { type: String, required: true },
    currentColor: { type: String, default: 'red' }
  },
  data () {
    return {
      embedForm: false,
      embedCode: ''
    }
  },
  methods: {
    changeColor ({ hex: color }) {
      const { id } = this
      this.$emit('update-card-color', { id, color })
    },
    toggleEmbedForm () {
      this.embedForm = !this.embedForm
    },
    addEmbed () {
      const { id, embedCode: embed } = this
      this.$emit('update-card-embed', { id, embed })
      this.toggleEmbedForm()
    },
    removeEmbed () {
      const { id } = this
      this.$emit('remove-card-embed', id)
    },
    selectImage () {
      this.$refs.imageInput.click()
    },
    addImage ({ target: { files }}) {
      const { id } = this
      const [image] = files
      const fileReader = new FileReader
      fileReader.onloadend = async ({ target: { result: image } }) => {
        this.$emit('update-card-image', { id, image, imagePosition: 'top' })
      }
      fileReader.readAsDataURL(image)
    },
    align (imagePosition) {
      const { id } = this
      this.$emit('update-card-image-position', { id, imagePosition })
    },
    deleteImage () {
      const { id } = this
      this.$emit('remove-card-image', id)
    },
    remove () {
      this.$emit('remove-card', this.id)
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
