<template lang="pug">
.dashboard
  v-login(
    :active="showLoginForm",
    @proceed="proceedLogin",
    @cancel="cancelLogin")
  d-editor(
    :active="!!editingCard",
    :id="editingCard",
    :content="getContent(editingCard)",
    @update-content="push",
    @close-editor="editingCard = null")
  d-grid(
    :items="cards",
    :editable="auth",
    @update-card-position="push",
    @update-card-size="push")
    d-card(
      v-for="card in cards",
      :key="card._id",
      :id="card._id",
      :color="card.color",
      :content="card.content",
      :editable="auth",
      @edit-card="openEditor(card._id)")
    d-grid-button(
      v-if="auth",
      slot="actions",
      current-color="#e6e6e6",
      @update-card-color="push",
      @update-card-embed="push",
      @remove-card-embed="removeEmbed",
      @update-card-image="push",
      @update-card-image-position="push",
      @remove-card-image="removeImage",
      @remove-card="remove")
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import VLogin from '@/components/VLogin'
import DGrid from '@/components/Dashboard/DGrid'
import DGridButton from '@/components/Dashboard/DGridButton'
import DCard from '@/components/Dashboard/DCard'
import DEditor from '@/components/Dashboard/DEditor'

export default {
  name: 'Dashboard',
  components: {
    VLogin,
    DGrid,
    DGridButton,
    DCard,
    DEditor
  },
  props: {
    showLoginForm: { type: Boolean, default: false }
  },
  data () {
    return {
      editingCard: null
    }
  },
  computed: {
    ...mapState('dashboard', ['cards']),
    ...mapState('ui', ['auth'])
  },
  methods: {
    getContent (id) {
      const card = this.cards.find(card => card._id === id)
      return card && card.content
    },
    openEditor (id) {
      this.editingCard = id
    },
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
    },
    proceedLogin (creds) {
      this.$store.dispatch('ui/authenticate', creds)
      this.$router.push('/')
    },
    cancelLogin () {
      this.$router.push('/')
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
