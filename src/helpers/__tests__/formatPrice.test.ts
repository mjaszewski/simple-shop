import { formatPrice } from '../formatPrice'

describe('formatPrice', () => {
  it('should format number price', () => {
    expect(formatPrice(12)).toBe('12.00')
    expect(formatPrice(12.1)).toBe('12.10')
  })

  it('should format string price', () => {
    expect(formatPrice('12')).toBe('12.00')
    expect(formatPrice('12.1')).toBe('12.10')
  })
})
