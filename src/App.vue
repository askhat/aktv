<template lang="pug">
v-app
  router-view
</template>

<script>
export default {
  mounted () {
    this.$store.dispatch('init')
  }
}
</script>
