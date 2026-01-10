import { GET } from '../route'

describe('GET /api/demo-country', () => {
  const originalEnv = process.env.VERCEL_ENV

  afterEach(() => {
    process.env.VERCEL_ENV = originalEnv
  })

  describe('Development Environment', () => {
    it('should return US when not in production', async () => {
      process.env.VERCEL_ENV = 'development'

      const request = new Request('http://localhost:3000/api/demo-country', {
        method: 'GET',
      })

      const response = await GET(request)
      const data = await response.json()

      expect(data.country).toBe('US')
      expect(data.message).toBe('Hello from US!')
    })

    it('should return US when VERCEL_ENV is preview', async () => {
      process.env.VERCEL_ENV = 'preview'

      const request = new Request('http://localhost:3000/api/demo-country', {
        method: 'GET',
      })

      const response = await GET(request)
      const data = await response.json()

      expect(data.country).toBe('US')
      expect(data.message).toBe('Hello from US!')
    })

    it('should return US when VERCEL_ENV is undefined', async () => {
      delete process.env.VERCEL_ENV

      const request = new Request('http://localhost:3000/api/demo-country', {
        method: 'GET',
      })

      const response = await GET(request)
      const data = await response.json()

      expect(data.country).toBe('US')
      expect(data.message).toBe('Hello from US!')
    })
  })

  describe('Production Environment', () => {
    it('should return country from x-vercel-ip-country header', async () => {
      process.env.VERCEL_ENV = 'production'

      const request = new Request('http://localhost:3000/api/demo-country', {
        method: 'GET',
        headers: {
          'x-vercel-ip-country': 'FR',
        },
      })

      const response = await GET(request)
      const data = await response.json()

      expect(data.country).toBe('FR')
      expect(data.message).toBe('Hello from FR!')
    })

    it('should handle different country codes', async () => {
      process.env.VERCEL_ENV = 'production'

      const countries = ['GB', 'DE', 'JP', 'AU', 'CA']

      for (const countryCode of countries) {
        const request = new Request('http://localhost:3000/api/demo-country', {
          method: 'GET',
          headers: {
            'x-vercel-ip-country': countryCode,
          },
        })

        const response = await GET(request)
        const data = await response.json()

        expect(data.country).toBe(countryCode)
        expect(data.message).toBe(`Hello from ${countryCode}!`)
      }
    })

    it('should return null when x-vercel-ip-country header is missing', async () => {
      process.env.VERCEL_ENV = 'production'

      const request = new Request('http://localhost:3000/api/demo-country', {
        method: 'GET',
      })

      const response = await GET(request)
      const data = await response.json()

      // Headers.get() returns null when header is missing
      expect(data.country).toBeNull()
      expect(data.message).toContain('Hello from')
    })
  })

  describe('Response Format', () => {
    it('should return JSON response', async () => {
      const request = new Request('http://localhost:3000/api/demo-country', {
        method: 'GET',
      })

      const response = await GET(request)

      expect(response.headers.get('content-type')).toContain('application/json')
    })

    it('should have correct response structure', async () => {
      const request = new Request('http://localhost:3000/api/demo-country', {
        method: 'GET',
        headers: {
          'x-vercel-ip-country': 'US',
        },
      })

      const response = await GET(request)
      const data = await response.json()

      expect(data).toHaveProperty('country')
      expect(data).toHaveProperty('message')
      expect(Object.keys(data)).toHaveLength(2)
    })

    it('should return 200 status code', async () => {
      const request = new Request('http://localhost:3000/api/demo-country', {
        method: 'GET',
      })

      const response = await GET(request)

      expect(response.status).toBe(200)
      expect(response.ok).toBe(true)
    })
  })
})
