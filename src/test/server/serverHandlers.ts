import { rest } from 'msw'
import { productsResponse } from '../stubs'

const handlers = [
  rest.get('https://fakestoreapi.com/products', (req, res, ctx) => {
    return res(ctx.json(productsResponse))
  }),
]

export { handlers }
