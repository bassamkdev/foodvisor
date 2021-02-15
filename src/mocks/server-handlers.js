import {rest} from 'msw'

const handlers = [
  rest.get('/restaurants', async (req, res, ctx) => {
    return res(ctx.json({result: 'hello world'}))
  }),
]

export {handlers}
