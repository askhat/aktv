<script>
import { GridLayout, GridItem } from 'vue-grid-layout'

export default {
  components: {
    GridLayout,
    GridItem
  },
  props: {
    items: { type: Array, required: true },
    editable: { type: Boolean, default: false }
  },
  data () {
    return {
      layout: []
    }
  },
  watch: {
    /** Create mutable copy of items each time items change */
    items (items) {
      this.layout = items.map(item => {
        const { _id: i } = item
        return { ...item, i }
      })
    }
  },
  methods: {
    moved (id, x, y) {
      this.$emit('update-card-position', { id, x, y })
    },
    resized (id, h, w) {
      this.$emit('update-card-size', { id, h, w })
    }
  },
  /** Wrap each child into grid-item */
  render (createElement) {
    if (this.$slots.default) {
      const { layout } = this
      return createElement(GridLayout, {
        props: { layout, rowHeight: 100, margin: [10, 10] }
      }, [this.$slots.default.map((el, index) => {
        if (layout[index]) {
          const { i, x, y, h, w } = layout[index]
          const {
            moved,
            resized,
            editable: isDraggable,
            editable: isResizable
          } = this
          return createElement(GridItem, {
            props: { i, x, y, h, w, isDraggable, isResizable },
            on: { moved, resized }
          }, [el])
        }
      }), this.$slots.actions])
    } else {
      return createElement('div', { class: 'placeholder' }, [
        createElement('p', 'Void'),
        this.$slots.actions
      ])
    }
  }
}
</script>

<style scoped>
.placeholder {
  position: fixed;
  width: 100%;
  height: 100%;
  color: gray;
  font-size: 185%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
