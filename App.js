import * as React from 'react'
import {StatusBar as ExpoStatusBar} from 'expo-status-bar'
import {AppProvider} from './app-providers'
import {Navigation} from './src/infrastructure/navigation'

export default function App() {
  return (
    <>
      <AppProvider>
        <Navigation />
      </AppProvider>

      <ExpoStatusBar style="auto" />
    </>
  )
}
