import React from 'react';
import { appRender, fireEvent, act } from '../../test/test-utils';
import faker from 'faker'
import { CheckoutScreen } from "../checkout.screen";

import { useCart } from "../../context/cart.context";
import { useFavourites } from "../../context/favourites.context";
import * as stripe from "../../services/stripe.service"


jest.mock('../../../node_modules/react-native/Libraries/LayoutAnimation/LayoutAnimation');
jest.mock("../../context/cart.context")
jest.mock("../../context/favourites.context")

function renderCheckout() {
    const mockCart = {id: faker.datatype.uuid(), name: faker.lorem.word(), price:1299}
    const mockClearCart = jest.fn()
    const mockNavigation = {navigate: jest.fn()}
    useCart.mockReturnValue({
    cart:[mockCart],
    restaurant:{
        name: faker.lorem.word(),
        icon: faker.internet.url(),
        photos: [faker.internet.url()],
        vicinity: faker.address.streetAddress(),
        isOpenNow: true,
        rating: 5,
        isClosedTemporarily: false
    },
    total: 1299, 
    clearCart: mockClearCart, 
    token:'FAKE_TOKEN',
    handleTokenChange: jest.fn()
    })
  
    const utils = appRender(<CheckoutScreen navigation={mockNavigation}/>)
    return {mockNavigation, mockCart, mockClearCart, ...utils}
}

describe('checkout screen functionality', () => {
    useFavourites.mockReturnValue({
        favourites: {}
    })
    jest.spyOn(stripe,'cardTokenRequest')
    stripe.cardTokenRequest.mockResolvedValue('success')

    test('checkout screen navigates to success screen', async() => {
        const {getByA11yLabel, getByPlaceholderText,getByTestId, mockCart, mockNavigation} = renderCheckout()
        expect(getByTestId(/total/i)).toHaveTextContent(mockCart.price/100)
        fireEvent.press(getByA11yLabel(/pay now/i))
        fireEvent(getByPlaceholderText(/cardholder full name/i),'change', {nativeEvent: {text: 'name'}})
        fireEvent.changeText(getByPlaceholderText(/1234/i),'4242424242424242')
        fireEvent.changeText(getByPlaceholderText(/mm/i), '0223')
        fireEvent.changeText(getByPlaceholderText(/cvc/i), '123')

        await act(async() => fireEvent.press(getByA11yLabel(/submit payment/i)))

        expect(mockNavigation.navigate).toHaveBeenCalledTimes(1)
    })

    test('can clear cart', async () => {
        const {getByA11yLabel, mockClearCart} = renderCheckout()

        fireEvent.press(getByA11yLabel(/clear cart/i))
        expect(mockClearCart).toHaveBeenCalledTimes(1)
    })

    test('can cancel submiting payment', async () => {
        const {getByA11yLabel, getByPlaceholderText} = renderCheckout()
        fireEvent.press(getByA11yLabel(/pay now/i))
        fireEvent(getByPlaceholderText(/cardholder full name/i),'change', {nativeEvent: {text: 'name'}})
        fireEvent.changeText(getByPlaceholderText(/1234/i),'4242424242424242')
        fireEvent.changeText(getByPlaceholderText(/mm/i), '0223')
        fireEvent.changeText(getByPlaceholderText(/cvc/i), '123')

        fireEvent.press(getByA11yLabel(/cancel payment/i))

        expect(getByA11yLabel(/pay now/i)).not.toBeNull()
    })
        
})