import html from 'choo/html'
import ennemyItem from '../views/ennemy-item'

export default (game, prev, send) => html`
  <ul class="ennemy-list">
    ${game.ennemies.map(ennemy => ennemyItem(ennemy, prev, send))}
  </ul>
`
