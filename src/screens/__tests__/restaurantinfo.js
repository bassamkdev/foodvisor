import * as React from 'react'
import faker from 'faker'
import { appRender, fireEvent, waitForElementToBeRemoved } from "../../test/test-utils";
import { RestaurantInfoScreen } from "../restaurantInfo";
import { useFavourites } from "../../context/favourites.context";
import { useCart } from "../../context/cart.context";

jest.mock("../../context/cart.context")
jest.mock("../../context/favourites.context")

test('should render restaurants, toggle favourites, and submit search', async () => {
    useFavourites.mockReturnValue({favourites: []})
    const mockAddToCart = jest.fn()
    useCart.mockReturnValue({
        addToCart: mockAddToCart
    })
    const mockRestaurant = {
        name: faker.lorem.word(),
        icon: faker.internet.url(),
        photos: [faker.internet.url()],
        vicinity: faker.address.streetAddress(),
        isOpenNow: true,
        rating: 5,
        isClosedTemporarily: false
      } 
    const {getByA11yLabel, getByText, queryByText} = appRender(
            <RestaurantInfoScreen route={{params: {restaurant: mockRestaurant }}}/>
    )
    expect(getByA11yLabel(/menu/i)).not.toBeNull()
    expect(getByText(/breakfast/i)).not.toBeNull()
    expect(getByText(/launch/i)).not.toBeNull()
    expect(getByText(/dinner/i)).not.toBeNull()
    expect(getByText(/drink/i)).not.toBeNull()

    fireEvent(getByText(/launch/i), 'press')
    expect(getByText(/launch/i)).toHaveStyle({color: '#6200ee'})
    expect(getByText(/rice/i)).not.toBeNull()

    fireEvent(getByText(/launch/i), 'press')
    expect(getByText(/launch/i)).not.toHaveStyle({color: '#6200ee'})
    expect(queryByText(/rice/i)).toBeNull()

    fireEvent(getByText(/order special/i), 'press')
    expect(mockAddToCart).toHaveBeenCalledTimes(1)
})
