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
    summoner: store.get('app:summoner'),
    region: store.get('app:region')
  },
  effects: {
    summoner: (summoner, state, send, done) => {
      store.set('app:summoner', summoner)
      send('app:set', { summoner }, done)
    },
    region: (region, state, send, done) => {
      store.set('app:region', region)
      send('app:set', { region }, done)
    },
    loading: (data, state, send, done) => {
      send('app:set', { error: '', loading: true }, done)
    },
    error: (data, state, send, done) => {
      send('app:set', { error: data.err.message, loading: false }, done)

      mixpanel.track('app:error', data.err)

      clearTimeout(errTimeoutId)
      errTimeoutId = setTimeout(() => {
        send('app:set', { error: '', loading: false }, done)
      }, 3000)
    },
    clear: (data, state, send, done) => {
      send('app:set', { error: '', loading: false }, done)
    }
  },
  reducers: {
    set: (data, state) => xtend(state, data)
  }
}
