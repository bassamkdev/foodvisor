import {restaurantRequest, restaurantTransform} from './restaurant.service'
import {useQuery} from 'react-query'

const getRestaurantsConfig = query => ({
  queryKey: ['restaurants', {query}],
  queryFn: () => restaurantRequest(query).then(restaurantTransform),
})

function useRestaurants(query) {
  const result = useQuery(getRestaurantsConfig(query))
  return result
}

export {useRestaurants}
