import * as React from 'react'

import {RestaurantsList} from '../components/restaurants-list'
import {SafeArea} from '../components/lib'
import {useSearch} from '../context/search.context'
import {Searchbar} from 'react-native-paper'
import styled from '@emotion/native'
import {FavouritesBar} from '../components/favourites-bar'

const SearchBarContainer = styled.View(
  {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ({theme}) => ({
    padding: theme.spaces[3],
  }),
)

function RestaurantsScreen({navigation}) {
  const {handleSubmit} = useSearch()
  const [isFavouritesOpen, setIsFavouritesOpen] = React.useState(false)
  return (
    <SafeArea>
      <SearchBarContainer>
        <Searchbar
          icon={isFavouritesOpen ? 'heart' : 'heart-outline'}
          placeholder="Search"
          onSubmitEditing={({nativeEvent: {text}}) => {
            handleSubmit(text)
          }}
          onIconPress={() => setIsFavouritesOpen(!isFavouritesOpen)}
        />
      </SearchBarContainer>
      {isFavouritesOpen ? (
        <FavouritesBar navigate={navigation.navigate} />
      ) : null}

      <RestaurantsList navigate={navigation.navigate} />
    </SafeArea>
  )
}

export {RestaurantsScreen}
