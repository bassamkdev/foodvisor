import * as React from 'react'
import styled from '@emotion/native'
import {SafeArea} from '../components/lib'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Button, Image, Text} from 'react-native'
import {useAuth} from '../context/auth.context'

const ImageActions = styled.View({
  flex: 0.2,
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  position: 'absolute',
  bottom: 0,
  right: 0,
  padding: 20,
  zIndex: 10,
})

function ImagePreviewScreen({route, navigation}) {
  const {image} = route.params
  const {user} = useAuth()
  async function storeData(value, userId) {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(`@profileImage-${userId}`, jsonValue)
    } catch (e) {
      console.log('storing data', e)
    }
  }

  function handleImageUse() {
    navigation.navigate('settings')
    storeData(image.uri, user.uid)
  }

  return (
    <SafeArea>
      <Image style={{flex: 1, resizeMode: 'cover'}} source={{uri: image.uri}} />
      <ImageActions>
        <Button title="Use" onPress={handleImageUse} />
        <Button
          title="Retake"
          onPress={() => navigation.navigation('camera')}
        />
      </ImageActions>
    </SafeArea>
  )
}

export {ImagePreviewScreen}
