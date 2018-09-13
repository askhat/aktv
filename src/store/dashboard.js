import _ from 'lodash'
import PouchDB from 'pouchdb-browser'
import { syncMap, dashboardSync } from '@/store/sync'

/** Remote db locator */
const DATABASE_URL = process.env['DATABASE_URL']
/** Collection name */
const COLLECTION = 'dashboard'
/** Time to wait until next db call */
const WAIT = 500
/** Local db instance */
const db = new PouchDB(COLLECTION)
/** Reference to sync object */
let sync

/**
 * - Subscribes local pouchdb instance to changes
 * @param {Object} options pouchdb sync options
 * @param {Object[]} callbacks object with callbacks
 * @param {Function} callbacks[].change reaction on change event
 * @param {Function} callbacks[].pause reaction on pause event
 */
const subscribe = async (options, { change: changeCallback, pause: pauseCallback }) => {
  if (await ping(DATABASE_URL)) {
    sync = db.sync(`${DATABASE_URL}/${COLLECTION}`, options)
  } else {
    sync = db.changes(options)
  }
    sync
      .on('change', changeCallback)
      .on('pause', pauseCallback)
}

/**
 * Cancel subscription of sync
 * @param {Symbol} syncSymbol sync map reference key
 */
const unsubscribe = () => sync.cancel()

/**
 * Checks if remote url ready for connection
 * @returns {Number} http request status code
 */
const ping = (url) => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest
    xhr.open('GET', url, true)
    xhr.onreadystatechange = ({ target: { status } }) => resolve(status)
    xhr.send()
  })
}

/**
 * @returns {Object} produce card document
 */
const makeCard = (doc = {
  _id: new Date().toISOString(),
  content: 'Simply click here and edit this text',
  color: '#e6e6e6',
  x: 0,
  y: 0,
  h: 2,
  w: 3
}) => doc

export default {
  namespaced: true,
  state: {
    cards: []
  },
  mutations: {
    cards: (state, payload) => (state.cards = payload)
  },
  actions: {
    /** Subscribe and pull */
    init: ({ dispatch }) => {
      subscribe({ since: 'now', live: true, retry: true }, {
        change: () => dispatch('pull'),
        pause: () => dispatch('stop')
      })
      dispatch('pull')
    },
    /** Cancel subscription */
    stop: () => {
      unsubscribe()
    },
    /** Fetch all docs and commit 'em to state */
    pull: _.throttle(async ({ commit }) => {
      const { rows } = await db.allDocs({ include_docs: true, attachments: true })
      commit('cards', rows.map(row => {
        if (row.doc._attachments) {
          for (let file in row.doc._attachments) {
            row.doc = { ...row.doc, attachments: {
              [file]: row.doc._attachments[file].data
            }}
          }
        }
        return row.doc
      }))
    }, WAIT),
    /** Add single doc to db */
    push: _.debounce(async (ctx, payload = makeCard()) => {
      await db.put(payload)
    }, WAIT),
    /** Remove single doc from db */
    remove: _.debounce(async (ctx, payload) => {
      db.remove(await db.get(payload))
    }, WAIT)
  }
}
