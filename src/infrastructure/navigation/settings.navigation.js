import * as React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {SettingsScreen} from '../../screens/settings.screen'
import {FavouritesScreen} from '../../screens/favourites.screen'

const SettingsStack = createStackNavigator()

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator headerMode="none">
      <SettingsStack.Screen name="settings" component={SettingsScreen} />
      <SettingsStack.Screen name="favourites" component={FavouritesScreen} />
    </SettingsStack.Navigator>
  )
}

export {SettingsNavigator}
