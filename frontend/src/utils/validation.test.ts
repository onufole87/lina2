import { validateName, validateEmail, validateBio, validateProfileForm } from './validation'

describe('Validation utilities', () => {
  describe('validateName', () => {
    it('returns error for empty name', () => {
      expect(validateName('')).toBe('Name is required')
    })

    it('returns error for whitespace-only name', () => {
      expect(validateName('   ')).toBe('Name is required')
    })

    it('returns undefined for valid name', () => {
      expect(validateName('John Doe')).toBeUndefined()
    })

    it('returns undefined for name with single character', () => {
      expect(validateName('J')).toBeUndefined()
    })
  })

  describe('validateEmail', () => {
    it('returns error for empty email', () => {
      expect(validateEmail('')).toBe('Email is required')
    })

    it('returns error for whitespace-only email', () => {
      expect(validateEmail('   ')).toBe('Email is required')
    })

    it('returns error for invalid email format (no @)', () => {
      expect(validateEmail('invalidemail.com')).toBe('Please enter a valid email address')
    })

    it('returns error for invalid email format (no domain)', () => {
      expect(validateEmail('invalid@')).toBe('Please enter a valid email address')
    })

    it('returns error for invalid email format (no extension)', () => {
      expect(validateEmail('invalid@domain')).toBe('Please enter a valid email address')
    })

    it('returns error for invalid email format (contains spaces)', () => {
      expect(validateEmail('invalid @domain.com')).toBe('Please enter a valid email address')
    })

    it('returns undefined for valid email', () => {
      expect(validateEmail('john@example.com')).toBeUndefined()
    })

    it('returns undefined for email with subdomain', () => {
      expect(validateEmail('john@mail.example.com')).toBeUndefined()
    })

    it('returns undefined for email with multiple dots', () => {
      expect(validateEmail('john.doe@example.co.uk')).toBeUndefined()
    })
  })

  describe('validateBio', () => {
    it('returns undefined for empty bio', () => {
      expect(validateBio('')).toBeUndefined()
    })

    it('returns undefined for any bio text', () => {
      expect(validateBio('This is my bio')).toBeUndefined()
    })
  })

  describe('validateProfileForm', () => {
    it('returns errors for all empty fields', () => {
      const errors = validateProfileForm('', '', '')
      expect(errors.name).toBe('Name is required')
      expect(errors.email).toBe('Email is required')
      expect(errors.bio).toBeUndefined()
    })

    it('returns error for invalid email only', () => {
      const errors = validateProfileForm('John Doe', 'invalid-email', '')
      expect(errors.name).toBeUndefined()
      expect(errors.email).toBe('Please enter a valid email address')
      expect(errors.bio).toBeUndefined()
    })

    it('returns no errors for valid form with empty bio', () => {
      const errors = validateProfileForm('John Doe', 'john@example.com', '')
      expect(Object.keys(errors).length).toBe(0)
    })

    it('returns no errors for valid form with bio', () => {
      const errors = validateProfileForm('John Doe', 'john@example.com', 'This is my bio')
      expect(Object.keys(errors).length).toBe(0)
    })

    it('returns error for empty name with valid email', () => {
      const errors = validateProfileForm('', 'john@example.com', 'Bio')
      expect(errors.name).toBe('Name is required')
      expect(errors.email).toBeUndefined()
    })
  })
})
