import html from 'choo/html'
import spellItem from './spell-item'

export default (ennemy, prev, send) => html`
  <ul class="spell-list">
    ${ennemy.spells.map(spell => spellItem(spell, prev, send))}
  </ul>
`
