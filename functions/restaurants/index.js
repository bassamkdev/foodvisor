const functions = require('firebase-functions')

const {mocks: restaurantsMocks} = require('./data')
const {addMockImage} = require('./data')
const url = require('url')

function addGoogleImages(restaurant) {
  const ref = restaurant.photos ? restaurant.photos[0].photo_reference : null
  if (!ref) {
    restaurant.photos = [
      'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
    ]
    return restaurant
  }
  restaurant.photos = [
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${ref}&key=${
      functions.config().google.key
    }`,
  ]
  return restaurant
}

module.exports.restaurantsRequest = async (request, response, client) => {
  const {location, mock} = url.parse(request.url, true).query
  if (mock === 'true') {
    const data = restaurantsMocks[location]
    if (data) {
      data.results = data.results.map(addMockImage)
    }
    return response.json(data)
  }
  try {
    const res = await client.placesNearby({
      params: {
        location: location,
        radius: 1500,
        type: 'restaurant',
        key: functions.config().google.key,
      },
      timeout: 1000,
    })
    res.data.results = res.data.results.map(addGoogleImages)
    return response.json(res.data)
  } catch (error) {
    return response.status(400).send(error.message)
  }
}
