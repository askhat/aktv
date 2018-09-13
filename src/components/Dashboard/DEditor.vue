<template lang="pug">
v-dialog(persistent, :value="active")
  v-card(height="480")
    quill-editor(
      @change="updateContent",
      :value="content")
  v-card-actions
    v-btn(@click="$emit('close-editor')") close
</template>

<script>
export default {
  props: {
    active: { type: Boolean, default: false },
    id: { type: [Number, String], default: '' },
    content: { type: String, default: '' }
  },
  methods: {
    updateContent ({ html: content }) {
      const { id } = this
      this.$emit('update-content', { id, content })
    }
  }
}
</script>

