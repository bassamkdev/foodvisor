import * as React from 'react'
import {Image} from 'react-native'
import {Card, Paragraph} from 'react-native-paper'
import styled, {css} from '@emotion/native'
import {SvgXml} from 'react-native-svg'

import {Tag, TagText} from '../components/lib'
import star from '../../assets/star.js'
import openNow from '../../assets/open-now.js'
import {TouchableOpacity} from 'react-native-gesture-handler'

function RestaurantRow({restaurant = {}}) {
  const {
    name,
    icon,
    photos,
    vicinity: address,
    isOpenNow,
    rating,
    isClosedTemporarily,
  } = restaurant

  return (
    <CardContainer>
      <CardImage key={name} source={{uri: photos[0]}} />
      <CardTitle>{name}</CardTitle>
      <Card.Content>
        <ContentText>{address}</ContentText>
        <CardTagsContainer>
          <Tag>
            <TagText>{rating?.toPrecision(2)}</TagText>
            <SvgXml xml={star} width={16} height={16} />
          </Tag>
          {icon ? (
            <Tag>
              <Image
                source={{uri: icon}}
                style={css`
                  width: 16px;
                  height: 16px;
                `}
              />
            </Tag>
          ) : null}
          {isOpenNow ? (
            <Tag>
              <SvgXml xml={openNow} width={16} height={16} />
            </Tag>
          ) : null}
          {isClosedTemporarily ? (
            <Tag>
              <TagText color="red">TEMPORARILY CLOSED</TagText>
            </Tag>
          ) : null}
        </CardTagsContainer>
      </Card.Content>
    </CardContainer>
  )
}

const CardContainer = styled(Card)(
  {
    borderBottomWidth: 1,
    borderRadius: 0,
  },
  ({theme}) => ({
    borderBottomColor: theme.colors.ui.xLightGray,
    padding: theme.spaces[2],
    // marginBottom: theme.spaces[1],
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

const CardTitle = styled.Text(({theme}) => ({
  fontFamily: theme.fonts.heading,
  fontSize: theme.fontSizes.title,
  paddingLeft: theme.spaces[3],
  paddingTop: theme.spaces[3],
  paddingBottom: theme.spaces[1],
}))

const ContentText = styled(Paragraph)(({theme}) => ({
  fontFamily: theme.fonts.body,
  paddingBottom: 10,
}))

const CardTagsContainer = styled.View({
  flexDirection: 'row',
})

export {RestaurantRow}
