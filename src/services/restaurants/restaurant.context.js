import {restaurantTransform} from './restaurant.service'
import {useQuery} from 'react-query'
import {host} from '../../utils/host'
// const restaurantsQueryConfig = {
//   staleTime: 1000 * 60 * 60,
//   cacheTime: 1000 * 60 * 60,
// }

function useRestaurants(query, options = {}) {
  const result = useQuery({
    queryKey: ['restaurants', {query}],
    queryFn: () =>
      fetch(`${host}restaurants?location=${query}`)
        .then(res => {
          return res.json()
        })
        .then(restaurantTransform),
    // staleTime: Platform.OS === 'ios' ? 1000 * 60 * 60 : 1000,
    ...options,
  })
  return result
}

export {useRestaurants}
