import * as React from 'react'
import {Searchbar} from 'react-native-paper'
import styled from '@emotion/native'

import {RestaurantsList} from '../components/restaurants-list'
import {SafeArea} from '../components/lib'

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
  const [searchQuery, setSearchQuery] = React.useState('')
  const [keyword, setKeyword] = React.useState()

  function handleInputChange(query) {
    setSearchQuery(query)
  }
  function handleSubmit() {
    setKeyword(searchQuery.toLowerCase())
  }

  return (
    <SafeArea>
      <SearchBarContainer>
        <Searchbar
          value={searchQuery}
          onChangeText={handleInputChange}
          placeholder="Search"
          onSubmitEditing={handleSubmit}
        />
      </SearchBarContainer>
      <RestaurantsList keyword={keyword} navigation={navigation} />
    </SafeArea>
  )
}

export {RestaurantsScreen}
