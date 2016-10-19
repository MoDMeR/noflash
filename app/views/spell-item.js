import html from 'choo/html'
import classnames from 'classnames'

const handleClick = (e, spell, send) => {
  send('game:update', {
    uid: spell.uid,
    state: 'unknown'
  })
}

const classVariants = (spell) => classnames({
  [`-${spell.id}`]: true,
  [`-${spell.state}`]: true
})

export default (spell, prev, send) => html`
  <li
    class="spell-item ${classVariants(spell)}"
    onclick=${e => handleClick(e, spell, send)}>
    <svg class="icon">
      <use xlink:href="#svg-${spell.id}">
    </svg>
  </li>
`
