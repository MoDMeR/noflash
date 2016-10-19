import html from 'choo/html'
import spellList from '../views/spell-list'

export default (ennemy, prev, send) => html`
  <li class="ennemy-item">
    <div class="ennemy-meta">
      <h2 class="role">${ennemy.role}</h2>
      <strong class="champion">${ennemy.champion.name}</strong>
    </div>
    ${spellList(ennemy, prev, send)}
  </li>
`
