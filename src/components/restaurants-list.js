import * as React from 'react'
import {FlatList, TouchableOpacity} from 'react-native'
import {ActivityIndicator, Text} from 'react-native-paper'
import {colors} from '../style/colors'

import {useRestaurants} from '../mocks/restaurants/restaurant.context'
import {useLocation} from '../mocks/geolocation/location.context'
import {RestaurantRow} from './restaurant-row'

function RestaurantsList({keyword, navigation}) {
  const {
    data: location,
    isLoadind: isLocationLoading,
    isError: isLocationError,
  } = useLocation(keyword)
  const locationString = location
    ? `${location.lat},${location.lng}`
    : '37.7749295,-122.4194155'
  const {
    data: restaurants,
    isLoading: isRestaurantsLoading,
    isError: isRestaurantsError,
  } = useRestaurants(locationString)

  if (isRestaurantsLoading || isLocationLoading) {
    return <ActivityIndicator animating={true} color={colors.brand.primary} />
  } else if (isLocationError || isRestaurantsError) {
    return <Text>hmm, nothing found in this area</Text>
  }
  return (
    <FlatList
      data={restaurants}
      keyExtractor={item => item.name}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('restaurantInfo', {restaurant: item})
          }
        >
          <RestaurantRow restaurant={item} />
        </TouchableOpacity>
      )}
    />
  )
}

export {RestaurantsList}
