import { fetchSummoner, fetchEnnemies } from '../../lib/riot'
import wrapEffect from '../../lib/wrap-effect'

let intervalId

export const fetch = wrapEffect(async (summonerName, state, send) => {
  await send('app:loading', true)

  let summoner, ennemies

  try {
    summoner = await fetchSummoner(summonerName)
    ennemies = await fetchEnnemies(summoner)
  }
  catch (err) {
    return await send('app:error', err)
  }
  finally {
    await send('app:loading', false)
  }

  await send('game:summoner', summoner)
  await send('game:ennemies', ennemies)
  await send('location:setLocation', { location: '/ingame' })
})

export const timer = (activate, state, send, done) => {
  if (activate) {
    if (null == intervalId) {
      intervalId = setInterval(() => {
        send('game:decrementAllSpellsCooldown', 1, done)
      }, 1000)
    }
  }
  else {
    clearInterval(intervalId)
    intervalId = null
    done()
  }
}
