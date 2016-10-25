import html from 'choo/html'
import classnames from 'classnames'
import closest from 'closest'
import spellList from './spell-list'

const handleClick = (e, ennemy, send) => {
  if (null == closest(e.target, '.spell-item', true)) {
    send('game:toggleFocus', ennemy)
  }
}

const classVariants = (ennemy) => classnames({
  [`-focused`]: ennemy.focused
})

export default (ennemy, prev, send) => html`
  <li class="ennemy-item ${classVariants(ennemy)}"
    onclick=${e => handleClick(e, ennemy, send)}>
    <div class="ennemy-meta">
      <h2 class="champion">${ennemy.champion.name}</h2>
    </div>
    ${spellList(ennemy, prev, send)}
  </li>
`
