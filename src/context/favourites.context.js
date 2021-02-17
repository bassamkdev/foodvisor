import * as React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const FavouritesContext = React.createContext()

function FavouritesProvider(props) {
  const [favourites, setFavourites] = React.useState({})

  async function storeData(value) {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@favourites', jsonValue)
    } catch (e) {
      console.log('storing data', e)
    }
  }

  async function getData() {
    try {
      const jsonValue = await AsyncStorage.getItem('@favourites')
      if (jsonValue !== null) {
        setFavourites(JSON.parse(jsonValue))
      }
    } catch (e) {
      console.log('reading data', e)
    }
  }

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
    getData()
  }, [])

  React.useEffect(() => {
    storeData(favourites)
  }, [favourites])

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
