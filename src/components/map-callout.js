import * as React from 'react'
import styled from '@emotion/native'
import {WebView} from 'react-native-webview'
import {Platform} from 'react-native'
import {Favourite} from './favourite'

const CalloutImage = styled.Image(
  {
    height: 120,
    width: 120,
    borderRadius: 10,
  },
  ({theme}) => ({
    marginBottom: theme.sizes[0],
  }),
)

const CalloutWebView = styled(WebView)({
  height: 120,
  width: 120,
})

const CalloutText = styled.Text(({theme}) => ({
  fontFamily: theme.fonts.heading,
}))

const CalloutContainer = styled.View({
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 120,
})
function Callout({restaurant}) {
  return (
    <CalloutContainer>
      {Platform.OS === 'android' ? (
        <CalloutWebView source={{uri: restaurant.photos[0]}} />
      ) : (
        <CalloutImage source={{uri: restaurant.photos[0]}} />
      )}
      <CalloutText>{restaurant.name}</CalloutText>
    </CalloutContainer>
  )
}

export {Callout}
