import * as React from 'react'

const CartContext = React.createContext()

function CartProvider(props) {
  const [{restaurant, cart, sum}, dispatch] = React.useReducer(
    (s, a) => ({...s, ...a}),
    {cart: [], restaurant: null, sum: 0},
  )
  const [token, setToken] = React.useState(null)

  function handleTokenChange(paymentToken) {
    setToken(paymentToken)
  }

  function add(item, rest) {
    if (restaurant && restaurant.placeId === rest.placeId) {
      dispatch({sum: sum + item.price, cart: [...cart, item]})
    } else {
      dispatch({sum: item.price, restaurant: rest, cart: [item]})
    }
  }

  function clear() {
    dispatch({cart: [], sum: 0, restaurant: null})
  }

  const values = {
    restaurant,
    cart,
    addToCart: add,
    clearCart: clear,
    total: sum,
    handleTokenChange,
    token,
  }

  return <CartContext.Provider value={values} {...props} />
}

function useCart() {
  const context = React.useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export {CartProvider, useCart}
