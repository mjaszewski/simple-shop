import { renderWithProviders } from '../../../../../test/test-utils'
import Product from '..'
import { screen, fireEvent } from '@testing-library/react'

describe('Product', () => {
  const productProps = {
    id: 1,
    title: 'Title',
    category: 'Cars',
    description: 'Super fast car',
    price: 22,
    image: 'https://dummyimage.com/600x400/000/fff',
    rating: { count: 12, rate: 2 },
  }

  it('should render product card', async () => {
    renderWithProviders(<Product {...productProps} />)
    expect(screen.getByText(productProps.title)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should render product card without rating', async () => {
    renderWithProviders(<Product {...productProps} rating={undefined} />)
    expect(screen.getByText(productProps.title)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should update store after click add to cart', async () => {
    const { store } = renderWithProviders(<Product {...productProps} />)
    const addToCart = screen.getByText(/Add to cart/i)
    fireEvent.click(addToCart)
    expect(store.getState().cart.products['1']).toEqual(1)
    fireEvent.click(addToCart)
    expect(store.getState().cart.products['1']).toEqual(2)
  })
})
