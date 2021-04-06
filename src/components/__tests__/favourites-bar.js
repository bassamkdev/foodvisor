import * as React from 'react'
import faker from 'faker'
import {appRender, fireEvent} from '../../test/test-utils'
import {FavouritesBar} from '../favourites-bar'
import {useFavourites} from '../../context/favourites.context'

jest.mock('../../context/favourites.context')

test('should render favourites and navigate on press', async () => {
    const mockNavigate = jest.fn()
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
  })

  const {getByA11yLabel} = appRender(
    <FavouritesBar navigate={mockNavigate} />,
  )
  expect(getByA11yLabel(/favourite restaurants/i)).not.toBeNull()
  expect(getByA11yLabel(/favourites/i)).toHaveProp('horizontal', true)
  
  fireEvent.press(getByA11yLabel(mockRestaurant.name))
  expect(mockNavigate).toHaveBeenCalledTimes(1)
})
