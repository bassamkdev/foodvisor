import React from 'react';
import { appRender, fireEvent, waitForElementToBeRemoved } from '../../../test/test-utils';

import { RestaurantsStackScreen } from "../restaurants-navigation";
import { useFavourites } from "../../../context/favourites.context";
import { useCart } from "../../../context/cart.context";

jest.mock('../../../context/favourites.context')
jest.mock('../../../context/cart.context')

describe('testing restaurants stack navigation', () => {
    useFavourites.mockReturnValue({
        favourites: {}
    })
    useCart.mockReturnValue({
        addToCart: jest.fn()
    })

    test('screen contains restaurants linking to restaurant details screen', async() => {
        const component = (
                <RestaurantsStackScreen/>
        )
        const {getByA11yLabel, getByA11yRole, getAllByA11yLabel} = appRender(component)
        await waitForElementToBeRemoved(() => getByA11yRole('progressbar'))
        const restaurants = getAllByA11yLabel(/restaurant/i)
        fireEvent.press(restaurants[1])
        expect(getByA11yLabel(/menu/i)).not.toBeNull()
    })
    
})