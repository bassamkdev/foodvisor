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
import {
  useFonts as useCarterFonts,
  CarterOne_400Regular,
} from '@expo-google-fonts/carter-one'

import {theme} from './src/style'
import {AuthProvider} from './src/context/auth.context'

const queryCache = new QueryCache()
const queryClient = new QueryClient({queryCache})

function AppProvider({children}) {
  const [mavenFontsLoaded] = useMavenFonts({MavenPro_400Regular})
  const [latoFontsLoaded] = useLatoFonts({Lato_400Regular})
  const [carterFontsLoaded] = useCarterFonts({CarterOne_400Regular})
  if (!mavenFontsLoaded || !latoFontsLoaded || !carterFontsLoaded) {
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
