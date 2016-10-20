import choo from 'choo/dist/choo'
import fastclick from 'fastclick'

import appModel from './models/app'
import gameModel from './models/game'

import welcomePage from './pages/welcome'
import ingamePage from './pages/ingame'

const app = choo()

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
