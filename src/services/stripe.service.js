import createClinet from 'stripe-client'

const stripe = createClinet('pk_test_ymzWMmPKCC9HKTETU2gBHNzr008Z3faESv')

function cardTokenRequest(card) {
  return stripe.createToken({card})
}

export {cardTokenRequest}
