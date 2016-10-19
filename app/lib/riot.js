import assign from 'deep-assign'
import fetch from 'whatwg-fetch'
import champions from 'lol-champions'
import spells from 'lol-spells'
import uniqueid from 'uniqueid'

const uid = uniqueid()

const apiKey = '81d00796-d2a2-4e8e-b112-2c20c7ef60c0'
const baseUrl = 'https://euw.api.pvp.net'
const apiUrl = `${baseUrl}/api/lol/euw/v1.4`

export const fetchSummoner = (name) => {
  const url = `${apiUrl}/summoner/by-name/${name}?api_key=${apiKey}`

  return new Promise((resolve, reject) => {
    resolve({
      id: 72517081,
      name: "ngrygod",
      profileIconId: 956,
      revisionDate: 1476704800000,
      summonerLevel: 30
    })
    return

    // TODO: fetch
    // http(url, (err, res, body) => {
    //   const json = JSON.parse(body)
    //   const summoner = json[name.toLowerCase()]
    //
    //   if (summoner) {
    //     resolve(summoner)
    //   }
    //   else {
    //     reject('No summoner found.')
    //   }
    // })
  })
}

const createSpell = (id) => {
  const spell = spells.find(s => s.id === id)
  return assign({
    uid: uid(),
    state: 'available'
  }, spell)
}

export const fetchEnnemies = (summoner) => {
  const url = `${apiUrl}/observer-mode/rest/consumer/getSpectatorGameInfo/EUW1/${summoner.id}?api_key=${apiKey}`

  return new Promise((resolve, reject) => {
    resolve([
      {
        name: 'Vocyfera12',
        role: 'Top',
        champion: champions.find(c => c.id === 'jax'),
        spells: [
          createSpell('teleport'),
          createSpell('haste')
        ]
      },
      {
        name: 'phuctran',
        role: 'Jungle',
        champion: champions.find(c => c.id === 'olaf'),
        spells: [
          createSpell('smite'),
          createSpell('haste')
        ]
      },
      {
        name: 'Mr Over',
        role: 'Mid',
        champion: champions.find(c => c.id === 'leblanc'),
        spells: [
          createSpell('dot'),
          createSpell('flash')
        ]
      },
      {
        name: 'ngrygod',
        role: 'ADC',
        champion: champions.find(c => c.id === 'lucian'),
        spells: [
          createSpell('heal'),
          createSpell('flash')
        ]
      },
      {
        name: 'xxatomexx',
        role: 'Support',
        champion: champions.find(c => c.id === 'leona'),
        spells: [
          createSpell('exhaust'),
          createSpell('flash')
        ]
      }
    ])
    return

    // TODO: fetch
    // http(`https://crossorigin.me/${url}`, (err, res, body) => {
    //   if (403 === res.statusCode) return reject('No live game found.')
    //
    //   const json = JSON.parse(body)
    //   const ennemies = json.participants.map(participant => ({
    //     summonerName: participant.summonerName,
    //     championId: participant.championId,
    //     spell1Id: participant.spell1Id,
    //     spell2Id: participant.spell2Id
    //   }))
    //   console.log(ennemies)
    //
    //   resolve(ennemies)
    // })
  })
}
