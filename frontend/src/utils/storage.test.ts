import { getProfile, setProfile } from './storage'

describe('Storage utility', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('getProfile', () => {
    it('returns null when localStorage is empty', () => {
      expect(getProfile()).toBeNull()
    })

    it('returns null when profile key does not exist', () => {
      localStorage.setItem('other-key', 'value')
      expect(getProfile()).toBeNull()
    })

    it('returns null when stored data is not valid JSON', () => {
      localStorage.setItem('profile', 'invalid json {')
      expect(getProfile()).toBeNull()
    })

    it('returns null when stored data is missing required fields', () => {
      localStorage.setItem('profile', JSON.stringify({ name: 'John' }))
      expect(getProfile()).toBeNull()
    })

    it('returns null when stored data has wrong field types', () => {
      localStorage.setItem('profile', JSON.stringify({ name: 'John', email: 123, bio: 'bio' }))
      expect(getProfile()).toBeNull()
    })

    it('returns profile object when valid data is stored', () => {
      const profile = { name: 'John Doe', email: 'john@example.com', bio: 'My bio' }
      localStorage.setItem('profile', JSON.stringify(profile))
      expect(getProfile()).toEqual(profile)
    })

    it('returns profile with empty strings when stored', () => {
      const profile = { name: '', email: '', bio: '' }
      localStorage.setItem('profile', JSON.stringify(profile))
      expect(getProfile()).toEqual(profile)
    })
  })

  describe('setProfile', () => {
    it('stores profile data in localStorage', () => {
      const profile = { name: 'Jane Doe', email: 'jane@example.com', bio: 'Bio' }
      setProfile(profile)
      const stored = localStorage.getItem('profile')
      expect(stored).toBe(JSON.stringify(profile))
    })

    it('overwrites existing profile data', () => {
      const profile1 = { name: 'John', email: 'john@example.com', bio: 'Bio1' }
      const profile2 = { name: 'Jane', email: 'jane@example.com', bio: 'Bio2' }
      setProfile(profile1)
      setProfile(profile2)
      expect(getProfile()).toEqual(profile2)
    })

    it('handles profile with empty strings', () => {
      const profile = { name: '', email: '', bio: '' }
      setProfile(profile)
      expect(getProfile()).toEqual(profile)
    })

    it('handles profile with special characters', () => {
      const profile = { name: 'John "Doc" Doe', email: 'john+tag@example.com', bio: 'Line1\nLine2' }
      setProfile(profile)
      expect(getProfile()).toEqual(profile)
    })

    it('silently fails when localStorage is unavailable', () => {
      const originalSetItem = Storage.prototype.setItem
      Storage.prototype.setItem = (() => {
        throw new Error('QuotaExceededError')
      }) as typeof Storage.prototype.setItem
      const profile = { name: 'John', email: 'john@example.com', bio: 'Bio' }
      // Should not throw
      expect(() => setProfile(profile)).not.toThrow()
      Storage.prototype.setItem = originalSetItem
    })
  })
})
