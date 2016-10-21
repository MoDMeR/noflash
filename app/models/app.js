const error = (err, state) => ({
  error: err.message
})

const clearError = (data, state) => ({
  error: ''
})

const loading = (loading, state) => ({
  loading
})

export default {
  namespace: 'app',
  state: {
    title: 'No Flash',
    tagline: 'Track summoner spells',
    loading: false,
    error: ''
  },
  reducers: { error, clearError, loading }
}
