export default {
  namespaced: true,
  state: {
    auth: true
  },
  mutations: {
    auth: (state, payload) => (state.auth = payload)
  },
  actions: {
    logIn: ({ commit }, { username, password }) => {
      if (username === 'admin' && password === 'admin') {
        commit('auth', true)
      }
    }
  }
}
