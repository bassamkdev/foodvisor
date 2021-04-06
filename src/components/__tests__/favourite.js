import * as React from 'react';
import { appRender, fireEvent} from "../../test/test-utils";
import faker from 'faker'
import { Favourite } from "../favourite";
import { useFavourites } from "../../context/favourites.context";

jest.mock('../../context/favourites.context')


test('should call add function when is not set as favourtie ', async() => {
    const mockAddRestaurantToFavourites = jest.fn()
    const mockRemoveRestaurantFromFavourites = jest.fn()
    const mockRestaurant = {
        name: faker.lorem.word(),
        icon: faker.internet.url(),
        photos: [faker.internet.url()],
        vicinity: faker.address.streetAddress(),
        isOpenNow: true,
        rating: 5,
        isClosedTemporarily: true
      } 

    useFavourites.mockReturnValue({
        favourites: [],
        addRestaurantToFavourites: mockAddRestaurantToFavourites,
        removeRestaurantFromFavourites: mockRemoveRestaurantFromFavourites,
      })

     const {getByA11yLabel} = appRender(
        <Favourite restaurant={mockRestaurant}/>
    )
    fireEvent.press(getByA11yLabel(/favourite icon/i))
        expect(mockAddRestaurantToFavourites).toHaveBeenCalledTimes(1)
        expect(mockRemoveRestaurantFromFavourites).not.toHaveBeenCalled()
})

test('should call remove function when is not set as favourtie ', async() => {
    const mockAddRestaurantToFavourites = jest.fn()
    const mockRemoveRestaurantFromFavourites = jest.fn()
    const mockRestaurant = {
        name: faker.lorem.word(),
        icon: faker.internet.url(),
        photos: [faker.internet.url()],
        vicinity: faker.address.streetAddress(),
        isOpenNow: true,
        rating: 5,
        isClosedTemporarily: true
      } 

    useFavourites.mockReturnValue({
        favourites: {[mockRestaurant.name]: mockRestaurant},
        addRestaurantToFavourites: mockAddRestaurantToFavourites,
        removeRestaurantFromFavourites: mockRemoveRestaurantFromFavourites,
      })

     const {getByA11yLabel} = appRender(
        <Favourite restaurant={mockRestaurant}/>
    )
    fireEvent.press(getByA11yLabel(/favourite icon/i))
        expect(mockRemoveRestaurantFromFavourites).toHaveBeenCalledTimes(1)
        expect(mockAddRestaurantToFavourites).not.toHaveBeenCalled()
})