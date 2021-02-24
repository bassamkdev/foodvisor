module.exports.payRequest = async (request, response, stripeClient) => {
  const body = JSON.parse(request.body)
  const {token, amount} = body
  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount,
      currency: 'USD',
      payment_method_types: ['card'],
      payment_method_data: {
        type: 'card',
        card: {
          token,
        },
      },
      confirm: true,
    })
    console.log(paymentIntent)
    response.json(paymentIntent)
  } catch (err) {
    console.log(err)
    response.status(400).send(err)
  }
}
