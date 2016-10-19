const error = (data, state) => {
  return { error: data }
}

export default {
  namespace: 'app',
  state: {
    title: 'No Flash',
    tagline: 'Track summoner spells',
    error: ''
  },
  reducers: { error }
}
