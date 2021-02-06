import styled from '@emotion/native'

const Tag = styled.View(
  {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ({theme}) => ({
    backgroundColor: theme.colors.ui.quaternary,
    color: theme.colors.text.primary,
    padding: theme.spaces[1],
    minWidth: theme.sizes[2],
  }),
)

export {Tag}
