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

const tree = app.start()
document.body.appendChild(tree)
fastclick(document.body)

document.addEventListener('deviceready', () => {
  document.addEventListener('backbutton', () => {
    if ('#ingame' === location.hash) {
      history.back()
    }
  })
})
