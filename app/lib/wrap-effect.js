export default function wrapEffect(effect) {
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
