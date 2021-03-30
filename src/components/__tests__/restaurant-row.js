import * as React from 'react'
import faker from 'faker'
import {appRender} from '../../test/test-utils'
import {RestaurantRow} from '../restaurant-row'
import {useFavourites} from '../../context/favourites.context'

jest.mock('../../context/favourites.context')

test('should render restaurant info', async () => {
  useFavourites.mockReturnValue({
    favourites: [],
  })
  const mockRestaurant = {
    name: faker.lorem.word(),
    icon: faker.internet.url(),
    photos: [faker.internet.url()],
    vicinity: faker.address.streetAddress(),
    isOpenNow: true,
    rating: 5,
    isClosedTemporarily: true
  } 

  const {getByA11yLabel} = appRender(
    <RestaurantRow restaurant={mockRestaurant} />,
  )
  expect(getByA11yLabel(/favourite icon/i)).not.toBeNull()
  expect(getByA11yLabel(/restaurant name/i)).not.toBeNull()
  expect(getByA11yLabel(/restaurant name/i)).toHaveTextContent(mockRestaurant.name)
  expect(getByA11yLabel(/restaurant address/i)).not.toBeNull()
  expect(getByA11yLabel(/restaurant address/i)).toHaveTextContent(mockRestaurant.vicinity)
  expect(getByA11yLabel(/restaurant rating/i)).not.toBeNull()
  expect(getByA11yLabel(/restaurant icon/i)).not.toBeNull()
  expect(getByA11yLabel(/open now/i)).not.toBeNull()

})
