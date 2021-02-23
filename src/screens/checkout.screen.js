import * as React from 'react'
import {CreditCardInput} from '../components/creditCardInput'
import {SafeArea} from '../components/lib'

function CheckoutScreen() {
  return (
    <SafeArea>
      <CreditCardInput />
    </SafeArea>
  )
}

export {CheckoutScreen}
