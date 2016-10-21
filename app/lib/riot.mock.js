import champions from 'lol-champions'
import spells from 'lol-spells'
import uniqueid from 'uniqueid'
import xtend from 'xtend'

const uid = uniqueid()

const createSpell = (id) => {
  const spell = spells.find(s => s.id === id)
  return xtend({}, spell, {
    uid: uid(),
    state: 'available',
    cooldown: 0,
    refCooldown: spell.cooldown
  })
}

export const fetchSummoner = (name) => Promise.resolve({
  id: 72517081,
  name: "ngrygod",
  profileIconId: 956,
  revisionDate: 1476704800000,
  summonerLevel: 30
})

export const fetchEnnemies = (summoner) => Promise.resolve([
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
