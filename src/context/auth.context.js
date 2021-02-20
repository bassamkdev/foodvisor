import * as firebase from 'firebase'
import * as React from 'react'

import {useAsync} from '../utils/hooks'
import {useQueryClient} from 'react-query'
import {FullPageError, FullPageSpinner} from '../components/lib'

const firebaseConfig = {
  apiKey: 'AIzaSyCCSUBCb2tDhtOvstJpJwH1yVRXgMns190',
  authDomain: 'foodvisor-5f5fc.firebaseapp.com',
  projectId: 'foodvisor-5f5fc',
  storageBucket: 'foodvisor-5f5fc.appspot.com',
  messagingSenderId: '783090397437',
  appId: '1:783090397437:web:40f65abff7aee0004a8e94',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const AuthContext = React.createContext()

function checkAuth() {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(usr => {
      if (usr) {
        resolve(usr)
      } else {
        resolve(null)
      }
    })
  })
}

function AuthProvider(props) {
  const queryClient = useQueryClient()
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
    reset,
  } = useAsync()

  React.useEffect(() => {
    run(checkAuth())
  }, [run])

  const login = React.useCallback(
    (email, password) =>
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(data => setData(data.user)),
    [setData],
  )
  const register = React.useCallback(
    (email, password) =>
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(data => setData(data.user)),
    [setData],
  )
  const signOut = React.useCallback(
    () =>
      firebase
        .auth()
        .signOut()
        .then(() => {
          setData(null)
          queryClient.getQueryCache().clear()
        }),
    [queryClient, setData],
  )

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageError error={error} action={reset} />
  }

  if (isSuccess) {
    return (
      <AuthContext.Provider
        value={{user, error, login, register, signOut, isAuthenticated: !!user}}
        {...props}
      />
    )
  }
  throw new Error(`unhandled status: ${status}`)
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export {AuthProvider, useAuth}
