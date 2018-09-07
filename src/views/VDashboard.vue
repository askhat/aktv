<template lang="pug">
.dashboard
  v-login(
    :active="showLoginForm"
    @proceed="logIn",
    @cancel="closeLoginForm")
  v-btn(fixed, dark, fab, bottom, right, color="pink", @click="push")
    v-icon add
  v-grid(
    v-show="items",
    :items="items",
    :editable="auth",
    @update-tile="push",
    @remove-tile="remove",
    @image-tile="push")
  .placeholder(v-show="!items")
    p.text-md-center Void
</template>

<script>
import uuid from '@/lib/uuid'
import { mapState } from 'vuex'
import VGrid from '@/components/VGrid'
import VLogin from '@/components/VLogin'

export default {
  components: {
    VGrid,
    VLogin
  },
  props: {
    showLoginForm: { type: Boolean, default: false }
  },
  computed: {
    ...mapState('tiles', ['items']),
    ...mapState('ui', ['auth'])
  },
  methods: {
    /**
     * Push new tile to remote collection
     */
    push ({ _rev, _id = uuid(), x = 0, y = 0, h = 3, w = 4, color, title = 'Title', text = 'Text', image } = {}) {
      this.$store.dispatch('tiles/push', { _rev, _id, x, y, h, w, color, title, text, image })
    },
    remove (id) {
      this.$store.dispatch('tiles/remove', id)
    },
    logIn (e) {
      this.$store.dispatch('ui/logIn', e)
      if (this.$store.state.ui.auth) {
        this.closeLoginForm()
      }
    },
    closeLoginForm () {
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
