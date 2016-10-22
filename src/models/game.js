import xtend from 'xtend'

// TODO: nanoraf for timer?
let intervalId

export default {
  namespace: 'game',
  state: {
    ennemies: []
  },
  effects: {
    fetch: (data, state, send, done) => {
      send('app:loading', () => {
        send('api:summoner', data, (err, summoner) => {
          if (err) return send('app:error', { err }, done)

          send('api:ennemies', { summoner }, (err, ennemies) => {
            if (err) return send('app:error', { err }, done)

            send('game:ennemies', ennemies, () => {
              send('location:setLocation', { location: '/ingame' }, done)
            })
          })
        })
      })
    },
    timer: (activate, state, send, done) => {
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
      }
    }
  },
  reducers: {
    summoner: (data, state) => ({ summoner: data }),
    ennemies: (data, state) => ({ ennemies: data }),
    updateSpell: (data, state) => ({
      ennemies: state.ennemies.map(ennemy => {
        ennemy.spells = ennemy.spells.map(spell => {
          if (spell.uid === data.uid) {
            return xtend({}, spell, data)
          }
          return spell
        })
        return ennemy
      })
    }),
    decrementSpellCooldown: (data, state) => ({
      ennemies: state.ennemies.map(ennemy => {
        ennemy.spells = ennemy.spells.map(spell => {
          if (spell.uid === data.uid && 'cooldown' === spell.state) {
            return decrementCooldown(spell, data.amount)
          }
          return spell
        })
        return ennemy
      })
    }),
    decrementAllSpellsCooldown: (amount, state) => ({
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
  }
}

function decrementCooldown(spell, amount) {
  const newSpell = xtend({}, spell, { cooldown: spell.cooldown - amount })
  if (newSpell.cooldown <= 0) {
    newSpell.cooldown = 0
    newSpell.state = 'available'
  }
  return newSpell
}
