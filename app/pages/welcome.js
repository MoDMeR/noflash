import html from 'choo/html'

const handleInput = (send) => (e) => {
  send('game:summoner', e.target.value)
}

const handleClick = (send) => (e) => {
  send('game:fetch')
}

export default (state, prev, send) => html`
  <main class="welcome-page">
    <div class="welcome-header">
      <h1 class="title">${state.app.title}</h1>
      <blockquote class="tagline">${state.app.tagline}</blockquote>
    </div>
    <div class="welcome-form">
      <label class="label">
        Summoner name
        <input class="input" value="ngrygod" oninput=${handleInput(send)} />
      </label>
      <button class="submit" onclick=${handleClick(send)}>Start</button>
    </div>
    <div class="error">${state.app.error}</div>
  </main>
`
