export default {
  namespaced: true,
  state: {
    auth: false
  },
  mutations: {
    auth: (state, payload) => (state.auth = payload)
  },
  actions: {
    authenticate: ({ commit }, { username, password }) => {
      if (username === 'admin' && password === 'admin') {
        commit('auth', true)
      }
    }
  }
}
