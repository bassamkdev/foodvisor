import {mocks, mockImages} from './data'
import camelize from 'camelize'

function restaurantRequest(location) {
  let locationString
  if (!location.lat) {
    locationString = '51.219448,4.402464'
  } else {
    locationString = `${location.lat},${location.lng}`
  }
  return new Promise((resolve, reject) => {
    const mockData = mocks[locationString]
    if (!mockData) {
      throw new Error('not found')
    }

    resolve(mockData)
  })
}

function restaurantTransform({results = []}) {
  const transformedResults = results.map(restaurant => {
    restaurant.photos = restaurant.photos.map(photo => {
      return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))]
    })

    return {
      ...restaurant,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
    }
  })
  return camelize(transformedResults)
}

export {restaurantRequest, restaurantTransform}
