import { screen } from '@testing-library/react'
import Layout from '..'
import { renderWithProviders } from '../../../test/test-utils'

describe('Layout', () => {
  it('should render top bar', async () => {
    renderWithProviders(<Layout />)
    expect(
      screen.getByRole('button', { name: /products/i })
    ).toBeInTheDocument()
    expect(screen.getByAltText('logo')).toHaveAttribute('src', '/amazon.png')
  })
})
