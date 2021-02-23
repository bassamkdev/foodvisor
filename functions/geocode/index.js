const functions = require('firebase-functions')

const {locations: locationsMock} = require('./geocode.mock')
const url = require('url')

module.exports.geocodeRequest = (request, response, client) => {
  let {city, mock} = url.parse(request.url, true).query
  if (mock === 'true') {
    const locationMock = locationsMock[city.toLowerCase()]
    response.json(locationMock)
  } else {
    client
      .geocode({
        params: {
          address: city,
          key: functions.config().google.key,
        },
        timeout: 1000,
      })
      .then(res => response.json(res.data))
      .catch(err => response.status(400).send(err.response.data.error_message))
  }
}
