import {locationTransform} from './location.service'
import {Platform} from 'react-native'
import {useQuery} from 'react-query'

const getLocationConfig = query => ({
  queryKey: ['location', {query}],
  queryFn: () =>
    fetch(
      `http://localhost:5001/foodvisor-5f5fc/us-central1/geocode?city=${query}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data)
        return locationTransform(data)
      }),

  // staleTime: Platform.OS === 'ios' ? 1000 * 60 * 60 : 1000,
})

function useLocation(query) {
  const result = useQuery(getLocationConfig(query))
  return result
}

export {useLocation}
