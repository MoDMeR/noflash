import { fetchSummoner, fetchEnnemies } from '../../lib/riot'

export const fetch = async (data, state, send, done) => {
  try {
    const summoner = await fetchSummoner(state.summoner)
    const ennemies = await fetchEnnemies(summoner)

    send('game:summoner', summoner, done)
    send('game:ennemies', ennemies, () => {
      send('location:setLocation', { location: '/ingame' }, done)
    })
  }
  catch (err) {
    send('app:error', err, done)
  }
}
