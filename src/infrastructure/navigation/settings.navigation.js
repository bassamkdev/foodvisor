import * as React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {SettingsScreen} from '../../screens/settings.screen'
import {FavouritesScreen} from '../../screens/favourites.screen'
import {CameraScreen} from '../../screens/camera.screen'
import {ImagePreviewScreen} from '../../screens/imagePreview.screen'

const SettingsStack = createStackNavigator()

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator headerMode="none">
      <SettingsStack.Screen name="settings" component={SettingsScreen} />
      <SettingsStack.Screen name="favourites" component={FavouritesScreen} />
      <SettingsStack.Screen name="camera" component={CameraScreen} />
      <SettingsStack.Screen
        name="imagePreview"
        component={ImagePreviewScreen}
      />
    </SettingsStack.Navigator>
  )
}

export {SettingsNavigator}
