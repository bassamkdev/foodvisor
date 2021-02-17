import {locationRequest, locationTransform} from './location.service'
import {Platform} from 'react-native'
import {useQuery} from 'react-query'

const getLocationConfig = query => ({
  queryKey: ['location', {query}],
  queryFn: () => locationRequest(query).then(locationTransform),
  staleTime: Platform.OS === 'ios' ? 1000 * 60 * 60 : 1000,
})

function useLocation(query) {
  const result = useQuery(getLocationConfig(query))
  return result
}

export {useLocation}
