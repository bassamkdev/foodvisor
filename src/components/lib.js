import styled from '@emotion/native'
import {StatusBar} from 'react-native'

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
export {Tag, TagText, SafeArea}
