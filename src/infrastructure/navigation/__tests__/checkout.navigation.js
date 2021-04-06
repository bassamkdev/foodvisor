import React from 'react';
import { appRender, fireEvent, act } from '../../../test/test-utils';
import faker from 'faker'
import { CheckoutNavigator } from "../checkout.navigation";

import { useCart } from "../../../context/cart.context";
import { useFavourites } from "../../../context/favourites.context";
import { pay, cardTokenRequest } from "../../../services/stripe.service";

jest.mock('../../../services/stripe.service')
jest.mock('../../../../node_modules/react-native/Libraries/LayoutAnimation/LayoutAnimation');
jest.mock("../../../context/cart.context")
jest.mock("../../../context/favourites.context")

describe('testing checkout stack navigation', () => {
    useCart.mockReturnValue({
    cart:[{id: faker.datatype.uuid(), name: faker.lorem.word(), price:1299}],
    restaurant:{
        name: faker.lorem.word(),
        icon: faker.internet.url(),
        photos: [faker.internet.url()],
        vicinity: faker.address.streetAddress(),
        isOpenNow: true,
        rating: 5,
        isClosedTemporarily: true
    },
    total: 1299, 
    clearCart: jest.fn(), 
    token:'FAKE_TOKEN',
    handleTokenChange: jest.fn()
    })

    useFavourites.mockReturnValue({
        favourites: {}
    })

    pay.mockImplementation(() => new Promise.resolve('success'))
    cardTokenRequest.mockResolvedValue('success')

    test('checkout screen navigates to success screen', async() => {
        const component = (
                <CheckoutNavigator/>
        )
        const {getByA11yLabel, getByPlaceholderText} = appRender(component)
        fireEvent.press(getByA11yLabel(/pay now/i))
        fireEvent(getByPlaceholderText(/cardholder full name/i),'change', {nativeEvent: {text: 'name'}})
        fireEvent.changeText(getByPlaceholderText(/1234/i),'4242424242424242')
        fireEvent.changeText(getByPlaceholderText(/mm/i), '0223')
        fireEvent.changeText(getByPlaceholderText(/cvc/i), '123')

        await act(async() => fireEvent.press(getByA11yLabel(/submit payment/i)))

        expect(getByA11yLabel(/success/i)).not.toBeNull()
    })
})