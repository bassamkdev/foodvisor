import * as React from 'react'
import styled from '@emotion/native'
import {useFavourites} from '../context/favourites.context'
import {SafeArea} from '../components/lib'
import {TouchableOpacity} from 'react-native'
import {RestaurantRow} from '../components/restaurant-row'

const FavouritesWrapper = styled.ScrollView({
  marginTop: 20,
})

function FavouritesScreen({navigation}) {
  const {favourites} = useFavourites()
  return (
    <SafeArea>
      <FavouritesWrapper>
        {Object.keys(favourites).length
          ? Object.keys(favourites).map((key, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate('restaurantInfo', {
                      restaurant: favourites[key],
                    })
                  }
                >
                  <RestaurantRow restaurant={favourites[key]} key={index} />
                </TouchableOpacity>
              )
            })
          : null}
      </FavouritesWrapper>
    </SafeArea>
  )
}

export {FavouritesScreen}
