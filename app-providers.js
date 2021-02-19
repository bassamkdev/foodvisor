import * as React from 'react'
import {QueryClient, QueryClientProvider, QueryCache} from 'react-query'
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
import {AuthProvider} from './src/context/auth.context'

const queryCache = new QueryCache()
const queryClient = new QueryClient({queryCache})

function AppProvider({children}) {
  const [mavenFontsLoaded] = useMavenFonts({MavenPro_400Regular})
  const [latoFontsLoaded] = useLatoFonts({Lato_400Regular})
  if (!mavenFontsLoaded || !latoFontsLoaded) {
    return null
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export {AppProvider}
