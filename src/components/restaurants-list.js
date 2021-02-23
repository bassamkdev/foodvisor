import * as React from 'react'
import {FlatList, TouchableOpacity} from 'react-native'
import {ActivityIndicator, Text} from 'react-native-paper'
import {colors} from '../style/colors'

import {useRestaurants} from '../services/restaurants/restaurant.context'
import {useLocation} from '../services/geolocation/location.context'
import {useSearch} from '../context/search.context'
import {RestaurantRow} from './restaurant-row'
import {FadeInView} from './animation'

function RestaurantsList({navigate}) {
  const {keyword} = useSearch()
  const location = useLocation(keyword)
  const locationStrign = `${location.lat},${location.lng}`

  const {data: restaurants, isLoading, isError} = useRestaurants(
    locationStrign,
    {enabled: !!locationStrign},
  )
  const renderItem = React.useCallback(
    function renderItem({item}) {
      const handlePress = () => navigate('restaurantInfo', {restaurant: item})
      return (
        <FadeInView duration={500}>
          <TouchableOpacity onPress={handlePress}>
            <RestaurantRow restaurant={item} />
          </TouchableOpacity>
        </FadeInView>
      )
    },
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
      keyExtractor={item => item.placeId}
      renderItem={renderItem}
      initialNumToRender={10}
    />
  )
}

export {RestaurantsList}
