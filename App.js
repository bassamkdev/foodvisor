import * as React from 'react'
import {StatusBar as ExpoStatusBar} from 'expo-status-bar'
import {AppProvider} from './app-providers'
import {AppNavigation} from './src/infrastructure/navigation/app-navigation'

export default function App() {
  return (
    <>
      <AppProvider>
        <AppNavigation />
      </AppProvider>

      <ExpoStatusBar style="auto" />
    </>
  )
}
