import * as React from 'react'
import {useAuth} from './auth.context'
import {getData, storeData} from '../utils/localStorage'

const FavouritesContext = React.createContext()

function FavouritesProvider(props) {
  const {user} = useAuth()
  const [favourites, setFavourites] = React.useState({})

  const add = React.useCallback(
    function (restaurant) {
      if (!favourites[restaurant.name]) {
        setFavourites({...favourites, [restaurant.name]: restaurant})
      }
    },
    [favourites],
  )
  const remove = React.useCallback(
    function (restaurant) {
      let newFavourites = {...favourites}
      delete newFavourites[restaurant.name]
      setFavourites(newFavourites)
    },
    [favourites],
  )

  React.useEffect(() => {
    getData('favourites', user?.uid, setFavourites)
  }, [user?.uid])

  React.useEffect(() => {
    storeData('favourites', favourites, user?.uid)
  }, [favourites, user?.uid])

  const value = {
    favourites,
    addRestaurantToFavourites: add,
    removeRestaurantFromFavourites: remove,
  }

  return <FavouritesContext.Provider value={value} {...props} />
}

function useFavourites() {
  const context = React.useContext(FavouritesContext)
  if (!context) {
    throw new Error('useFavourites must be used within FavouritesProvider')
  }
  return context
}

export {FavouritesProvider, useFavourites}
