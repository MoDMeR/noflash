import * as reducers from './game/reducers'
import * as effects from './game/effects'

export default {
  namespace: 'game',
  state: { summoner: '', ennemies: [] },
  reducers,
  effects
}
