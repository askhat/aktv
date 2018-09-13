<template lang="pug">
.color-picker(@click.prevent)
  slider(:value="currentColor", @input="changeColor")
</template>

<script>
import { Slider } from 'vue-color'

export default {
  components: {
    Slider
  }
}
</script>
