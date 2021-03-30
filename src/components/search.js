import * as React from 'react'
import styled from '@emotion/native'
import {Searchbar} from 'react-native-paper'
import {useSearch} from '../context/search.context'

const SearchBarContainer = styled.View(
  {
    position: 'absolute',
    top: 40,
    zIndex: 99,
    width: '100%',
  },
  ({theme}) => ({
    padding: theme.spaces[3],
  }),
)

function SearchBar({icon, iconA11yLabel}) {
  const {handleSubmit} = useSearch()
  return (
    <SearchBarContainer>
      <Searchbar
        searchAccessibilityLabel={iconA11yLabel || 'search'}
        icon={icon || 'search'}
        placeholder="Search"
        onSubmitEditing={({nativeEvent: {text}}) => {
          handleSubmit(text)
        }}
      />
    </SearchBarContainer>
  )
}

export {SearchBar}
