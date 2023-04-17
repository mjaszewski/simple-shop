import { rest } from 'msw'
import { renderWithProviders } from '../../../test/test-utils'
import { server } from '../../../test/server'
import { screen } from '@testing-library/react'

import Products from '..'

describe('Products', () => {
  it('should render products list', async () => {
    renderWithProviders(<Products />)
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
    const addToCartButtons = await screen.findAllByRole('button')
    expect(addToCartButtons).toHaveLength(5)
  })

  it('should handles error response', async () => {
    server.use(
      rest.get('https://fakestoreapi.com/products', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    renderWithProviders(<Products />)
    screen.getByText('Loading...')
    await screen.findByText('Error!')
  })
})
