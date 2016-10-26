import html from 'choo/html'
import classnames from 'classnames'
import renderIf from '~/lib/render-if'

const regions = [
  'BR', 'EUNE', 'EUW', 'JP', 'KR', 'LAN', 'LAS', 'NA', 'OCE', 'PBE', 'RU', 'TR'
]

const handleSubmit = (e, state, send) => {
  e.preventDefault()

  if (state.app.summoner) {
    send('game:fetch', state.app.summoner)
  }
  else {
    send('app:error', 'Empty summoner name')
  }
}

const handleInput = (e, state, send) => {
  send('app:summoner', e.target.value)
}

const handleChange = (e, state, send) => {
  send('app:region', e.target.value)
}

const classVariants = (state) => classnames({
  [`-loading`]: state.app.loading
})

const renderRegion = (region, state) => html`
  <option ${region === state.app.region ? 'selected' : ''}>${region}</option>
`

const renderError = (error) => html`
  <div class="error-pane">${error}</div>
`

export default (state, prev, send) => html`
  <main class="welcome-page">
    <div class="welcome-header">
      <h1 class="title"><em>No</em>Flash</h1>
      <blockquote class="tagline">${state.app.tagline}</blockquote>
    </div>
    <form class="welcome-form ${classVariants(state)}"
      onsubmit=${e => handleSubmit(e, state, send)}}>
      <fieldset class="fieldset">
        <label class="label">
          Summoner name
          <input
            class="input"
            value=${state.app.summoner}
            ${state.app.loading ? 'disabled' : ''}
            oninput=${e => handleInput(e, state, send)} />
        </label>
        <select class="regions" onchange=${e => handleChange(e, state, send)}>
          ${regions.map(region => renderRegion(region, state))}
        </select>
      </fieldset>
      <button class="submit">Start</button>
    </form>
    ${renderIf(state.app.error, state.app.error, renderError)}
  </main>
`
