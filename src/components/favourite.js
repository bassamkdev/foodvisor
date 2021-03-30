import * as React from 'react'
import {AntDesign} from '@expo/vector-icons'
import styled from '@emotion/native'
import {useFavourites} from '../context/favourites.context'

const FavouriteButton = styled.TouchableOpacity({
  position: 'absolute',
  top: 20,
  right: 20,
  zIndex: 9,
})

function Favourite({restaurant}) {
  const {
    favourites,
    addRestaurantToFavourites,
    removeRestaurantFromFavourites,
  } = useFavourites()

  const isFavourite = !!favourites[restaurant.name]
  return (
    <FavouriteButton
    accessibilityLabel='favourite icon'
      onPress={() =>
        isFavourite
          ? removeRestaurantFromFavourites(restaurant)
          : addRestaurantToFavourites(restaurant)
      }
    >
      <AntDesign
        name={isFavourite ? 'heart' : 'hearto'}
        size={24}
        color={isFavourite ? 'red' : 'white'}
      />
    </FavouriteButton>
  )
}

export {Favourite}
