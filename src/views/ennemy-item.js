import html from 'choo/html'
import spellList from './spell-list'

export default (ennemy, prev, send) => html`
  <li class="ennemy-item">
    <div class="ennemy-meta">
      <h2 class="role">${ennemy.champion.name}</h2>
      <strong class="champion">${ennemy.name}</strong>
    </div>
    ${spellList(ennemy, prev, send)}
  </li>
`
