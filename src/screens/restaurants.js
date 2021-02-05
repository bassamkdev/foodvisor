import * as React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Searchbar} from 'react-native-paper'
import {RestaurantRow} from '../components/restaurant-row'

function RestaurantScreen() {
  const [searchQuery, setSearchQuery] = React.useState('')
  function handleChangeText(query) {
    setSearchQuery(query)
  }
  return (
    <>
      <View style={styles.search}>
        <Searchbar
          placeholder="Search"
          onChangeText={handleChangeText}
          value={searchQuery}
        />
      </View>
      <View style={styles.list}>
        <RestaurantRow />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  search: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  list: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 10,
  },
})

export {RestaurantScreen}
