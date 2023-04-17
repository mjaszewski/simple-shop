import {renderWithProviders} from '../../../test/test-utils'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import Cart from '..'

describe('Cart', () => {
  it('should render empty cart', async () => {
    renderWithProviders(<Cart />)
    expect(screen.getByText(/Cart is empty/i)).toBeInTheDocument()
  })

  it('should render empty cart with products', async () => {
    renderWithProviders(<Cart />, {
      preloadedState: {
        cart: {
          _persist: { version: 1, rehydrated: false },
          products: {
            '1': 1,
            '2': 1,
          },
        },
      },
    })
    await waitFor(() => {
      expect(screen.getAllByRole('row').length).toBe(3)
    })
    expect(screen.getByText(/Total: 132.25\$/i)).toBeInTheDocument()
  })

  it('should remove product', async () => {
    const { store } = renderWithProviders(<Cart />, {
      preloadedState: {
        cart: {
          _persist: { version: 1, rehydrated: false },
          products: {
            '1': 2
          },
        },
      },
    })

    let removeButton
    await waitFor(() => {
      removeButton = screen.getByRole('button', { name: 'remove' })
    })

    removeButton && fireEvent.click(removeButton)
    expect(store.getState().cart.products['1']).toEqual(1)
  })
  it('should add product', async () => {
    const { store } = renderWithProviders(<Cart />, {
      preloadedState: {
        cart: {
          _persist: { version: 1, rehydrated: false },
          products: {
            '1': 1
          },
        },
      },
    })

    let removeButton
    await waitFor(() => {
      removeButton = screen.getByRole('button', { name: 'add' })
    })

    removeButton && fireEvent.click(removeButton)
    expect(store.getState().cart.products['1']).toEqual(2)
  })
  it('should remove all product', async () => {
    const { store } = renderWithProviders(<Cart />, {
      preloadedState: {
        cart: {
          _persist: { version: 1, rehydrated: false },
          products: {
            '1': 1,
          },
        },
      },
    })

    let removeButton
    await waitFor(() => {
      removeButton = screen.getByRole('button', { name: 'removeAll' })
    })

    removeButton && fireEvent.click(removeButton)
    expect(store.getState().cart.products['1']).toEqual(undefined)
  })

  it('should change quantity product', async () => {
    const { store } = renderWithProviders(<Cart />, {
      preloadedState: {
        cart: {
          _persist: { version: 1, rehydrated: false },
          products: {
            '1': 1,
          },
        },
      },
    })

    let input
    await waitFor(() => {
      input = screen.getByLabelText('Quantity')
    })

    if (input) {
      fireEvent.change(input, {target: {value: '23'}})
      fireEvent.blur(input)
    }

    expect(store.getState().cart.products['1']).toEqual(23)

    if (input) {
      fireEvent.change(input, { target: { value: '0' } })
      fireEvent.blur(input)
    }

    expect(store.getState().cart.products['1']).toEqual(23)
  })

  it('should handle checkout', async () => {
    const { store } = renderWithProviders(<Cart />, {
      preloadedState: {
        cart: {
          _persist: { version: 1, rehydrated: false },
          products: {
            '1': 1,
          },
        },
      },
    })

    let checkoutButton
    await waitFor(() => {
      checkoutButton = screen.getByRole('button', { name: 'checkout' })
    })

    if (checkoutButton) {
      fireEvent.click(checkoutButton)
    }
      expect(screen.getByText(/checkout successful/i)).toBeInTheDocument()
    expect(store.getState().cart.products).toEqual({})
  })
})
