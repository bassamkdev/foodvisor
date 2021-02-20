import * as React from 'react'
import styled from '@emotion/native'
import {ActivityIndicator, Button, Text, TouchableOpacity} from 'react-native'
import {Camera} from 'expo-camera'
import {Feather} from '@expo/vector-icons'
import {MaterialIcons} from '@expo/vector-icons'

const CameraActions = styled.View({
  flex: 0.2,
  width: '65%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'absolute',
  bottom: 0,
  right: 0,
  padding: 20,
})

const Caption = styled.Text({
  marginBottom: 20,
  marginTop: 20,
  color: 'red',
})

const CameraView = styled(Camera)({
  width: '100%',
  flex: 1,
})

const CameraScreenContainer = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
})

const CameraSafeArea = styled.SafeAreaView({
  flex: 1,
  backgroundColor: 'black',
})

function CameraScreen({navigation}) {
  const [hasPermission, setHasPermission] = React.useState(null)
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
  const [isCameraReady, setIsCameraReady] = React.useState(false)
  const cameraRef = React.useRef()

  const askForPermission = React.useCallback(async function () {
    const {status} = await Camera.requestPermissionsAsync()
    setHasPermission(status === 'granted')
  }, [])

  function handleReload() {
    setHasPermission(null)
  }

  function handleCameraFlip() {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    )
  }

  async function snap() {
    if (!isCameraReady) {
      return
    }
    let image = await cameraRef.current.takePictureAsync()
    if (image.uri) {
      navigation.navigate('imagePreview', {image: image})
    }
  }

  React.useEffect(() => {
    askForPermission()
  }, [askForPermission])

  if (hasPermission === null) {
    return (
      <CameraScreenContainer>
        <Text>Waiting for permission to use camera</Text>
        <ActivityIndicator />
      </CameraScreenContainer>
    )
  }
  if (hasPermission === false) {
    return (
      <CameraScreenContainer>
        <Feather name="camera-off" size={50} color="black" />
        <Caption>Camera access permission is not granted</Caption>
        <Button title="Grant permission" onPress={handleReload} />
      </CameraScreenContainer>
    )
  }

  return (
    <CameraSafeArea>
      <CameraView
        ref={cameraRef}
        type={cameraType}
        onCameraReady={() => setIsCameraReady(true)}
      >
        <CameraActions>
          <TouchableOpacity onPress={snap}>
            <MaterialIcons name="camera" size={80} color="gold" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCameraFlip}>
            <MaterialIcons name="flip-camera-ios" size={36} color="white" />
          </TouchableOpacity>
        </CameraActions>
      </CameraView>
    </CameraSafeArea>
  )
}

export {CameraScreen}
