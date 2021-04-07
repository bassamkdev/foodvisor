import * as React from 'react'
import { appRender, fireEvent, waitForElementToBeRemoved } from "../../test/test-utils";
import { RestaurantsScreen } from "../restaurants";
import { useSearch } from "../../context/search.context";
import { useFavourites } from "../../context/favourites.context";

jest.mock("../../context/favourites.context")
jest.mock("../../context/search.context")

test('should render restaurants, toggle favourites, and submit search', async () => {
    const mockHandleSubmit = jest.fn()
    const mockNavigation = jest.fn()
    const mockNavigate = jest.fn()
    useFavourites.mockReturnValue({favourites: []})
    useSearch.mockReturnValue({handleSubmit: mockHandleSubmit})
    mockNavigation.mockReturnValue({navigate: mockNavigate})

    const {getByA11yLabel, getByA11yRole} = appRender(<RestaurantsScreen navigation={mockNavigation}/>)

    const favourites = getByA11yLabel(/favourites/i)
    fireEvent.press(favourites)
    expect(getByA11yLabel(/favourite restaurants/i)).not.toBeNull()

    fireEvent(getByA11yRole('search'), 'submitEditing', {nativeEvent: {text: 'antwerp'}})
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1)
    expect(mockHandleSubmit).toHaveBeenCalledWith('antwerp')

    await waitForElementToBeRemoved(() => getByA11yRole('progressbar'))
    expect(getByA11yLabel(/restaurants list/i)).not.toBeNull()
})
