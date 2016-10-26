import champions from 'lol-champions'
import spells from 'lol-spells'
import store from 'store'
import uniqueid from 'uniqueid'
import xhr from 'xhr'
import xtend from 'xtend'

const proxyUrl = 'https://wt-ngryman-gmail_com-0.run.webtask.io/riot-proxy'

const endpoint = (name) => {
  const region = store.get('app:region')
  switch (name) {
    case 'summoner':
      return `/api/lol/${region}/v1.4/summoner/by-name`
    case 'ennemies':
      return `/observer-mode/rest/consumer/getSpectatorGameInfo/${region}1`
  }
}

const uid = uniqueid()

export default {
  namespace: 'api',
  effects: {
    request: (url, state, send, done) => {
      return xhr(`${proxyUrl}?url=${url}`, { json: true },
      (err, res, body) => {
        if (null == body.status) {
          done(null, body)
        }
        else {
          done(body.status.status_code)
        }
      })
    },
    summoner: (name, state, send, done) => {
      const summoner = store.get('api:summoner')
      if (null != summoner && summoner.name === name)
        return done(null, summoner)

      send('api:request', `${endpoint('summoner')}/${name}`,
      (err, body) => {
        if (403 === err || 404 === err)
          return done('Unknown summoner')

        const summoner = body[name.toLowerCase().replace(/ /g, '')]
        if (!summoner)
          return done('No summoner found')

        store.set('api:summoner', summoner)

        done(null, summoner)
      })
    },
    ennemies: (summoner, state, send, done) => {
      send('api:request', `${endpoint('ennemies')}/${summoner.id}`,
      (err, body) => {
        if (404 === err)
          return done('No live game found')

        const { participants } = body
        if (1 === participants.length)
          return done('Game mode not supported')

        const summonerTeam = participants
          .find(participant => summoner.name === participant.summonerName)
          .teamId

        const ennemies = participants
          .filter(participant => participant.teamId !== summonerTeam)
          .map(participant => ({
            name: participant.summonerName,
            champion: createChampion(participant.championId),
            spells: [
              createSpell(participant.spell1Id),
              createSpell(participant.spell2Id)
            ]
          }))

        done(null, ennemies)
      })
    }
  }
}

function createChampion(id) {
  return champions.find(c => c.key === String(id))
}

function createSpell(id) {
  const spell = spells.find(s => s.key === String(id))
  return xtend({}, spell, {
    uid: uid(),
    state: 'available',
    cooldown: 0,
    refCooldown: spell.cooldown
  })
}
