import _ from 'lodash'
import PouchDB from 'pouchdb-browser'

const db = new PouchDB('tile')

export default {
  namespaced: true,
  state: {
    items: []
  },
  mutations: {
    /**
     * Replace current state
     */
    replace: (state, payload) => {
      state.items = payload.map(row => row.doc)
    }
  },
  actions: {
    /**
     * Fetch initial collection and subscribe to changes
     */
    init: ({ dispatch }) => {
      dispatch('pull')
      dispatch('subscribe')
    },
    /**
     * Dispatch pull each time remote collection changes
     */
    subscribe: ({ dispatch }) => {
      db.changes({
        since: 'now',
        live: true
      }).on('change', () => {
        dispatch('pull')
      })
    },
    /**
     * Fetch remote collection and commit replace
     */
    pull: async ({ commit }) => {
      try {
        const { rows } = await db.allDocs({ include_docs: true })
        commit('replace', rows)
      } catch (e) {
        throw e
      }
    },
    /**
     * Create document in the remote collection
     */
    push: _.throttle(async (ctx, payload) => {
      try {
        await db.put(payload)
      } catch (e) {
        throw e
      }
    }, 500),
    remove: async (ctx, payload) => {
      try {
        db.remove(await db.get(payload))
      } catch (e) {
        throw e
      }
    }
  }
}
