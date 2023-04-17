import { screen } from '@testing-library/react'
import NavigationBar from '..'
import { renderWithProviders } from '../../../test/test-utils'

describe('NavigationBar', () => {
  it('should render top bar', async () => {
    renderWithProviders(<NavigationBar />)
    expect(
      screen.getByRole('button', { name: /products/i })
    ).toBeInTheDocument()
    expect(screen.getByAltText('logo')).toHaveAttribute('src', '/amazon.png')
  })

  it('should render top bar with added products', async () => {
    renderWithProviders(<NavigationBar />, {
      preloadedState: {
        cart: {
          _persist: { version: 1, rehydrated: false },
          products: {
            '1': 3,
            '2': 4,
          },
        },
      },
    })
    expect(screen.getByTestId('cart-badge')).toHaveTextContent('7')
  })
})
