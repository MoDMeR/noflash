import * as reducers from './game/reducers'
import * as effects from './game/effects'
import * as subscriptions from './game/subscriptions'

export default {
  namespace: 'game',
  state: { summoner: '', ennemies: [] },
  reducers,
  effects,
  subscriptions
}
