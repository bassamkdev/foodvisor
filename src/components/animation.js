import * as React from 'react'
import {Animated} from 'react-native'

function FadeInView({duration = 1500, children, ...props}) {
  const {current: fadeAnim} = React.useRef(new Animated.Value(0))

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start()
  }, [duration, fadeAnim])

  return (
    <Animated.View style={{...props.style, opacity: fadeAnim}}>
      {children}
    </Animated.View>
  )
}

export {FadeInView}
