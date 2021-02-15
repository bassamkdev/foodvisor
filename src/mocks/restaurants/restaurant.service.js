import {mocks, mockImages} from './data'
import camelize from 'camelize'

function restaurantRequest(location = '37.7749295,-122.4194155') {
  return new Promise((resolve, reject) => {
    const mockData = mocks[location]
    if (!mockData) {
      throw new Error('not found')
    }
    setTimeout(() => {
      resolve(mockData)
    }, 2000)
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
