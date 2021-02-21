const {mocks: restaurantsMocks} = require('./data')
const {addMockImage} = require('./data')
const url = require('url')

module.exports.restaurantsRequest = (request, response) => {
  const {location} = url.parse(request.url, true).query
  const data = restaurantsMocks[location]
  if (data) {
    data.results = data.results.map(addMockImage)
  }
  response.json(data)
}
