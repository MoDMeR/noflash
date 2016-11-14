var request = require('request')

var apiDomain = 'api.pvp.net'

module.exports = function(context, cb) {
  // support 0.1.0
  var region = context.data.region || 'euw'
  var url = context.data.url.replace('undefined', 'euw')
  
  var targetUrl = `https://${region}.${apiDomain}/${url}?api_key=${context.secrets.apiKey}`

  request.get({ url: targetUrl }, function(err, res, body) {
    if (err) return cb(err)
    cb(null, JSON.parse(body))
  })
}
