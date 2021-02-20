import * as React from 'react'
import styled from '@emotion/native'
import {StatusBar, Button} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

const Tag = styled.View(
  {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ({theme}) => ({
    backgroundColor: theme.colors.ui.xLightGray,
    padding: theme.spaces[1],
    paddingTop: 2,
    paddingBottom: 2,
    minWidth: theme.sizes[3],
    height: theme.sizes[2],
    marginRight: theme.spaces[1],
  }),
)

const TagText = styled.Text(({theme, color}) => ({
  color: color === 'red' ? theme.colors.text.error : theme.colors.text.primary,
  fontFamily: theme.fonts.heading,
  marginRight: theme.spaces[1],
}))

const SafeArea = styled.SafeAreaView(
  {
    flex: 1,
    alignItems: 'stretch',
    marginTop: StatusBar.currentHeight,
  },
  ({theme}) => ({
    backgroundColor: 'white',
  }),
)

const FullPageView = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
})

const ErrorText = styled.Text({
  color: 'red',
})

function FullPageSpinner() {
  return (
    <FullPageView>
      <ActivityIndicator />
    </FullPageView>
  )
}

function FullPageError({error, action}) {
  return (
    <FullPageView>
      <ErrorText>{error}</ErrorText>
      <Button
        title="Retry"
        onPress={() => {
          action()
        }}
      />
    </FullPageView>
  )
}

export {Tag, TagText, SafeArea, FullPageSpinner, FullPageError}
