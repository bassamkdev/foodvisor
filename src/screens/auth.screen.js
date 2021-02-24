import * as React from 'react'
import styled from '@emotion/native'
import {TextInput, Button} from 'react-native-paper'
import {Text} from 'react-native'
import {useAsync} from '../utils/hooks'
import {useAuth} from '../context/auth.context'
import LottieView from 'lottie-react-native'
import {FullPageView, Logo} from '../components/lib'

const Background = styled.ImageBackground({
  flex: 1,
})

const Cover = styled.View({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
})

const Title = styled.Text({}, ({theme}) => ({
  fontFamily: theme.fonts.heading,
  fontWeight: theme.fontWeights.bold,
  fontSize: theme.fontSizes.h4,
  color: theme.colors.text.inverse,
  marginBottom: theme.spaces[4],
}))

const Form = styled.View({
  justifyContent: 'center',
  alignItems: 'center',
})

const FormText = styled.Text(({theme}) => ({
  fontFamily: theme.fonts.body,
  color: theme.colors.ui.tertiary,
}))

Button.defaultProps = {
  contentStyle: {
    width: 270,
    height: 50,
  },
  mode: 'contained',
  theme: {colors: {primary: '#57cc99'}},
  style: {
    width: 270,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
}

TextInput.defaultProps = {
  style: {
    width: 300,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 10,
    borderColor: 'transparent',
  },
  theme: {
    colors: {
      text: '#e9ecef',
      placeholder: '#adb5bd',
      primary: '#80ed99',
    },
  },
  underlineColor: 'rgba(255,255,255,.1)',
}

const ScreenWraper = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-evenly',
})

function LoginForm({handleToggle}) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const {run, reset, isLoading, isError, error} = useAsync()
  const {login} = useAuth()

  function handleSubmit() {
    if (error) {
      reset()
    }
    run(login(email, password))
  }
  return (
    <Form>
      <Title>Login</Title>

      <TextInput
        label="E-mail"
        value={email}
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <TextInput
        label="Password"
        value={password}
        textContentType="password"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={setPassword}
      />
      {isError ? <Text style={{color: 'red'}}>{error.toString()}</Text> : null}
      <Button onPress={handleSubmit} loading={isLoading}>
        login
      </Button>
      <FormText>Don't have an account?</FormText>
      <Button
        mode="text"
        style={{}}
        color="#e9ecef"
        onPress={() => handleToggle(state => !state)}
      >
        Register
      </Button>
    </Form>
  )
}
function RegisterForm({handleToggle}) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [repeatedPassword, setRepeatedPassword] = React.useState('')
  const [isPasswordMatch, setIsPasswordMatch] = React.useState(true)
  const {run, reset, isLoading, isError, error} = useAsync()
  const {register} = useAuth()

  React.useEffect(() => {
    if (repeatedPassword !== password) {
      setIsPasswordMatch(false)
    } else {
      setIsPasswordMatch(true)
    }
  }, [password, repeatedPassword])

  function handleRegister() {
    if (error) {
      reset()
    }
    run(register(email, password))
  }

  return (
    <Form>
      <Title>Register</Title>

      <TextInput
        label="E-mail"
        value={email}
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <TextInput
        label="Password"
        value={password}
        textContentType="password"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={setPassword}
      />
      <TextInput
        theme={{
          colors: {
            primary: isPasswordMatch ? '#80ed99' : 'red',
            text: '#e9ecef',
            placeholder: '#adb5bd',
          },
        }}
        label="Repeat Password"
        value={repeatedPassword}
        textContentType="password"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={setRepeatedPassword}
      />
      {isError ? <Text style={{color: 'red'}}>{error.toString()}</Text> : null}
      <Button
        loading={isLoading}
        onPress={handleRegister}
        disabled={!isPasswordMatch}
      >
        Register
      </Button>
      <FormText>Already have an account?</FormText>
      <Button
        mode="text"
        style={{}}
        color="#e9ecef"
        onPress={() => handleToggle(state => !state)}
      >
        Login
      </Button>
    </Form>
  )
}

function AuthScreen({navigation}) {
  const [isSigningUp, setIsSigningUp] = React.useState(false)

  return (
    <Background source={require('../../assets/background.jpg')} blurRadius={10}>
      <Cover />
      <ScreenWraper>
        <Logo>foodvisor</Logo>
        {isSigningUp ? (
          <RegisterForm handleToggle={setIsSigningUp} />
        ) : (
          <LoginForm handleToggle={setIsSigningUp} />
        )}
      </ScreenWraper>
    </Background>
  )
}

export {AuthScreen}
