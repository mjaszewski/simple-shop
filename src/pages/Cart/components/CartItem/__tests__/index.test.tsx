import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '../../../../../test/test-utils'
import CartItem from '..'
import { productProps } from '../../../../../test/stubs'

describe('CartItem', () => {
  const props = {
    ...productProps,
    quantity: 1,
    addProduct: jest.fn(),
    removeProduct: jest.fn(),
    removeAllProducts: jest.fn(),
    updateQuantityProduct: jest.fn(),
  }

  it('should render cart item', async () => {
    renderWithProviders(<CartItem {...props}/>)
    expect(screen.getByText(props.title)).toBeInTheDocument()
    expect( screen.getByRole('button', { name: 'remove' })).toHaveAttribute('disabled')
  })

  it('should handle remove product', async () => {
    renderWithProviders(<CartItem {...props} quantity={2} />)

    const removeButton = screen.getByRole('button', { name: 'remove' })
    fireEvent.click(removeButton)

    expect(props.removeProduct).toHaveBeenCalledWith(props.id)
  })

  it('should handle add product', async () => {
    renderWithProviders(<CartItem {...props} />)

    const removeButton = screen.getByRole('button', { name: 'add' })
    fireEvent.click(removeButton)

    expect(props.addProduct).toHaveBeenCalledWith(props.id)
  })

  it('should handle delete all product', async () => {
    renderWithProviders(<CartItem {...props} />)

    const removeButton = screen.getByRole('button', { name: 'removeAll' })
    fireEvent.click(removeButton)

    expect(props.removeAllProducts).toHaveBeenCalledWith(props.id)
  })

  it('should change quantity product', async () => {
    renderWithProviders(<CartItem {...props} />)

    const input = screen.getByLabelText('Quantity')
    fireEvent.change(input, {target: {value: '23'}})
    fireEvent.blur(input)

    expect(props.updateQuantityProduct).toHaveBeenCalledWith(1,23)

    if (input) {
      fireEvent.change(input, { target: { value: '0' } })
      fireEvent.blur(input)
    }

    expect(props.updateQuantityProduct).toHaveBeenCalledWith(1,23)
  })
})
