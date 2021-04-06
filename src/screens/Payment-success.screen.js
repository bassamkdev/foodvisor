import * as React from 'react'
import {Avatar} from 'react-native-paper'
import {FullPageView, SafeArea} from '../components/lib'

function SuccessScreen() {
  return (
    <SafeArea>
      <FullPageView accessibilityLabel='success'>
        <Avatar.Icon
          icon="check-bold"
          size={80}
          theme={{colors: {primary: '#00c851'}}}
        />
      </FullPageView>
    </SafeArea>
  )
}

export {SuccessScreen}
