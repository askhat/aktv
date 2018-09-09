import Vue from 'vue'
import Vuex from 'vuex'
import ui from '@/store/ui'
import dashboard from '@/store/dashboard'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dashboard,
    ui
  },
  actions: {
    init: ({ dispatch }) => {
      dispatch('dashboard/init')
    }
  }
})
