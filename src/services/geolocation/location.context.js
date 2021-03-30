import {locationTransform} from './location.service'
import {useQuery} from 'react-query'
import {host, isMock} from '../../utils/host'

const getLocationConfig = query => {
  return {
    queryKey: ['location', {query}],
    queryFn: () =>
      fetch(`${host}geocode?city=${query}&mock=${isMock}`)
        .then(res => res.json())
        .then(locationTransform),

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
