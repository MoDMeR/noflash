import champions from 'lol-champions'
import spells from 'lol-spells'
import uniqueid from 'uniqueid'
import xhr from 'xhr'
import xtend from 'xtend'

const proxyUrl = 'https://wt-ngryman-gmail_com-0.run.webtask.io/riot-proxy'

const endpoints = {
  summoner: '/api/lol/euw/v1.4/summoner/by-name',
  ennemies: '/observer-mode/rest/consumer/getSpectatorGameInfo/EUW1'
}

const uid = uniqueid()

export default {
  namespace: 'api',
  effects: {
    request: (data, state, send, done) => {
      const url = `${proxyUrl}?url=${data.url}`

      return xhr(url,{ json: true }, (err, res, body) => {
        if (null == body.status) {
          done(null, body)
        }
        else {
          done(body.status.status_code)
        }
      })
    },
    summoner: (data, state, send, done) => {
      const { name } = data

      send('api:request', {
        url: `${endpoints.summoner}/${data.name}`
      }, (err, body) => {
        if (403 === err)
          return done('Unknown summoner')

        const summoner = body[data.name.toLowerCase().replace(/ /g, '')]
        if (!summoner)
          return done('No summoner found')

        done(null, summoner)
      })
    },
    ennemies: (data, state, send, done) => {
      const { summoner } = data

      send('api:request', {
        url: `${endpoints.ennemies}/${summoner.id}`
      }, (err, body) => {
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
          .map(participant => {
            const champion = champions.find(
              c => c.key === String(participant.championId))

            const spells = [
              createSpell(participant.spell1Id),
              createSpell(participant.spell2Id)
            ]

            const role = findRole(champion, spells)

            return {
              summonerName: participant.summonerName,
              role,
              champion,
              spells
            }
          })

        done(null, ennemies)
      })
    }
  }
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

// TODO
function findRole(champion, spells) {
  if (spells.some(spell => 'teleport' === spell.id)) return 'mid'
  if (spells.some(spell => 'exhaust' === spell.id)) return 'support'
  if (spells.some(spell => 'smite' === spell.id)) return 'jungle'
  if (spells.some(spell => 'heal' === spell.id)) return 'adc'
}
