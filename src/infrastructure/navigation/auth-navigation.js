import * as React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {AuthScreen} from '../../screens/auth.screen'

const AuthStack = createStackNavigator()

function AuthenticationNavigator() {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="main" component={AuthScreen} />
    </AuthStack.Navigator>
  )
}

export {AuthenticationNavigator}
