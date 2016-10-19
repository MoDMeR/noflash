import xtend from 'xtend'

const decrementCooldown = (spell, amount) => {
  const newSpell = xtend({}, spell, { cooldown: spell.cooldown - amount })
  if (newSpell.cooldown <= 0) {
    newSpell.cooldown = 0
    newSpell.state = 'available'
  }
  return newSpell
}

export const summoner = (data, state) => ({ summoner: data })

export const ennemies = (data, state) => ({ ennemies: data })

export const updateSpell = (data, state) => ({
  ennemies: state.ennemies.map(ennemy => {
    ennemy.spells = ennemy.spells.map(spell => {
      if (spell.uid === data.uid) {
        return xtend({}, spell, data)
      }
      return spell
    })
    return ennemy
  })
})

export const decrementSpellCooldown = (data, state) => ({
  ennemies: state.ennemies.map(ennemy => {
    ennemy.spells = ennemy.spells.map(spell => {
      if (spell.uid === data.uid && 'cooldown' === spell.state) {
        return decrementCooldown(spell, data.amount)
      }
      return spell
    })
    return ennemy
  })
})

export const decrementAllSpellsCooldown = (amount, state) => ({
  ennemies: state.ennemies.map(ennemy => {
    ennemy.spells = ennemy.spells.map(spell => {
      if ('cooldown' === spell.state) {
        return decrementCooldown(spell, amount)
      }
      return spell
    })
    return ennemy
  })
})
