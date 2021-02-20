import camelize from 'camelize'

function locationRequest(searchTerm) {}

function locationTransform(result) {
  const camelizedResults = camelize(result.results)
  const {geometry = {}} = camelizedResults[0]
  const {lat, lng} = geometry.location
  return {lat, lng, viewport: geometry.viewport}
}

export {locationRequest, locationTransform}
