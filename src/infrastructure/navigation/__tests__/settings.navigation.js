import React from 'react';
import { appRender, fireEvent } from '../../../test/test-utils';
import faker from 'faker'
import { SettingsNavigator } from "../settings.navigation";
import { useFavourites } from "../../../context/favourites.context";
import { useAuth } from "../../../context/auth.context";

jest.mock('../../../context/favourites.context')
jest.mock("../../../context/auth.context")

describe('testing settings stack navigation', () => {
    const mockSignOut = jest.fn()
    useFavourites.mockReturnValue({
        favourites: {}
    })

    useAuth.mockReturnValue({
        user: {
            email: faker.internet.email(),
            uid: faker.datatype.uuid()
        },
        signOut: mockSignOut
    })
    test('screen contains setting options linking to camera', async() => {
        const {getByA11yLabel, getByText} = appRender(<SettingsNavigator/>)
        expect(getByA11yLabel(/profile picture/i)).not.toBeNull()
        fireEvent.press(getByA11yLabel(/profile picture/i))
        expect(getByText(/Waiting for permission to use camera/i)).not.toBeNull()
    })
    test('screen contains setting options linking to favourites', async() => {
        const {getByA11yLabel} = appRender(<SettingsNavigator/>)
        expect(getByA11yLabel(/profile picture/i)).not.toBeNull()
        fireEvent.press(getByA11yLabel(/favourites/i))
        expect(getByA11yLabel(/favourites-list/i)).not.toBeNull()
    })
    test('calls signOut on press sign out', () => {
        const {getByA11yLabel} = appRender(<SettingsNavigator/>)
        fireEvent(getByA11yLabel(/log out/i), 'press')
        expect(mockSignOut).toHaveBeenCalledTimes(1)
    })
    
    
})