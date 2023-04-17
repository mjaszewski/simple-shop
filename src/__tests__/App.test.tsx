import App from '../App'
import { renderWithProviders } from '../test/test-utils'

describe('App', () => {
  it('should render shop', async () => {
    renderWithProviders(<App />)
  })
})
