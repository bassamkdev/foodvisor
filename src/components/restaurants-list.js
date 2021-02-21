import * as React from 'react'
import {FlatList, TouchableOpacity} from 'react-native'
import {ActivityIndicator, Text} from 'react-native-paper'
import {colors} from '../style/colors'

import {useRestaurants} from '../mocks/restaurants/restaurant.context'
import {useLocation} from '../mocks/geolocation/location.context'
import {useSearch} from '../context/search.context'
import {RestaurantRow} from './restaurant-row'

function RestaurantsList({navigate}) {
  const {keyword} = useSearch()
  const location = useLocation(keyword)
  const locationStrign = `${location.lat},${location.lng}`

  const {data: restaurants, isLoading, isError} = useRestaurants(
    locationStrign,
    {enabled: !!locationStrign},
  )

  const handlePress = React.useCallback(
    item => navigate('restaurantInfo', {restaurant: item}),
    [navigate],
  )

  if (isLoading) {
    return <ActivityIndicator animating={true} color={colors.brand.primary} />
  } else if (isError) {
    return <Text>hmm, nothing found in this area</Text>
  }
  return (
    <FlatList
      data={restaurants}
      keyExtractor={item => item.name}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => handlePress(item)}>
          <RestaurantRow restaurant={item} />
        </TouchableOpacity>
      )}
    />
  )
}

export {RestaurantsList}
