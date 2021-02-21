const {locations: locationsMock} = require('./geocode.mock')
const url = require('url')

module.exports.geocodeRequest = (request, response) => {
  let {city} = url.parse(request.url, true).query
  if (!city) {
    city = 'antwerp'
  }
  const locationMock = locationsMock[city.toLowerCase()]
  response.send(locationMock)
}
