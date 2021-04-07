import * as React from 'react'
import styled from '@emotion/native'
import {useAuth} from '../context/auth.context'
import {List, Avatar} from 'react-native-paper'
import {useFocusEffect} from '@react-navigation/native'
import {SafeArea} from '../components/lib'
import {getData} from '../utils/localStorage'
import {TouchableOpacity} from 'react-native-gesture-handler'

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
  const [imageUri, setImageUri] = React.useState(null)

  useFocusEffect(() => {
    getData('profileImage', user?.uid, setImageUri)
  })

  return (
    <SafeArea testID='settings screen'>
      <AvatarContainer >
        <TouchableOpacity accessibilityLabel='profile picture' onPress={() => {navigation.navigate('camera')}}>
          {imageUri ? (
            <Avatar.Image size={150} source={{uri: imageUri}} />
          ) : (
            <Avatar.Icon size={150} icon="human" backgroundColor="#57cc99" />
          )}
        </TouchableOpacity>
        <UserName>{user.email}</UserName>
      </AvatarContainer>
      <List.Section>
        <SettingsItem
          accessibilityLabel='favourites'
          title="Favourites"
          description="View your favourites"
          left={props => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => navigation.navigate('favourites')}
        />
        <SettingsItem
          accessibilityLabel='Log out'
          title="Logout"
          left={props => <List.Icon {...props} color="black" icon="door" />}
          onPress={signOut}
        />
      </List.Section>
    </SafeArea>
  )
}

export {SettingsScreen}
