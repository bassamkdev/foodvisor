import {locationRequest, locationTransform} from './location.service'

import {useQuery} from 'react-query'

const getLocationConfig = query => ({
  queryKey: ['restaurants', {query}],
  queryFn: () => locationRequest(query).then(locationTransform),
})

function useLocation(query) {
  const result = useQuery(getLocationConfig(query))
  return result ?? {}
}

export {useLocation}
