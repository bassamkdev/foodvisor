import * as React from 'react'
import MapView from 'react-native-maps'
import {Callout} from '../components/map-callout'
import {SearchBar} from '../components/search'
import {useSearch} from '../context/search.context'
import {useLocation} from '../mocks/geolocation/location.context'
import {useRestaurants} from '../mocks/restaurants/restaurant.context'
import {Favourite} from '../components/favourite'
function MapScreen({navigation}) {
  const {keyword} = useSearch()
  const {data: location} = useLocation(keyword)
  const lat = location?.lat
  const lng = location?.lng
  const {data: restaurants} = useRestaurants({lat, lng}, {enabled: !!lat})

  const northeastLat = location ? location.viewport.northeast.lat : null
  const southwestLat = location ? location.viewport.southwest.lat : null
  const latDelta = location ? northeastLat - southwestLat : 0

  return (
    <>
      <SearchBar icon="map-outline" />
      <MapView
        style={{height: '100%'}}
        region={{
          latitude: lat || 0,
          longitude: lng || 0,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {restaurants
          ? restaurants.map(restaurant => {
              return (
                <MapView.Marker
                  key={restaurant.name}
                  title={restaurant.name}
                  coordinate={{
                    latitude: restaurant.geometry.location.lat,
                    longitude: restaurant.geometry.location.lng,
                  }}
                >
                  <MapView.Callout
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
