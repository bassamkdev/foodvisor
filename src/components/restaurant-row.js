import * as React from 'react'
import {Text} from 'react-native'
import {Card, Paragraph} from 'react-native-paper'
import styled from '@emotion/native'

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
    <CardContainer>
      <CardImage source={{uri: photos[0]}} />
      <Card.Title title={name} />
      <Card.Content>
        <Paragraph>{address}</Paragraph>
        <CardTagsContainer>
          <Tag>
            <Text>{rating}</Text>
          </Tag>
        </CardTagsContainer>
      </Card.Content>
    </CardContainer>
  )
}

const CardContainer = styled(Card)(
  {
    borderBottomWidth: 0.1,
    borderRadius: 0,
  },
  ({theme}) => ({
    borderBottomColor: theme.colors.ui.quaternary,
    padding: theme.spaces[2],
    paddingBottom: theme.spaces[0],
    backgroundColor: theme.colors.bg.secondary,
  }),
)

const CardImage = styled(Card.Cover)(
  {
    borderRadius: 0,
  },
  ({theme}) => ({
    backgroundColor: theme.colors.bg.secondary,
  }),
)

const CardTagsContainer = styled.View({
  flexDirection: 'row',
})

export {RestaurantRow}
