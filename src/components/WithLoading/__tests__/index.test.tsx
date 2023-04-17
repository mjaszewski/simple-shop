import { render, screen } from '@testing-library/react'
import WithLoading from '..'

describe('WithLoading', () => {
  it('should render loader', async () => {
    render(<WithLoading isLoading>test</WithLoading>)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('should render error', async () => {
    render(
      <WithLoading isLoading={false} error={{ name: 'error' }}>
        test
      </WithLoading>
    )
    expect(screen.getByText(/error/i)).toBeInTheDocument()
  })

  it('should render children', async () => {
    const children = 'test'
    render(<WithLoading isLoading={false}>{children}</WithLoading>)
    expect(screen.getByText(children)).toBeInTheDocument()
  })
})
