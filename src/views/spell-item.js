import html from 'choo/html'
import classnames from 'classnames'
import renderIf from '~/lib/render-if'

const handleClick = (e, spell, send) => {
  send('game:cooldown', spell)
}

const classVariants = (spell) => classnames({
  [`-${spell.id}`]: true,
  [`-${spell.state}`]: true,
  [`-time60`]: spell.cooldown <= 60 && spell.cooldown > 30,
  [`-time30`]: spell.cooldown <= 30 && spell.cooldown > 0
})

const drawCooldownPie = (spell) => {
  const r = 50
  const t = 1 - spell.cooldown / spell.refCooldown
  const a = t * Math.PI * 2
  const m = a > Math.PI ? 1 : 0
  const x = Math.sin(a) * r
  const y = Math.cos(a) * -r

  return html`
    <g transform=${`translate(${r}, ${r})`}
      stroke-linecap="round"
      vector-effect="non-scaling-stroke">
      <circle class="progress-bg" cx="0" cy="0" r="50" />
      <path class="progress" d=${`M 0 ${-r} A ${r} ${r} 1 ${m} 1 ${x} ${y}`}></path>
    </g>
  `
}

const renderCooldown = (spell) => html`
  <svg class="cooldown"
    viewBox="-5 -5 110 110">
    ${drawCooldownPie(spell)}
  </svg>
`

export default (spell, prev, send) => html`
  <li
    class="spell-item ${classVariants(spell)}"
    onclick=${e => handleClick(e, spell, send)}>
    ${renderIf('cooldown' === spell.state, spell, renderCooldown)}
    <svg class="icon">
      <use xlink:href="#svg-${spell.id}">
    </svg>
  </li>
`
