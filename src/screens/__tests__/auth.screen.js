import * as React from 'react'
import { authRender, fireEvent, waitFor} from "../../test/test-utils";
import { AuthScreen, RegisterForm, LoginForm } from "../auth.screen";
import {useAuth} from '../../context/auth.context'


jest.mock('../../context/auth.context')

test('authScreen renders logo and toggle between login and registeration forms', async () => {
    const mockLoginFunction = jest.fn(() => new Promise.resolve())
    useAuth.mockReturnValue({login: mockLoginFunction})
    const {getByA11yLabel, getByText, getByTestId} = authRender(<AuthScreen/>
    )

    expect(getByTestId(/logo/i)).not.toBeNull()
    expect(getByA11yLabel(/login form/i)).not.toBeNull()
    expect(getByText(/don't have an account/i)).not.toBeNull()

    fireEvent.press(getByA11yLabel(/switch to register/i))
    
    expect(getByA11yLabel(/registeration form/i)).not.toBeNull()
    expect(getByText(/already have an account/i)).not.toBeNull()

    fireEvent.press(getByA11yLabel(/switch to login/i))
    expect(getByA11yLabel(/login form/i)).not.toBeNull()

})

test('login form has email and and password fields, login button and toggle form button ', async () => {
    const mockLoginFunction = jest.fn()
    mockLoginFunction.mockResolvedValueOnce()
    useAuth.mockReturnValueOnce({login: mockLoginFunction})
    const {getByA11yLabel} = authRender(<LoginForm/>)

    expect(getByA11yLabel(/email input/i)).not.toBeNull()
    expect(getByA11yLabel(/password input/i)).not.toBeNull()

    const loginButton = getByA11yLabel(/login button/i)
    expect(loginButton).toHaveTextContent(/login/i)
    fireEvent.press(loginButton)
    await waitFor(() => expect(loginButton).not.toHaveProp(/loading/i))
    expect(mockLoginFunction).toHaveBeenCalledTimes(1)
})

test('login form renders error message when login fails ', async () => {
    const error = 'FAKE_ERROR'
    const mockLoginFunction = jest.fn()
    mockLoginFunction.mockRejectedValueOnce(error)
    useAuth.mockReturnValueOnce({login: mockLoginFunction})
    const {getByA11yLabel} = authRender(<LoginForm/>)

    const loginButton = getByA11yLabel(/login button/i)
    fireEvent.press(loginButton)
    await waitFor(() => expect(loginButton).not.toHaveProp(/loading/i))
    expect(getByA11yLabel(/login error/i)).toHaveTextContent(error)
})


test('register form has email password and repeat password fields that have to match', async () => {
    const mockRegisterFunction = jest.fn()
    mockRegisterFunction.mockResolvedValueOnce()
    useAuth.mockReturnValue({register: mockRegisterFunction})

    const userInfo = {
        email: 'fake@email.com',
        password: 'fake1234',
    }

    const {getByA11yLabel} = authRender(<RegisterForm/>)
    expect(getByA11yLabel(/email input/i)).not.toBeNull()
    expect(getByA11yLabel(/password input/i)).not.toBeNull()
    expect(getByA11yLabel(/retype password/i)).not.toBeNull()

    fireEvent.changeText(getByA11yLabel(/email input/i), userInfo.email)
    fireEvent.changeText(getByA11yLabel(/password input/i), userInfo.password)
    fireEvent.changeText(getByA11yLabel(/retype password/i), 'UNMATCHING_PSWD')
    const registerButton = getByA11yLabel(/register button/i)
    expect(registerButton).toBeDisabled()

    fireEvent.changeText(getByA11yLabel(/retype password/i), userInfo.password)

    expect(registerButton).toBeEnabled()

    fireEvent.press(registerButton)
    await waitFor(() => expect(registerButton).not.toHaveProp(/loading/i))
    expect(mockRegisterFunction).toHaveBeenCalledTimes(1)
    expect(mockRegisterFunction).toHaveBeenCalledWith(userInfo.email, userInfo.password)
})

test('register form renders error message when registeration fails ', async () => {
    const error = 'FAKE_ERROR'
    const mockRegisterFunction = jest.fn()
    mockRegisterFunction.mockRejectedValueOnce(error)
    useAuth.mockReturnValueOnce({register: mockRegisterFunction})
    const {getByA11yLabel} = authRender(<RegisterForm/>)

    const registerButton = getByA11yLabel(/register button/i)
    fireEvent.press(registerButton)
    await waitFor(() => expect(registerButton).not.toHaveProp(/loading/i))
    expect(getByA11yLabel(/registeration error/i)).toHaveTextContent(error)
})