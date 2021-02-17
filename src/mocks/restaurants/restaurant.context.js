import {restaurantRequest, restaurantTransform} from './restaurant.service'
import {useQuery} from 'react-query'
import {Platform} from 'react-native'

// const restaurantsQueryConfig = {
//   staleTime: 1000 * 60 * 60,
//   cacheTime: 1000 * 60 * 60,
// }

function useRestaurants(query, options = {}) {
  const result = useQuery({
    queryKey: ['restaurants', {query}],
    queryFn: () => restaurantRequest(query).then(restaurantTransform),
    staleTime: Platform.OS === 'ios' ? 1000 * 60 * 60 : 1000,
    ...options,
  })
  return result
}

export {useRestaurants}
