import * as React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import * as colors from '../style/colors'

function Tag({title}) {
  return (
    <View style={styles.tagContainer}>
      <Text>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tagContainer: {
    backgroundColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    minWidth: 30,
  },
  tagTitle: {
    color: colors.xDarkGray,
  },
})

export {Tag}
