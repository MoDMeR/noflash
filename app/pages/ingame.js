import html from 'choo/html'
import ennemyList from '../views/ennemy-list'

const handleLoad = (e, state, send) => {
  send('game:timer', true)
}

export default (state, prev, send) => html`
  <main class="ingame-page" onload=${e => handleLoad(e, state, send)}>
    ${ennemyList(state.game, prev, send)}
  </main>
`
