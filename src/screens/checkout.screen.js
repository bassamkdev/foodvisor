import * as React from 'react'
import styled from '@emotion/native'
import {ScrollView, View} from 'react-native'
import {
  List,
  Button,
  Avatar,
  Caption,
  Title,
  TextInput,
} from 'react-native-paper'
import {CreditCardInput} from '../components/creditCardInput'
import {SafeArea, FullPageView} from '../components/lib'
import {RestaurantRow} from '../components/restaurant-row'
import {useCart} from '../context/cart.context'

const OrdersList = styled.ScrollView({
  flex: 2,
  borderBottomColor: 'black',
  borderBottomWidth: 1,
  borderStyle: 'solid',
  height: 'auto',
  maxHeight: 200,
})

const CartActionButton = styled(Button)({
  width: 150,
  marginBottom: 20,
  marginTop: 20,
  justifyContent: 'center',
  alignItems: 'center',
})

const ButtonsContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
})

const PaymentInformationContainer = styled.View({
  justifyContent: 'center',
  alignItems: 'center',
})

function CheckoutScreen() {
  const {cart, restaurant, total, clearCart} = useCart()
  const [isPaying, setIsPaying] = React.useState(false)
  const [name, setName] = React.useState('')

  function handleCancelation() {
    setName('')
    setIsPaying(false)
  }

  if (!cart.length) {
    return (
      <SafeArea>
        <FullPageView>
          <Avatar.Icon size={80} icon="cart-off" />
          <Title>Your cart is empty</Title>
        </FullPageView>
      </SafeArea>
    )
  }
  return (
    <SafeArea>
      <RestaurantRow restaurant={restaurant} />
      <OrdersList>
        <List.Section>
          {cart.map(item => (
            <List.Item
              title={item.name}
              right={props => <Caption>{`$${item.price / 100}`}</Caption>}
            />
          ))}
        </List.Section>
      </OrdersList>
      <List.Item
        title="Total:"
        right={props => <Caption>{`$${total / 100}`}</Caption>}
      />

      {isPaying ? (
        <PaymentInformationContainer>
          <TextInput
            mode="outlined"
            theme={{
              colors: {
                text: '#262626',
                placeholder: '#adb5bd',
                primary: '#57cc99',
              },
            }}
            placeholder={`Cardholder Full Name`}
            onChange={({nativeEvent: {text}}) => setName(text)}
          />
          {name ? (
            <>
              <CreditCardInput name={name} />
              <ButtonsContainer>
                <Button mode="flat" color="#d20f46" onPress={handleCancelation}>
                  Cancel
                </Button>
                <Button mode="flat" color="#57cc99" onPress={() => {}}>
                  Submit
                </Button>
              </ButtonsContainer>
            </>
          ) : null}
        </PaymentInformationContainer>
      ) : (
        <ButtonsContainer>
          <CartActionButton
            icon="cart-off"
            mode={'contained'}
            onPress={clearCart}
            color="#d20f46"
          >
            Clear Cart
          </CartActionButton>
          <CartActionButton
            icon="cash-usd"
            mode={'contained'}
            color="#57cc99"
            onPress={() => setIsPaying(true)}
          >
            Pay Now
          </CartActionButton>
        </ButtonsContainer>
      )}
    </SafeArea>
  )
}

export {CheckoutScreen}
