<template lang="pug">
v-grid-layout(
  :layout="layout",
  :col-num="cols",
  :max-rows="rows",
  :row-height="rowHeight",
  :margin="[margin, margin]")
  v-grid-item(
    v-for="tile in layout",
    :key="tile.i",
    :i="tile.i",
    :x="tile.x",
    :y="tile.y",
    :h="tile.h",
    :w="tile.w",
    :isDraggable="editable",
    :isResizable="editable",
    @moved="move",
    @resized="resize")
    v-tile(
      :editable="editable",
      :id="tile.i",
      :title="tile.title",
      :text="tile.text",
      :color="tile.color",
      :image="tile.image",
      @color-tile="changeColor",
      @edit-tile="edit",
      @remove-tile="remove",
      @image-tile="addImage")
</template>

<script>
import {
  GridLayout as VGridLayout,
  GridItem as VGridItem
} from 'vue-grid-layout'
import VTile from '@/components/VTile'

export default {
  components: {
    VGridLayout,
    VGridItem,
    VTile
  },
  props: {
    items: { type: Array, required: true },
    editable: { type: Boolean, default: false }
  },
  data () {
    return {
      colorCache: '#009688',
      /**
       * Space between tiles
       */
      margin: 10,
      /**
       * Number of columns
       */
      cols: 16,
      /**
       * Number of rows
       */
      rows: 9,
      /**
       * Copy of the `items` prop
       */
      layout: []
    }
  },
  computed: {
    rowHeight () {
      if (window) {
        return Math.round(window.innerHeight / this.rows - this.margin * 2)
      }
    }
  },
  watch: {
    /**
     * Creates mutable copy of items
     */
    items (items) {
      this.layout = items.map(item => ({ ...item, i: item._id }))
    }
  },
  methods: {
    remove (id) {
      this.$emit('remove-tile', id)
    },
    move (id, x, y) {
      const tile = this.items.find(tile => tile._id === id)
      this.$emit('update-tile', { ...tile, x, y })
    },
    resize (id, h, w) {
      const tile = this.items.find(tile => tile._id === id)
      this.$emit('update-tile', { ...tile, h, w })
    },
    edit (doc) {
      const tile = this.items.find(tile => tile._id === doc.id)
      this.$emit('update-tile', { ...tile, ...doc })
    },
    changeColor (color, id) {
      const tile = this.items.find(tile => tile._id === id)
      this.$emit('update-tile', { ...tile, color })
    },
    addImage (image, id) {
      const tile = this.items.find(tile => tile._id === id)
      this.$emit('image-tile', { ...tile, image })
    }
  }
}
</script>

<style scoped>
.small {
  max-width: 30px;
  max-height: 30px;
}
.vc-slider {
  width: 150px;
}
</style>
