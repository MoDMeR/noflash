import choo from 'choo'
import fastclick from 'fastclick'
import log from 'choo-log'
import apiModel from '~/models/api'
import appModel from '~/models/app'
import gameModel from '~/models/game'
import welcomePage from '~/pages/welcome'
import ingamePage from '~/pages/ingame'

const app = choo()
app.use(log())

app.model(apiModel)
app.model(appModel)
app.model(gameModel)

// TODO: wait for choo to make hash routing really work
app.router(route => [
  route('/', welcomePage),
  route('/ingame', ingamePage)
])

const start = (uuid) => {
  mixpanel.identify(uuid)
  mixpanel.people.increment('sessions')

  const tree = app.start()
  document.body.appendChild(tree)
  document.body.classList.add('-ready')
  fastclick(document.body)
}

if (window.cordova) {
  document.addEventListener('deviceready', () => {
    start(device.uuid)

    plugins.insomnia.keepAwake()
    document.addEventListener('backbutton', () => {
      history.back()
    })
  })
}
else {
  start(-1)
}
