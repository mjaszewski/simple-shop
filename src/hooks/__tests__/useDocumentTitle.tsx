import { renderHook } from '@testing-library/react'
import useDocumentTitle from '../useDocumentTitle'

describe('useDocumentTitle', () => {
  it('should transform array to object', () => {
    const originalTitle = 'shop'
    const title = 'test'
    document.title = originalTitle
    const { unmount } = renderHook(() => useDocumentTitle(title))
    expect(document.title).toBe(title)
    unmount()
    expect(document.title).toBe(originalTitle)
  })
})
