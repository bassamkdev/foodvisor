import * as React from 'react'
import {StatusBar} from 'react-native'
import {StatusBar as ExpoStatusBar} from 'expo-status-bar'
import {RestaurantsScreen} from './src/screens/restaurants'
import styled from '@emotion/native'
import {ThemeProvider} from '@emotion/react'
import {
  useFonts as useMavenFonts,
  MavenPro_400Regular,
} from '@expo-google-fonts/maven-pro'
import {
  useFonts as useLatoFonts,
  Lato_400Regular,
} from '@expo-google-fonts/lato'

import {theme} from './src/style'

export default function App() {
  const [mavenFontsLoaded] = useMavenFonts({MavenPro_400Regular})
  const [latoFontsLoaded] = useLatoFonts({Lato_400Regular})
  if (!mavenFontsLoaded || !latoFontsLoaded) {
    return null
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <RestaurantsScreen />
        </AppContainer>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  )
}

const AppContainer = styled.SafeAreaView({
  flex: 1,
  alignItems: 'stretch',
  marginTop: StatusBar.currentHeight,
})
