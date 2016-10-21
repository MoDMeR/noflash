import fetch from 'ponyfetch'

export const request = async (url) => {
  const proxyUrl =
    'https://wt-ngryman-gmail_com-0.run.webtask.io/riot-proxy'
  const res = await fetch(`${proxyUrl}?url=${url}`)
  const body = await res.json()
  return (null == body.status ? body : null)
}

export const renderIf = (condition, state, renderer) => condition
  ? renderer(state)
  : ''

export function wrapEffect(effect) {
  return async (data, state, send, done) => {
    const newSend = (action, data = null) => {
      return new Promise((resolve, reject) => {
        send(action, data, (err, res) => {
          if (err) {
            done(err) // communicate error to choo
            reject(err) // throw
          } else {
            resolve(res) // move forward
          }
        })
      })
    }
    await effect(data, state, newSend)
    done() // auto-done when everything is done
  }
}
