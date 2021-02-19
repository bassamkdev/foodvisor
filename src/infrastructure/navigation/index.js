import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'

import {AppNavigation} from './app-navigation'
import {AuthenticationNavigator} from './auth-navigation'

import {useAuth} from '../../context/auth.context'

export const Navigation = () => {
  const {isAuthenticated} = useAuth()
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigation /> : <AuthenticationNavigator />}
    </NavigationContainer>
  )
}
