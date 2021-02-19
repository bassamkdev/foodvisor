import * as React from 'react'
import styled from '@emotion/native'
import {useAuth} from '../context/auth.context'
import {View, Button, Text} from 'react-native'
import {List, Avatar} from 'react-native-paper'
import {SafeArea} from '../components/lib'

const AvatarContainer = styled.View({
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 30,
  marginBottom: 30,
})
const UserName = styled.Text(({theme}) => ({
  marginTop: 20,
  fontSize: theme.fontSizes.body,
  fontFamily: theme.fonts.heading,
}))

const SettingsItem = styled(List.Item)(({theme}) => ({
  padding: theme.spaces[3],
}))

function SettingsScreen({navigation}) {
  const {signOut, user} = useAuth()
  return (
    <SafeArea>
      <AvatarContainer>
        <Avatar.Icon size={150} icon="human" backgroundColor="#57cc99" />
        <UserName>{user.email}</UserName>
      </AvatarContainer>
      <List.Section>
        <SettingsItem
          title="Favourites"
          description="View your favourites"
          left={props => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => navigation.navigate('favourites')}
        />
        <SettingsItem
          title="Logout"
          left={props => <List.Icon {...props} color="black" icon="door" />}
          onPress={signOut}
        />
      </List.Section>
    </SafeArea>
  )
}

export {SettingsScreen}
