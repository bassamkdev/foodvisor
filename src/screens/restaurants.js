import * as React from 'react'
import {css} from '@emotion/native'
import {StyleSheet, Text, View} from 'react-native'
import {Searchbar} from 'react-native-paper'
import {RestaurantRow} from '../components/restaurant-row'
import styled from '@emotion/native'

const SearchBarContainer = styled.View(
  {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ({theme}) => ({
    padding: theme.spaces[3],
  }),
)

const RestaurantsList = styled.View(
  {
    flex: 1,
  },
  ({theme}) => ({
    paddingTop: theme.spaces[3],
    paddingBottom: theme.spaces[2],
  }),
)

function RestaurantsScreen() {
  const [searchQuery, setSearchQuery] = React.useState('')
  function handleChangeText(query) {
    setSearchQuery(query)
  }
  return (
    <>
      <SearchBarContainer>
        <Searchbar
          placeholder="Search"
          onChangeText={handleChangeText}
          value={searchQuery}
        />
      </SearchBarContainer>
      <RestaurantsList>
        <RestaurantRow />
      </RestaurantsList>
    </>
  )
}

export {RestaurantsScreen}
