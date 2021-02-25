import * as React from 'react'
import {storeData, getData} from '../utils/localStorage'
import {useAuth} from './auth.context'

const CartContext = React.createContext()

function CartProvider(props) {
  const {user} = useAuth()
  const [state, dispatch] = React.useReducer((s, a) => ({...s, ...a}), {
    cart: [],
    restaurant: null,
    sum: 0,
  })
  const [token, setToken] = React.useState(null)

  const handleTokenChange = React.useCallback(function (paymentToken) {
    setToken(paymentToken)
  }, [])

  const add = React.useCallback(
    function (item, rest) {
      if (state.restaurant && state.restaurant.placeId === rest.placeId) {
        dispatch({sum: state.sum + item.price, cart: [...state.cart, item]})
      } else {
        dispatch({sum: item.price, restaurant: rest, cart: [item]})
      }
    },
    [state.cart, state.restaurant, state.sum],
  )

  const clear = React.useCallback(function () {
    dispatch({cart: [], sum: 0, restaurant: null})
  }, [])

  React.useEffect(() => {
    getData('cart', user.uid, dispatch)
  }, [user.uid])

  React.useEffect(() => {
    storeData('cart', state, user.uid)
  }, [state, user.uid])

  const values = React.useMemo(
    () => ({
      restaurant: state.restaurant,
      cart: state.cart,
      addToCart: add,
      clearCart: clear,
      total: state.sum,
      handleTokenChange,
      token,
    }),
    [
      add,
      clear,
      handleTokenChange,
      state.cart,
      state.restaurant,
      state.sum,
      token,
    ],
  )

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
