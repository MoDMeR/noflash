import xtend from 'xtend'

export const summoner = (data, state) => ({ summoner: data })

export const ennemies = (data, state) => ({ ennemies: data })

export const update = (data, state) => ({
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
