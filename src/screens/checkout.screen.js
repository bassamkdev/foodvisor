import * as React from 'react'
import styled from '@emotion/native'
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
import {useAsync} from '../utils/hooks'
import {pay} from '../services/stripe.service'

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

const ErrorText = styled.Text({
  color: '#d20f46',
  fontSize: 18,
  marginTop: 10,
  backgroundColor: '#dee2e6',
  padding: 10,
})

const GrayedOutText = styled(Title)({
  color: 'gray',
})

function CheckoutScreen({navigation}) {
  const {isLoading, isError, error, isSuccess, reset, run} = useAsync()
  const {cart, restaurant, total, clearCart, token} = useCart()
  const [isPaying, setIsPaying] = React.useState(false)
  const [name, setName] = React.useState('')
  function handlePayment() {
    if (isError) {
      reset()
    }
    run(pay(token, total))
  }
  React.useEffect(() => {
    if (isSuccess) {
      clearCart()
      setIsPaying(false)
      setName('')
      reset()
      navigation.navigate('success')
    }
  }, [clearCart, isSuccess, navigation, reset])

  function handleCancelation() {
    setName('')
    setIsPaying(false)
  }

  if (!cart.length) {
    return (
      <SafeArea testID='checkout screen'>
        <FullPageView>
          <Avatar.Icon
            size={80}
            icon="cart-off"
            theme={{colors: {primary: 'gray'}}}
          />
          <GrayedOutText>Your cart is empty</GrayedOutText>
        </FullPageView>
      </SafeArea>
    )
  }
  return (
    <SafeArea testID='checkout screen'>
      <RestaurantRow restaurant={restaurant} />
      <OrdersList>
        <List.Section>
          {cart.map(item => (
            <List.Item
              key={item.id}
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
                <Button
                accessibilityLabel='cancel payment'
                  mode="flat"
                  color="#d20f46"
                  onPress={handleCancelation}
                  contentStyle={{alignSelf: 'center'}}
                >
                  Cancel
                </Button>
                <Button
                  accessibilityLabel='submit payment'
                  mode="flat"
                  color="#57cc99"
                  disabled={!token}
                  onPress={handlePayment}
                  loading={isLoading}
                  contentStyle={{alignSelf: 'center'}}
                >
                  Submit
                </Button>
              </ButtonsContainer>
            </>
          ) : null}
          {isError ? <ErrorText>{error}</ErrorText> : null}
        </PaymentInformationContainer>
      ) : (
        <ButtonsContainer>
          <CartActionButton
          accessibilityLabel='clear cart'
            icon="cart-off"
            mode={'contained'}
            onPress={clearCart}
            color="#d20f46"
            contentStyle={{alignSelf: 'center'}}
          >
            Clear Cart
          </CartActionButton>
          <CartActionButton
          accessibilityLabel='pay now'
            icon="cash-usd"
            mode={'contained'}
            color="#57cc99"
            onPress={() => setIsPaying(true)}
            contentStyle={{alignSelf: 'center'}}
          >
            Pay Now
          </CartActionButton>
        </ButtonsContainer>
      )}
    </SafeArea>
  )
}

export {CheckoutScreen}
