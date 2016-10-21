import fetch from 'ponyfetch'
import champions from 'lol-champions'
import spells from 'lol-spells'
import uniqueid from 'uniqueid'
import xtend from 'xtend'

const uid = uniqueid()

const proxyUrl = 'https://wt-ngryman-gmail_com-0.run.webtask.io/riot-proxy?url='

const createSpell = (id) => {
  const spell = spells.find(s => s.key === String(id))
  return xtend({}, spell, {
    uid: uid(),
    state: 'available',
    cooldown: 0,
    refCooldown: spell.cooldown
  })
}

export const fetchSummoner = async (name) => {
  const url = `${proxyUrl}/api/lol/euw/v1.4/summoner/by-name/${name}`

  const res = await fetch(`${url}`, { mode: 'cors' })
  if (404 === res.status) throw new Error('Unknown summoner')

  const json = await res.json()

  const summoner = json[name.toLowerCase().replace(/ /g, '')]
  if (!summoner) throw new Error('No summoner found')

  return summoner
}

export const fetchEnnemies = async (summoner) => {
  const url = `${proxyUrl}/observer-mode/rest/consumer/getSpectatorGameInfo/EUW1/${summoner.id}`

  const res = await fetch(url)
  if (404 === res.status) throw new Error('No live game found')

  const { participants } = await res.json()
  if (1 === participants.length) throw new Error('Game mode not supported')

  const summonerTeam = participants.find(
    participant => summoner.name === participant.summonerName
  ).teamId

  const ennemies = participants
    .filter(participant => participant.teamId !== summonerTeam)
    .map(participant => ({
      summonerName: participant.summonerName,
      champion: champions.find(c => c.key === String(participant.championId)),
      spells: [
        createSpell(participant.spell1Id),
        createSpell(participant.spell2Id)
      ]
    }))
  console.log(ennemies)

  return ennemies
}
