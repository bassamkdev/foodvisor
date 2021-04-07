import * as React from 'react'
import faker from 'faker'
import { appRender } from "../../test/test-utils";
import { FavouritesScreen } from "../favourites.screen";
import { useFavourites } from "../../context/favourites.context";

jest.mock("../../context/favourites.context")

test('should render correct number of favourites', async () => {
    const mockNavigate = jest.fn()
    const mockRestaurant = {
        name: faker.lorem.word(),
        icon: faker.internet.url(),
        photos: [faker.internet.url()],
        vicinity: faker.address.streetAddress(),
        isOpenNow: true,
        rating: 5,
        isClosedTemporarily: false
      } 
    const mockFavourites = {[mockRestaurant.name]: mockRestaurant}
    useFavourites.mockReturnValue({
        favourites: mockFavourites,
      })

    const {getAllByA11yLabel} = appRender(<FavouritesScreen navigation={{navigate: mockNavigate}}/>)
    expect(getAllByA11yLabel(/restaurant information/i)).toHaveLength(Object.keys(mockFavourites).length)
})
