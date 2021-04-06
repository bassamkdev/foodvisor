import * as React from 'react'
import {
  appRender,
  fireEvent,
  waitForElementToBeRemoved,
} from '../../test/test-utils'
import {RestaurantsList} from '../restaurants-list'
import {useFavourites} from '../../context/favourites.context'

jest.mock('../../context/favourites.context')

test('should render a list of restaurants and navigate to restaurants info on press', async () => {
  const mockNavigate = jest.fn()
  useFavourites.mockReturnValue({
    favourites: [],
  })

  const {getByA11yRole, getAllByA11yLabel} = appRender(
    <RestaurantsList navigate={mockNavigate} />,
  )
  expect(getByA11yRole('progressbar')).not.toBeNull()
  await waitForElementToBeRemoved(() => getByA11yRole('progressbar'))
  
  const restaurants = getAllByA11yLabel(/restaurant/i)
  
  fireEvent.press(restaurants[1])
  expect(mockNavigate).toHaveBeenCalledTimes(1)
})
