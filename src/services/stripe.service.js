import createClinet from 'stripe-client'
import {host} from '../utils/host'

const stripe = createClinet('pk_test_ymzWMmPKCC9HKTETU2gBHNzr008Z3faESv')

function cardTokenRequest(card) {
  return stripe.createToken({card})
}

function pay(token, amount) {
  return fetch(`${host}pay`, {
    method: 'POST',
    body: JSON.stringify({token, amount}),
  }).then(res => {
    if (res.status > 200) {
      return Promise.reject('something went wrong with your payment')
    }
    return res.json()
  })
}

export {cardTokenRequest, pay}
