import xtend from 'xtend'

let errTimeoutId

export default {
  namespace: 'app',
  state: {
    title: 'No Flash',
    tagline: 'Track summoner spells',
    loading: false,
    error: ''
  },
  effects: {
    loading: (data, state, send, done) => {
      send('app:set', { error: '', loading: true }, done)
    },
    error: (data, state, send, done) => {
      send('app:set', { error: data.err, loading: false }, done)

      clearTimeout(errTimeoutId)
      errTimeoutId = setTimeout(() => {
        send('app:set', { error: '' }, done)
      }, 3000)
    }
  },
  reducers: {
    set: (data, state) => {
      return xtend(state, data)
    }
  }
}
