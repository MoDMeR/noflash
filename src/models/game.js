import xtend from 'xtend'

const spellAudio = new Audio('sounds/spell.ogg')

let numCooldowns = 0

export default {
  namespace: 'game',
  state: {
    ennemies: []
  },
  effects: {
    fetch: (name, state, send, done) => {
      send('app:loading', () => {
        send('api:summoner', name, (err, summoner) => {
          if (err) return send('app:error', { err }, done)

          mixpanel.identify(summoner.id)
          mixpanel.people.set({ '$first_name': summoner.name })

          send('api:ennemies', summoner, (err, ennemies) => {
            if (err) return send('app:error', { err }, done)

            mixpanel.track('game:init')

            send('game:ennemies', ennemies, () => {
              send('app:clear', () => {
                send('location:setLocation', { location: '/ingame' }, done)
                history.pushState({}, null, '/ingame')
              })
            })
          })
        })
      })
    },
    cooldown: (spell, state, send, done) => {
      if ('cooldown' !== spell.state) {
        numCooldowns++
        send('game:startCooldown', spell.uid, done)
      }
      else {
        send('game:decrementCooldown', { uid: spell.uid, amount: 10 }, done)
      }
    }
  },
  reducers: {
    ennemies: (ennemies, state) => ({ ennemies }),
    startCooldown: (uid, state) => ({
      ennemies: state.ennemies.map(ennemy => xtend(ennemy, {
        spells: ennemy.spells.map(spell => {
          if (spell.uid === uid) {
            mixpanel.track('game:cooldown:start', { spell: spell.id })

            return xtend({}, spell, {
              state: 'cooldown',
              cooldown: spell.refCooldown - 1
            })
          }
          else {
            return spell
          }
        })
      }))
    }),
    decrementCooldown: (data, state) => ({
      ennemies: state.ennemies.map(ennemy => xtend(ennemy, {
        spells: ennemy.spells.map(spell => {
          if ('cooldown' !== spell.state) return spell
          if (data.uid && spell.uid !== data.uid) return spell

          if (data.amount > 1) {
            mixpanel.track('game:cooldown:decrement', { spell: spell.id })
          }

          const newSpell = xtend({}, spell, {
            cooldown: spell.cooldown - data.amount
          })

          if (newSpell.cooldown <= 0) {
            newSpell.cooldown = 0
            newSpell.state = 'available'
            numCooldowns--

            spellAudio.play()
          }

          return newSpell
        })
      }))
    }),
    toggleFocus: (data, state) => ({
      ennemies: state.ennemies.map(ennemy => {
        if (ennemy.name === data.name) {
          const focused = !ennemy.focused
          mixpanel.track('game:focus', { focused })
          return xtend({}, ennemy, { focused })
        }
        else {
          return ennemy
        }
      })
    })
  },
  subscriptions: {
    tick: (send, done) => {
      setInterval(() => {
        if (0 !== numCooldowns) {
          send('game:decrementCooldown', { amount: 1 }, done)
        }
      }, 1000)
    }
  }
}
