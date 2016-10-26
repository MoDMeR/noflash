import store from 'store'
import xtend from 'xtend'

let errTimeoutId

export default {
  namespace: 'app',
  state: {
    title: '<em>No</em> Flash',
    tagline: 'Track summoner spells',
    loading: false,
    error: '',
    summoner: store.get('app:summoner') || ''
  },
  effects: {
    summoner: (summoner, state, send, done) => {
      store.set('app:summoner', summoner)
      send('app:set', { summoner }, done)
    },
    loading: (data, state, send, done) => {
      send('app:set', { error: '', loading: true }, done)
    },
    error: (data, state, send, done) => {
      send('app:set', { error: data.err, loading: false }, done)

      clearTimeout(errTimeoutId)
      errTimeoutId = setTimeout(() => {
        send('app:set', { error: '', loading: false }, done)
      }, 3000)
    }
  },
  reducers: {
    set: (data, state) => xtend(state, data)
  }
}
