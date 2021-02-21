import {locationTransform} from './location.service'
import {useQuery} from 'react-query'
import {host} from '../../utils/host'

console.log(host)
const getLocationConfig = query => {
  return {
    queryKey: ['location', {query}],
    queryFn: () =>
      fetch(`${host}geocode?city=${query}`)
        .then(res => res.json())
        .then(data => {
          return locationTransform(data)
        }),

    // staleTime: Platform.OS === 'ios' ? 1000 * 60 * 60 : 1000,
  }
}

function useLocation(query) {
  const {data: location} = useQuery(getLocationConfig(query))
  return (
    location ?? {
      lat: 37.7749295,
      lng: -122.4194155,
      viewport: {
        northeast: {lat: 37.812, lng: -122.3482},
        southwest: {lat: 37.70339999999999, lng: -122.527},
      },
    }
  )
}

export {useLocation}
