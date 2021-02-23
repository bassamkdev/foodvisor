import * as React from 'react'
import {LiteCreditCardInput} from 'react-native-credit-card-input'
import {cardTokenRequest} from '../services/stripe.service'

function CreditCardInput({name = 'bassam'}) {
  function handleInfoChange(form) {
    const {values, status} = form
    const isIncomplete = Object.values(status).includes('incomplete')
    const exp = values.expiry.split('/')
    const card = {
      name,
      number: values.number,
      exp_month: exp[0],
      exp_year: exp[1],
      cvc: values.cvc,
    }
    cardTokenRequest(card).then(info => console.log(info))
  }
  return <LiteCreditCardInput onChange={handleInfoChange} />
}

export {CreditCardInput}
