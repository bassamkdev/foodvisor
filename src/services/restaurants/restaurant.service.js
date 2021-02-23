import camelize from 'camelize'

function restaurantTransform({results = []}) {
  const transformedResults = results.map(restaurant => {
    return {
      ...restaurant,
      isOpenNow: restaurant.opening_hours?.open_now || true,
      isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
    }
  })
  return camelize(transformedResults)
}

export {restaurantTransform}
