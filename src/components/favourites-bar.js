import * as React from 'react'
import styled from '@emotion/native'
import {Text, ScrollView} from 'react-native'
import {useFavourites} from '../context/favourites.context'
import {Callout} from './map-callout'

const FavouritesWrapper = styled.View({})
const RestaurantWrapper = styled.TouchableOpacity({
  margin: 10,
})

function FavouritesBar({navigate}) {
  const {favourites} = useFavourites()
  return (
    <FavouritesWrapper>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Object.keys(favourites).length
          ? Object.keys(favourites).map((key, index) => {
              return (
                <RestaurantWrapper
                  key={index}
                  onPress={() =>
                    navigate('restaurantInfo', {restaurant: favourites[key]})
                  }
                >
                  <Callout restaurant={favourites[key]} key={index} />
                </RestaurantWrapper>
              )
            })
          : null}
      </ScrollView>
    </FavouritesWrapper>
  )
}

export {FavouritesBar}
