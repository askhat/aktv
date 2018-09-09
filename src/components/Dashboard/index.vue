<template lang="pug">
.dashboard
  v-login(
    :active="showLoginForm",
    @proceed="proceedLogin",
    @cancel="cancelLogin")
  d-grid(
    :items="cards",
    :editable="auth",
    @update-card-position="push",
    @update-card-size="push")
    d-card(
      v-for="card in cards",
      :key="card._id",
      :id="card._id",
      :title="card.title",
      :text="card.text",
      :color="card.color",
      :embed="card.embed",
      :image="card.image",
      :image-position="card.imagePosition",
      :editable="auth",
      @update-card-title="push",
      @update-card-text="push")
      d-card-actions(
        v-if="auth",
        slot="actions",
        :id="card._id",
        :current-color="card.color",
        @update-card-color="push",
        @update-card-embed="push",
        @remove-card-embed="removeEmbed",
        @update-card-image="push",
        @update-card-image-position="push",
        @remove-card-image="removeImage",
        @remove-card="remove")
    d-grid-actions(
      v-if="auth",
      slot="actions",
      :id="card._id",
      :current-color="card.color",
      @update-card-color="push",
      @update-card-embed="push",
      @remove-card-embed="removeEmbed",
      @update-card-image="push",
      @update-card-image-position="push",
      @remove-card-image="removeImage",
      @remove-card="remove")
  d-grid-actions(
    slot="actions",
    @add-card="create")
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import DGrid from '@/components/Dashboard/DGrid'
import DGridActions from '@/components/Dashboard/DGridActions'
import DCard from '@/components/Dashboard/DCard'
import DCardActions from '@/components/Dashboard/DCardActions'

export default {
  name: 'Dashboard',
  components: {
    DGrid,
    DGridActions,
    DCard,
    DCardActions
  },
  computed: {
    ...mapState('dashboard', ['cards']),
    ...mapState('ui', ['auth'])
  },
  methods: {
    push ({ id, ...update }) {
      const card = this.cards.find(card => card._id === id)
      this.$store.dispatch('dashboard/push', { ...card, ...update })
    },
    create () {
      this.$store.dispatch('dashboard/push')
    },
    remove (id) {
      this.$store.dispatch('dashboard/remove', id)
    },
    removeEmbed (id) {
      const card = this.cards.find(card => card._id === id)
      this.$store.dispatch('dashboard/push', { ..._.omit(card, ['embed']) })
    },
    removeImage (id) {
      const card = this.cards.find(card => card._id === id)
      this.$store.dispatch('dashboard/push', { ..._.omit(card, ['image']) })
    }
  }
}
</script>

<style scoped>
.dashboard {
  user-select: none;
  width: 100vw;
  height: 100vh;
}
</style>
