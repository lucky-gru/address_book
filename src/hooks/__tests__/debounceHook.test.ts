import { renderHook } from '@testing-library/react-hooks'
import { useDebounce } from '../debounceHook'

describe('useDebounce', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should be defined', () => {
    expect(useDebounce).toBeDefined()
  })

  it('should return two functions', () => {
    const search = 'search word'
    const { result } = renderHook(() => useDebounce(search, 500))

    expect(result.current).toBe(search)
    expect(typeof result.current).toBe('string')
  })
})
