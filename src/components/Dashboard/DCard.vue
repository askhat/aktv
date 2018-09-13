<template lang="pug">
v-card.card(:color="color", :style="{ color: contentColor }")
  v-card-text(v-html="content")
  v-speed-dial(v-if="editable", open-on-hover, direction="top")
    v-btn(
      slot="activator"
      action,
      icon,
      fixed,
      bottom,
      right,
      :color="contentColor",
      @click="edit")
      v-icon(:color="color") create
    v-btn(action, icon)
      v-icon(:color="color") user
</template>

<script>
import { Slider as VColorPicker } from 'vue-color'
import ColorHelpers from '@/mixins/ColorHelpers'
import DActionButton from '@/components/Dashboard/DActionButton'

export default {
  components: {
    VColorPicker,
    DActionButton
  },
  mixins: [ ColorHelpers ],
  props: {
    editable: { type: Boolean, default: false },
    id: { type: [String, Number], required: true },
    color: { type: String, default: '' },
    content: { type: String, default: '' }
  },
  data () {
    return {
      isEditing: false,
      showColorPicker: false
    }
  },
  computed: {
    contentColor () {
      return this.isLight(this.color) ? '#191919' : '#FFFFFF'
    }
  },
  methods: {
    edit () {
      this.$emit('edit-card', this.id)
    },
    colorize ({ hex: color }) {
      const { id } = this
      this.$emit('update-card', { id, color })
    }
  }
}
</script>

<style>
.ql-toolbar.ql-snow + .ql-container.ql-snow {
  border: unset;
}
.ql-toolbar.ql-snow {
  border: unset;
}
.ql-toolbar {
  background: lightgray;
}
</style>
<style scoped>
.card {
  width: 100%;
  height: 100%;
}
.color-picker {
  max-width: 180px;
  padding-top: 16px;
  padding-bottom: 16px;
}
</style>
