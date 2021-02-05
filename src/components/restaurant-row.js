import * as React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Card, Title, Paragraph} from 'react-native-paper'
import {Tag} from '../components/lib'

function RestaurantRow({restaurant = {}}) {
  const {
    name = 'My Restaurant',
    icon,
    photos = [
      'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
    ],
    address = '123 Park Ave.',
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = false,
  } = restaurant

  return (
    <Card style={styles.container}>
      <Card.Cover style={styles.cover} source={{uri: photos[0]}} />
      <Card.Title title={name} />
      <Card.Content>
        <Paragraph>{address}</Paragraph>
        <View style={styles.tagsLine}>
          <Tag title={rating} />
        </View>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.1,
    borderBottomColor: 'lightgray',
    borderRadius: 0,
    padding: 10,
    paddingBottom: 0,
  },
  cover: {
    backgroundColor: 'white',
    borderRadius: 0,
  },
  title: {},
  content: {},
  tagsLine: {
    flexDirection: 'row',
  },
})

export {RestaurantRow}
