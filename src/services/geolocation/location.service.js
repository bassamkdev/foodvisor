import camelize from 'camelize'

function locationRequest(searchTerm) {}

function locationTransform({results = []}) {
  const data = results[0]
  const camelizedResults = camelize(data)
  const {
    geometry: {
      location: {lat, lng},
      viewport,
    },
  } = camelizedResults
  return {lat, lng, viewport}
}

export {locationRequest, locationTransform}
