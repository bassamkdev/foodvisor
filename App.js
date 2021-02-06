import * as React from 'react'
import {StatusBar} from 'react-native'
import {StatusBar as ExpoStatusBar} from 'expo-status-bar'
import {RestaurantsScreen} from './src/screens/restaurants'
import styled from '@emotion/native'
import {ThemeProvider} from '@emotion/react'
import {theme} from './src/style'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <RestaurantsScreen />
      </AppContainer>
      <ExpoStatusBar style="auto" />
    </ThemeProvider>
  )
}

const AppContainer = styled.SafeAreaView({
  flex: 1,
  alignItems: 'stretch',
  marginTop: StatusBar.currentHeight,
})
