import {host} from '../../utils/host'
import {server, rest} from '../../test/server'
import {pay} from '../stripe.service'

test('calls fetch at the endpoint with the arguments', async () => {
  const amount = 'AMOUNT'
  const token = 'FAKE_TOKEN'
  const mockResult = {mockValue: 'VALUE'}
  let body
  server.use(
    rest.post(`${host}pay`, async (req, res, ctx) => {
      body = req.body
      return res(ctx.json(mockResult))
    }),
  )
  const result = await pay(token, amount)
  console.log
  expect(result).toEqual(mockResult)
  expect(body).toEqual(JSON.stringify({token, amount}))
})

test('rejects the promise with proper error message when response status is greater than 200', async () => {
  const amount = 'AMOUNT'
  const token = 'FAKE_TOKEN'
  server.use(
    rest.post(`${host}pay`, async (req, res, ctx) => {
      return res(ctx.status(400))
    }),
  )
  const error = await pay(token, amount).catch(e => e)
  expect(error).toMatchInlineSnapshot(
    `"something went wrong with your payment"`,
  )
})
