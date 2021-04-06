import * as React from 'react'
import faker from 'faker'
import {themedRender} from '../../test/test-utils'
import {Callout} from '../map-callout'


test('should render favourites and navigate on press', async () => {
    const mockRestaurant = {
        name: faker.lorem.word(),
        icon: faker.internet.url(),
        photos: [faker.internet.url()],
        vicinity: faker.address.streetAddress(),
        isOpenNow: true,
        rating: 5,
        isClosedTemporarily: true
      } 


  const {getByA11yLabel} = themedRender(
    <Callout restaurant={mockRestaurant} />,
  )
    expect(getByA11yLabel(/restaurant image/i)).toHaveProp('source', {uri: mockRestaurant.photos[0]})
    expect(getByA11yLabel(/restaurant name/i)).toHaveTextContent(mockRestaurant.name)

})
