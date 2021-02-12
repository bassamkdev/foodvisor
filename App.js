import * as React from 'react'
import {StatusBar as ExpoStatusBar} from 'expo-status-bar'
import {RestaurantsScreen} from './src/screens/restaurants'
import styled from '@emotion/native'
import {ThemeProvider} from '@emotion/react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import {
  useFonts as useMavenFonts,
  MavenPro_400Regular,
} from '@expo-google-fonts/maven-pro'
import {
  useFonts as useLatoFonts,
  Lato_400Regular,
} from '@expo-google-fonts/lato'

import {theme} from './src/style'

const Tab = createBottomTabNavigator()

export default function App() {
  const [mavenFontsLoaded] = useMavenFonts({MavenPro_400Regular})
  const [latoFontsLoaded] = useLatoFonts({Lato_400Regular})
  if (!mavenFontsLoaded || !latoFontsLoaded) {
    return null
  }

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
  return (
    <>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={setScreenOptions}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
            <Tab.Screen name="Map" component={RestaurantsScreen} />
            <Tab.Screen name="Settings" component={RestaurantsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  )
}
