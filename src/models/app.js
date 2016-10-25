import xtend from 'xtend'

let errTimeoutId

export default {
  namespace: 'app',
  state: {
    title: '<em>No</em> Flash',
    tagline: 'Track summoner spells',
    loading: false,
    error: ''
  },
  effects: {
    loading: (data, state, send, done) => {
      send('app:status', { error: '', loading: true }, done)
    },
    error: (data, state, send, done) => {
      send('app:status', { error: data.err, loading: false }, done)

      clearTimeout(errTimeoutId)
      errTimeoutId = setTimeout(() => {
        send('app:status', { error: '', loading: false }, done)
      }, 3000)
    }
  },
  reducers: {
    status: (data, state) => ({ error: data.error, loading: data.loading })
  }
}
