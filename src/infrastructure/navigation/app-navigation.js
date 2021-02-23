import * as React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {RestaurantsStackScreen} from './restaurants-navigation'
import {SettingsNavigator} from './settings.navigation'
import {MapScreen} from '../../screens/map.screen'
import {CheckoutScreen} from '../../screens/checkout.screen'
import Ionicons from '@expo/vector-icons/Ionicons'

import {SearchProvider} from '../../context/search.context'
import {FavouritesProvider} from '../../context/favourites.context'
import {CartProvider} from '../../context/cart.context'

const Tab = createBottomTabNavigator()

function setScreenOptions({route}) {
  return {
    tabBarIcon: ({focused, color, size}) => {
      let iconName
      if (route.name === 'Restaurants') {
        iconName = focused ? 'restaurant' : 'restaurant-outline'
      } else if (route.name === 'Map') {
        iconName = focused ? 'map' : 'map-outline'
      } else if (route.name === 'Settings') {
        iconName = focused ? 'ios-settings' : 'ios-settings-outline'
      } else if (route.name === 'checkout') {
        iconName = focused ? 'ios-cart' : 'ios-cart-outline'
      }
      return <Ionicons name={iconName} size={size} color={color} />
    },
  }
}

function AppNavigation() {
  return (
    <SearchProvider>
      <FavouritesProvider>
        <CartProvider>
          <Tab.Navigator
            initialRouteName="Restaurants"
            screenOptions={setScreenOptions}
            tabBarOptions={{
              activeTintColor: '#57cc99',
              inactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen name="Restaurants" component={RestaurantsStackScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="checkout" component={CheckoutScreen} />
            <Tab.Screen name="Settings" component={SettingsNavigator} />
          </Tab.Navigator>
        </CartProvider>
      </FavouritesProvider>
    </SearchProvider>
  )
}

export {AppNavigation}
