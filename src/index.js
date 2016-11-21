import choo from 'choo'
import fastclick from 'fastclick'
import log from 'choo-log'
import store from 'store'
import apiModel from '~/models/api'
import appModel from '~/models/app'
import gameModel from '~/models/game'
import welcomePage from '~/pages/welcome'
import ingamePage from '~/pages/ingame'

window.onerror = function(message, file, line) {
  mixpanel.track('js:err', { message, file, line })
}

if (null == store.get('app:summoner')) {
  store.set('app:summoner', '')
}
if (null == store.get('app:region')) {
  store.set('app:region', 'EUW')
}

const app = choo()
app.use(log())
app.use({
  wrapInitialState(models) {
    const { app } = models
    app.summoner = store.get('app:summoner')
    app.region = store.get('app:region')
    return models
  }
})

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
