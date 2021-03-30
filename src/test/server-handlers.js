import {rest} from 'msw'
import {host} from '../utils/host'
const {locations: locationsMock} = require('./geocode.mock')
const {mocks: restaurantsMocks} = require('./data')
const {addMockImage} = require('./data')
const handlers = [
  rest.get(`${host}geocode`, (req, res, ctx) => {
    const city = req.url.searchParams.get('city')
    const locationMock = locationsMock[city.toLowerCase()]
    return res(ctx.json(locationMock))
  }),
  rest.get(`${host}restaurants`, (req, res, ctx) => {
    const location = req.url.searchParams.get('location')
    const data = restaurantsMocks[location]
    if (data) {
      data.results = data.results.map(addMockImage)
    }
    return res(ctx.json(data))
  })
]

export {handlers}
