<template lang="pug">
v-card.full(:color="color", :style="textColor")
  div.embed(v-if="embed", v-html="embed")
  div.full.card(v-else)
    v-img.fill(
      v-if="image && imagePosition === 'top'",
      :src="image",
      style="flex: 10")
    v-card-title
      input.title(
        v-if="editable",
        :value="title",
        placeholder="Title",
        @change="edit($event, 'title')")
      h3.title(v-else) {{ title }}
    v-card-text(style="flex: 1")
      textarea.subtitle(
        v-if="editable",
        :value="text",
        placeholder="Text",
        @change="edit($event, 'text')")
      p(v-else).subtitle {{ text }}
    v-img.fill(
      v-if="image && imagePosition === 'bottom'",
      :src="image",
      style="flex: 10")
  slot(name="actions")
</template>

<script>
import ColorHelpers from '@/mixins/ColorHelpers'

export default {
  mixins: [ ColorHelpers ],
  props: {
    editable: { type: Boolean, default: false },
    id: { type: [String, Number], required: true },
    title: { type: String, default: '' },
    text: { type: String, default: '' },
    color: { type: String, default: '' },
    embed: { type: String, default: '' },
    image: { type: String, default: null },
    imagePosition: { type: String, default: 'top' }
  },
  computed: {
    textColor () {
      const color = this.isLight(this.color) ? 'black' : 'white'
      return { color }
    }
  },
  methods: {
    edit ({ target: { value } }, prop) {
      const { id } = this
      this.$emit(`update-card-${prop}`, { id, [prop]: value })
    }
  }
}
</script>

<style scoped>
.full {
  width: 100%;
  height: 100%;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.embed {
  padding: 16px;
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
