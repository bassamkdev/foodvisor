import * as React from 'react'
import styled from '@emotion/native'
import {SafeArea} from '../components/lib'
import {Button} from 'react-native'
import {useAuth} from '../context/auth.context'
import {storeData} from '../utils/localStorage'

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

const ImagePreview = styled.Image({
  flex: 1,
  resizeMode: 'cover',
})

function ImagePreviewScreen({route, navigation}) {
  const {image} = route.params
  const {user} = useAuth()

  function handleImageUse() {
    navigation.navigate('settings')
    storeData('profileImage', image.uri, user.uid)
  }

  return (
    <SafeArea>
      <ImagePreview source={{uri: image.uri}} />
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
