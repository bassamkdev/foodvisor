import * as React from 'react'
import { appRender, fireEvent, waitForElementToBeRemoved } from "../../test/test-utils";
import { MapScreen } from "../map.screen";
import { useFavourites } from "../../context/favourites.context";

jest.mock("../../context/favourites.context")

test('should render restaurants, toggle favourites, and submit search', async () => {
    const mockNavigate = jest.fn()
    useFavourites.mockReturnValue({favourites: []})

    const {getByA11yLabel, getAllByTestId} = appRender(<MapScreen navigation={{navigate: mockNavigate}}/>)
    await waitForElementToBeRemoved(() => getByA11yLabel(/loading/i)) 
    expect(getAllByTestId(/marker/i)).not.toBeNull()
    expect(getAllByTestId(/callout/i)).not.toBeNull()
    fireEvent(getAllByTestId(/callout/i)[1], 'press')
    expect(mockNavigate).toHaveBeenCalledTimes(1)
})
