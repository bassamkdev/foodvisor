import * as React from 'react'
import MapView from 'react-native-maps'
import styled from '@emotion/native'

import {Callout} from '../components/map-callout'
import {SearchBar} from '../components/search'
import {useSearch} from '../context/search.context'
import {useLocation} from '../services/geolocation/location.context'
import {useRestaurants} from '../services/restaurants/restaurant.context'
import {Favourite} from '../components/favourite'
import { ActivityIndicator } from 'react-native';

const LoadingIndicator = styled(ActivityIndicator)({
  zIndex: 10, position: 'absolute', top: '50%', right: '50%'
})

function MapScreen({navigation}) {
  const {keyword} = useSearch()
  const location = useLocation(keyword)

  const locationStrign = `${location.lat},${location.lng}`

  const {data: restaurants, isLoading} = useRestaurants(locationStrign)
  const northeastLat = location ? location.viewport.northeast.lat : null
  const southwestLat = location ? location.viewport.southwest.lat : null
  const latDelta = location ? northeastLat - southwestLat : 0
  return (
    <>
      <SearchBar icon="map-outline" />
      {isLoading ? <LoadingIndicator accessibilityLabel='loading'/> : null }
      <MapView
      testID='map screen'
        style={{height: '100%'}}
        region={{
          latitude: location.lat || 0,
          longitude: location.lng || 0,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {
          restaurants
          ? restaurants.map(restaurant => {
              return (
                <MapView.Marker
                  testID='marker'
                  key={restaurant.name}
                  title={restaurant.name}
                  coordinate={{
                    latitude: restaurant.geometry.location.lat,
                    longitude: restaurant.geometry.location.lng,
                  }}
                >
                  <MapView.Callout
                    testID='callout'
                    onPress={() =>
                      navigation.navigate('restaurantInfo', {restaurant})
                    }
                  >
                    <Favourite restaurant={restaurant} />
                    <Callout restaurant={restaurant} />
                  </MapView.Callout>
                </MapView.Marker>
              )
            })
          : null}
      </MapView>
    </>
  )
}

export {MapScreen}
