import camelize from 'camelize'

import {locations} from './data/location'

function locationRequest(searchTerm) {
  if (!searchTerm) {
    searchTerm = 'antwerp'
  }
  return new Promise((resolve, reject) => {
    const mockLocation = locations[searchTerm]
    if (!mockLocation) {
      reject('location not found')
    }
    resolve(mockLocation)
  })
}

function locationTransform(result) {
  const camelizedResults = camelize(result.results)
  const {geometry = {}} = camelizedResults[0]
  const {lat, lng} = geometry.location
  return {lat, lng}
}

export {locationRequest, locationTransform}
