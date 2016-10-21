import champions from 'lol-champions'
import spells from 'lol-spells'
import uniqueid from 'uniqueid'
import xtend from 'xtend'
import { request } from '../util'

const uid = uniqueid()

const createSpell = (id) => {
  const spell = spells.find(s => s.key === String(id))
  return xtend({}, spell, {
    uid: uid(),
    state: 'available',
    cooldown: 0,
    refCooldown: spell.cooldown
  })
}

export default async (summoner) => {
  const body = await request(
    `/observer-mode/rest/consumer/getSpectatorGameInfo/EUW1/${summoner.id}`)
  if (null === body)
    throw new Error('No live game found')

  const { participants } = body
  if (1 === participants.length)
    throw new Error('Game mode not supported')

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

  return ennemies
}
