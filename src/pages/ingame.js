import html from 'choo/html'
import ennemyList from '~/views/ennemy-list'

export default (state, prev, send) => html`
  <main class="ingame-page">
    ${ennemyList(state.game, prev, send)}
  </main>
`
