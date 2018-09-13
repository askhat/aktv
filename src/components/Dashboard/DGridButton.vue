<template lang="pug">
v-btn(
  fixed,
  dark,
  fab,
  bottom,
  right,
  color="pink",
  @click="$emit('add-card')")
  v-icon add
</template>
