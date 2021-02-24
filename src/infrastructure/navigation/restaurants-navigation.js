import * as React from 'react'
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack'
import {RestaurantsScreen} from '../../screens/restaurants'
import {RestaurantInfoScreen} from '../../screens/restaurantInfo'
const RestaurantsStack = createStackNavigator()

function RestaurantsStackScreen() {
  return (
    <RestaurantsStack.Navigator
      headerMode="none"
      screenOptions={{...TransitionPresets.ModalPresentationIOS}}
    >
      <RestaurantsStack.Screen
        name="restaurants"
        component={RestaurantsScreen}
      />
      <RestaurantsStack.Screen
        name="restaurantInfo"
        component={RestaurantInfoScreen}
      />
    </RestaurantsStack.Navigator>
  )
}

export {RestaurantsStackScreen}
