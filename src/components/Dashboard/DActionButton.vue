<script>
export default {
  props: {
    icon: { type: String, default: 'create' },
    buttonColor: { type: String, default: 'black' },
    iconColor: { type: String, default: 'white' }
  },
  render (createElement) {
    return createElement('v-menu', null, [
      createElement('v-btn', {
        slot: 'activator',
        props: {
          icon: true,
          action: true,
          fixed: true,
          bottom: true,
          right: true,
          color: this.buttonColor
        }
      }, [createElement('v-icon', {
        props: {
          color: this.iconColor
        }
      }, this.icon)]),
      createElement('v-list', null, [this.$slots.default &&
        this.$slots.default.map(child => {
          return createElement('v-list-tile', null, [child])
      })])
    ])
  }
}
</script>

