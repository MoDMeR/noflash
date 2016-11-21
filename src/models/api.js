import champions from 'lol-champions'
import find from 'array-find'
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

const error = (message, url, status, done) => {
  done({ message, url, status })
}

const uid = uniqueid()

export default {
  namespace: 'api',
  effects: {
    request: (url, state, send, done) => {
      const region = store.get('app:region')
      return xhr(`${proxyUrl}?url=${url}&region=${region}`, { json: true },
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

      const url = `${endpoint('summoner')}/${name}`

      send('api:request', url, (err, body) => {
        if (err > 400)
          return error('Unknown summoner', url, err, done)

        const summoner = body[name.toLowerCase().replace(/ /g, '')]
        if (!summoner)
          return error('No summoner found', url, err, done)

        store.set('api:summoner', summoner)

        done(null, summoner)
      })
    },
    game: (summoner, state, send, done) => {
      const url = `${endpoint('ennemies')}/${summoner.id}`

      send('api:request', url, (err, body) => {
        if (err > 400)
          return error('No live game found', url, err, done)

        if ('CLASSIC' !== body.gameMode || 'MATCHED_GAME' !== body.gameType)
          return error('Game mode not supported', url, err, done)

        const { gameId, participants } = body

        const summonerTeam = find(participants, participant =>
          summoner.name === participant.summonerName
        ).teamId

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

        done(null, { gameId, ennemies })
      })
    }
  }
}

function createChampion(id) {
  return find(champions, c => c.key === String(id))
}

function createSpell(id) {
  const spell = find(spells, s => s.key === String(id))
  return xtend({}, spell, {
    uid: uid(),
    state: 'available',
    cooldown: 0,
    refCooldown: spell.cooldown
  })
}
