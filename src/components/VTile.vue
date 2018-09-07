<template lang="pug">
v-card.cover(:color="color", :style="computedStyle")
  v-card-title
    input.title(
      v-if="editable",
      rows="1",
      :value="title",
      placeholder="Title",
      @change="edit($event, id, 'title')")
    h3.title(v-else) {{ title }}
  v-card-text.fill
    textarea.subheading(
      v-if="editable",
      autofocus,
      :value="text",
      placeholder="Text",
      @change="edit($event, id, 'text')")
    p.subheading(v-else) {{ text }}
  v-tile-actions(
    :id="id",
    :color="color",
    @color-tile="changeColor",
    @remove-tile="removeTile")
</template>

<script>
import _ from 'lodash'
import ColorHelpers from '@/mixins/ColorHelpers'
import VTileActions from '@/components/VTileActions'

export default {
  components: { VTileActions },
  mixins: [ ColorHelpers ],
  props: {
    editable: { type: Boolean, default: false },
    id: { type: String, required: true },
    title: { type: String,  default: '' },
    text: { type: String, default: '' },
    color: { type: String, default: '#E6E6E6' }
  },
  computed: {
    computedStyle () {
      const color = this.isLight(this.color) ? 'black' : 'white'
      return { color }
    }
  },
  methods: {
    removeTile () {
      this.$emit('remove-tile', this.id)
    },
    changeColor (color) {
      _.throttle(() => this.$emit('color-tile', color, this.id), 150)
    },
    edit ({ target: { value } }, id, prop) {
      this.$emit('edit-tile', { id, [prop]: value })
    }
  }
}
</script>

<style scoped>
.cover {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
}
.fill {
  flex: 1;
}
textarea {
  height: 100%;
  width: 100%;
  resize: none;
}
input:focus, textarea:focus {
  outline: unset;
}
</style>
