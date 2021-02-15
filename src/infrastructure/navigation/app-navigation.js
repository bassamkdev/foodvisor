import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {RestaurantsScreen} from '../../screens/restaurants'
import {RestaurantsStackScreen} from './restaurants-navigation'
import Ionicons from '@expo/vector-icons/Ionicons'

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
      }
      return <Ionicons name={iconName} size={size} color={color} />
    },
  }
}

function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={setScreenOptions}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Restaurants" component={RestaurantsStackScreen} />
        <Tab.Screen name="Map" component={RestaurantsScreen} />
        <Tab.Screen name="Settings" component={RestaurantsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export {AppNavigation}
