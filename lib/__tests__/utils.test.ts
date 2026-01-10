import { cn } from '../utils'

describe('cn utility function', () => {
  it('should merge class names', () => {
    const result = cn('class1', 'class2')
    expect(result).toBe('class1 class2')
  })

  it('should handle conditional class names', () => {
    const result = cn('base', true && 'conditional', false && 'hidden')
    expect(result).toBe('base conditional')
  })

  it('should handle arrays', () => {
    const result = cn(['class1', 'class2'])
    expect(result).toBe('class1 class2')
  })

  it('should merge Tailwind classes correctly', () => {
    const result = cn('p-4 p-8')
    // twMerge should keep only the last padding class
    expect(result).toBe('p-8')
  })

  it('should handle undefined and null values', () => {
    const result = cn('class1', undefined, null, 'class2')
    expect(result).toBe('class1 class2')
  })

  it('should work with no arguments', () => {
    const result = cn()
    expect(result).toBe('')
  })
})
