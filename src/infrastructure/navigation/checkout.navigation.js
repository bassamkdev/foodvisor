import * as React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {CheckoutScreen} from '../../screens/checkout.screen'
import {SuccessScreen} from '../../screens/Payment-success.screen'

const CheckoutStack = createStackNavigator()

function CheckoutNavigator() {
  return (
    <CheckoutStack.Navigator headerMode="none">
      <CheckoutStack.Screen name="checkout" component={CheckoutScreen} />
      <CheckoutStack.Screen name="success" component={SuccessScreen} />
    </CheckoutStack.Navigator>
  )
}

export {CheckoutNavigator}
