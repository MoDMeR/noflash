var request = require('request')

var apiUrl = 'https://euw.api.pvp.net'

module.exports = function(context, cb) {
  var targetUrl = `${apiUrl}/${context.data.url}?api_key=${context.secrets.apiKey}`

  request.get({ url: targetUrl }, function(err, res, body) {
    if (err) return cb(err)
    cb(null, JSON.parse(body))
  })
}
