import * as React from 'react'
import { appRender } from "../../test/test-utils";
import { CameraScreen } from "../camera.screen";


test('camera screen', async () => {
    const mockNavigate = jest.fn()

    const {getByText} = appRender(<CameraScreen navigation={{navigate: mockNavigate}}/>)
    expect(getByText(/Waiting for permission to use camera/i)).not.toBeNull()
})
