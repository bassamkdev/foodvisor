import * as React from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
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

const queryCilent = new QueryClient()

function AppProvider({children}) {
  const [mavenFontsLoaded] = useMavenFonts({MavenPro_400Regular})
  const [latoFontsLoaded] = useLatoFonts({Lato_400Regular})
  if (!mavenFontsLoaded || !latoFontsLoaded) {
    return null
  }
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryCilent}>{children}</QueryClientProvider>
    </ThemeProvider>
  )
}

export {AppProvider}
