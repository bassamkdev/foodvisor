import * as React from 'react'
import {StyleSheet, Text, View, SafeAreaView, StatusBar} from 'react-native'
import {StatusBar as ExpoStatusBar} from 'expo-status-bar'
import {RestaurantScreen} from './src/screens/restaurants'

export default function App() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <RestaurantScreen />
      </SafeAreaView>
      <ExpoStatusBar style="auto" />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginTop: StatusBar.currentHeight,
  },
})
