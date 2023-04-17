import { renderWithProviders } from '../../../test/test-utils'
import { screen } from '@testing-library/react'

import NoMatch from '..'

describe('No Match', () => {
  it('should render products list', async () => {
    renderWithProviders(<NoMatch />)
    expect(screen.getByText(/404/i)).toBeInTheDocument()
  })
})
