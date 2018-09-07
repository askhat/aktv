import Vue from 'vue'
import Vuex from 'vuex'
import ui from '@/store/ui'
import tiles from '@/store/tiles'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tiles,
    ui
  },
  actions: {
    init: ({ dispatch }) => {
      dispatch('tiles/init')
    }
  }
})
