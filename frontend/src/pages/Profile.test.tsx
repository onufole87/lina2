import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Profile from './Profile'

describe('Profile Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('Rendering', () => {
    it('renders the profile page with heading', () => {
      render(<Profile />)
      expect(screen.getByText('Profile')).toBeInTheDocument()
    })

    it('renders all three form fields', () => {
      render(<Profile />)
      expect(screen.getByLabelText('Name')).toBeInTheDocument()
      expect(screen.getByLabelText('Email')).toBeInTheDocument()
      expect(screen.getByLabelText('Bio')).toBeInTheDocument()
    })

    it('renders the Save button', () => {
      render(<Profile />)
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
    })

    it('initializes form fields with empty values', () => {
      render(<Profile />)
      const nameInput = screen.getByLabelText('Name') as HTMLInputElement
      const emailInput = screen.getByLabelText('Email') as HTMLInputElement
      const bioTextarea = screen.getByLabelText('Bio') as HTMLTextAreaElement
      expect(nameInput.value).toBe('')
      expect(emailInput.value).toBe('')
      expect(bioTextarea.value).toBe('')
    })

    it('renders Profile Information section', () => {
      render(<Profile />)
      expect(screen.getByText('Profile Information')).toBeInTheDocument()
    })

    it('renders Settings section placeholder', () => {
      render(<Profile />)
      expect(screen.getByText('Settings')).toBeInTheDocument()
    })
  })

  describe('User Input - Field Interaction', () => {
    it('allows user to type into the name field', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      const nameInput = screen.getByLabelText('Name') as HTMLInputElement
      await user.type(nameInput, 'John Doe')
      expect(nameInput.value).toBe('John Doe')
    })

    it('allows user to type into the email field', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      const emailInput = screen.getByLabelText('Email') as HTMLInputElement
      await user.type(emailInput, 'john@example.com')
      expect(emailInput.value).toBe('john@example.com')
    })

    it('allows user to type into the bio field', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      const bioTextarea = screen.getByLabelText('Bio') as HTMLTextAreaElement
      await user.type(bioTextarea, 'This is my biography')
      expect(bioTextarea.value).toBe('This is my biography')
    })

    it('allows user to type into all fields independently', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      await user.type(screen.getByLabelText('Name'), 'Jane Smith')
      await user.type(screen.getByLabelText('Email'), 'jane@example.com')
      await user.type(screen.getByLabelText('Bio'), 'Engineer and designer')
      expect((screen.getByLabelText('Name') as HTMLInputElement).value).toBe('Jane Smith')
      expect((screen.getByLabelText('Email') as HTMLInputElement).value).toBe(
        'jane@example.com'
      )
      expect((screen.getByLabelText('Bio') as HTMLTextAreaElement).value).toBe(
        'Engineer and designer'
      )
    })
  })

  describe('Validation - Error Messages', () => {
    it('displays error message when name field is empty on submit', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      expect(screen.getByText('Name is required')).toBeInTheDocument()
    })

    it('displays error message when email field is empty on submit', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      await user.type(screen.getByLabelText('Name'), 'John Doe')
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      expect(screen.getByText('Email is required')).toBeInTheDocument()
    })

    it('displays error message when email format is invalid', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      await user.type(screen.getByLabelText('Name'), 'John Doe')
      await user.type(screen.getByLabelText('Email'), 'invalid-email')
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })

    it('displays both name and email errors when both are missing', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      expect(screen.getByText('Name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
    })

    it('does not display error for empty bio field', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      await user.type(screen.getByLabelText('Name'), 'John Doe')
      await user.type(screen.getByLabelText('Email'), 'john@example.com')
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      // Bio field is optional, no validation error should appear
      const bioErrorMessages = screen.queryAllByText(/bio.*required/i)
      expect(bioErrorMessages).toHaveLength(0)
    })

    it('clears name error when user starts typing in name field', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      expect(screen.getByText('Name is required')).toBeInTheDocument()
      const nameInput = screen.getByLabelText('Name')
      await user.type(nameInput, 'J')
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument()
    })

    it('clears email error when user starts typing in email field', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      await user.type(screen.getByLabelText('Name'), 'John Doe')
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      const emailInput = screen.getByLabelText('Email')
      await user.type(emailInput, 'j')
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument()
    })

    it('clears validation error when email becomes valid', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      await user.type(screen.getByLabelText('Name'), 'John Doe')
      await user.type(screen.getByLabelText('Email'), 'invalid')
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
      const emailInput = screen.getByLabelText('Email') as HTMLInputElement
      await user.clear(emailInput)
      await user.type(emailInput, 'valid@example.com')
      // Error should be cleared
      expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument()
    })
  })

  describe('Form Submission - Invalid Data', () => {
    it('prevents form submission when name is empty', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      await user.type(screen.getByLabelText('Email'), 'john@example.com')
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      // localStorage should not be updated
      expect(localStorage.getItem('profile')).toBeNull()
    })

    it('prevents form submission when email is empty', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      await user.type(screen.getByLabelText('Name'), 'John Doe')
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      // localStorage should not be updated
      expect(localStorage.getItem('profile')).toBeNull()
    })

    it('prevents form submission when email format is invalid', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      await user.type(screen.getByLabelText('Name'), 'John Doe')
      await user.type(screen.getByLabelText('Email'), 'invalid-email-format')
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      // localStorage should not be updated
      expect(localStorage.getItem('profile')).toBeNull()
    })

    it('does not submit when name is only whitespace', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      await user.type(screen.getByLabelText('Name'), '   ')
      await user.type(screen.getByLabelText('Email'), 'john@example.com')
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      expect(localStorage.getItem('profile')).toBeNull()
    })
  })

  describe('Form Submission - Valid Data', () => {
    it('allows form submission with valid name and email and empty bio', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      await user.type(screen.getByLabelText('Name'), 'John Doe')
      await user.type(screen.getByLabelText('Email'), 'john@example.com')
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      // No error messages should be displayed
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument()
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument()
      expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument()
    })

    it('allows form submission with valid name, email, and bio', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      await user.type(screen.getByLabelText('Name'), 'Jane Smith')
      await user.type(screen.getByLabelText('Email'), 'jane@example.com')
      await user.type(screen.getByLabelText('Bio'), 'Full-stack engineer')
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      // No error messages should be displayed
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument()
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument()
    })

    it('accepts valid emails with subdomains', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      await user.type(screen.getByLabelText('Name'), 'John Doe')
      await user.type(screen.getByLabelText('Email'), 'john@mail.example.com')
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument()
    })

    it('accepts valid emails with multiple dots', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      await user.type(screen.getByLabelText('Name'), 'John Doe')
      await user.type(screen.getByLabelText('Email'), 'john.doe@example.co.uk')
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument()
    })
  })

  describe('localStorage Integration - Save', () => {
    it('saves profile data to localStorage on valid submission', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      await user.type(screen.getByLabelText('Name'), 'John Doe')
      await user.type(screen.getByLabelText('Email'), 'john@example.com')
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      const stored = localStorage.getItem('profile')
      expect(stored).toBeTruthy()
      const parsed = JSON.parse(stored!)
      expect(parsed.name).toBe('John Doe')
      expect(parsed.email).toBe('john@example.com')
      expect(parsed.bio).toBe('')
    })

    it('saves profile data with bio to localStorage', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      await user.type(screen.getByLabelText('Name'), 'Jane Smith')
      await user.type(screen.getByLabelText('Email'), 'jane@example.com')
      await user.type(screen.getByLabelText('Bio'), 'Designer and developer')
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      const stored = localStorage.getItem('profile')
      expect(stored).toBeTruthy()
      const parsed = JSON.parse(stored!)
      expect(parsed.name).toBe('Jane Smith')
      expect(parsed.email).toBe('jane@example.com')
      expect(parsed.bio).toBe('Designer and developer')
    })

    it('overwrites previous profile data in localStorage', async () => {
      const user = userEvent.setup()
      // Set initial profile
      const initialProfile = { name: 'John Doe', email: 'john@example.com', bio: 'Initial bio' }
      localStorage.setItem('profile', JSON.stringify(initialProfile))
      render(<Profile />)
      // Clear fields and enter new data
      const nameInput = screen.getByLabelText('Name') as HTMLInputElement
      const emailInput = screen.getByLabelText('Email') as HTMLInputElement
      const bioTextarea = screen.getByLabelText('Bio') as HTMLTextAreaElement
      await user.clear(nameInput)
      await user.clear(emailInput)
      await user.clear(bioTextarea)
      await user.type(nameInput, 'Jane Smith')
      await user.type(emailInput, 'jane@example.com')
      await user.type(bioTextarea, 'New bio')
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      const stored = localStorage.getItem('profile')
      expect(stored).toBeTruthy()
      const parsed = JSON.parse(stored!)
      expect(parsed.name).toBe('Jane Smith')
      expect(parsed.email).toBe('jane@example.com')
      expect(parsed.bio).toBe('New bio')
    })

    it('does not save to localStorage if validation fails', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      await user.type(screen.getByLabelText('Email'), 'invalid-email')
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      expect(localStorage.getItem('profile')).toBeNull()
    })
  })

  describe('localStorage Integration - Load on Mount', () => {
    it('repopulates form fields with previously saved data on component mount', async () => {
      const savedProfile = {
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'Software engineer',
      }
      localStorage.setItem('profile', JSON.stringify(savedProfile))
      render(<Profile />)
      expect((screen.getByLabelText('Name') as HTMLInputElement).value).toBe('John Doe')
      expect((screen.getByLabelText('Email') as HTMLInputElement).value).toBe('john@example.com')
      expect((screen.getByLabelText('Bio') as HTMLTextAreaElement).value).toBe('Software engineer')
    })

    it('leaves fields empty when localStorage has no saved profile', () => {
      render(<Profile />)
      expect((screen.getByLabelText('Name') as HTMLInputElement).value).toBe('')
      expect((screen.getByLabelText('Email') as HTMLInputElement).value).toBe('')
      expect((screen.getByLabelText('Bio') as HTMLTextAreaElement).value).toBe('')
    })

    it('populates form with partial profile data if available', async () => {
      const savedProfile = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        bio: '',
      }
      localStorage.setItem('profile', JSON.stringify(savedProfile))
      render(<Profile />)
      expect((screen.getByLabelText('Name') as HTMLInputElement).value).toBe('Jane Smith')
      expect((screen.getByLabelText('Email') as HTMLInputElement).value).toBe('jane@example.com')
      expect((screen.getByLabelText('Bio') as HTMLTextAreaElement).value).toBe('')
    })
  })

  describe('Complete User Flow', () => {
    it('allows user to save, navigate away, and see repopulated form', async () => {
      const user = userEvent.setup()
      const { unmount } = render(<Profile />)
      // Fill and save the form
      await user.type(screen.getByLabelText('Name'), 'John Doe')
      await user.type(screen.getByLabelText('Email'), 'john@example.com')
      await user.type(screen.getByLabelText('Bio'), 'Test bio')
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      // Verify data was saved
      expect(localStorage.getItem('profile')).toBeTruthy()
      // Unmount the component (simulate navigation away)
      unmount()
      // Remount the component (simulate returning to the page)
      render(<Profile />)
      // Verify form is repopulated
      expect((screen.getByLabelText('Name') as HTMLInputElement).value).toBe('John Doe')
      expect((screen.getByLabelText('Email') as HTMLInputElement).value).toBe('john@example.com')
      expect((screen.getByLabelText('Bio') as HTMLTextAreaElement).value).toBe('Test bio')
    })

    it('allows user to edit previously saved profile and save again', async () => {
      const user = userEvent.setup()
      const initialProfile = {
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'Initial bio',
      }
      localStorage.setItem('profile', JSON.stringify(initialProfile))
      render(<Profile />)
      // Verify initial data is loaded
      expect((screen.getByLabelText('Name') as HTMLInputElement).value).toBe('John Doe')
      // Edit the form
      const nameInput = screen.getByLabelText('Name') as HTMLInputElement
      const bioTextarea = screen.getByLabelText('Bio') as HTMLTextAreaElement
      await user.clear(nameInput)
      await user.type(nameInput, 'Jane Smith')
      await user.clear(bioTextarea)
      await user.type(bioTextarea, 'Updated bio')
      // Save the changes
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      // Verify updated data was saved
      const stored = localStorage.getItem('profile')
      expect(stored).toBeTruthy()
      const parsed = JSON.parse(stored!)
      expect(parsed.name).toBe('Jane Smith')
      expect(parsed.email).toBe('john@example.com')
      expect(parsed.bio).toBe('Updated bio')
    })
  })

  describe('Edge Cases', () => {
    it('handles profile with special characters and unicode', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      await user.type(screen.getByLabelText('Name'), 'José García-López')
      await user.type(screen.getByLabelText('Email'), 'jose@example.com')
      await user.type(screen.getByLabelText('Bio'), '🚀 Developer & Designer')
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      const stored = localStorage.getItem('profile')
      expect(stored).toBeTruthy()
      const parsed = JSON.parse(stored!)
      expect(parsed.name).toBe('José García-López')
      expect(parsed.bio).toBe('🚀 Developer & Designer')
    })

    it('handles profile with newlines in bio', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      await user.type(screen.getByLabelText('Name'), 'John Doe')
      await user.type(screen.getByLabelText('Email'), 'john@example.com')
      await user.type(screen.getByLabelText('Bio'), 'Line 1{Enter}Line 2{Enter}Line 3')
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      const stored = localStorage.getItem('profile')
      expect(stored).toBeTruthy()
      const parsed = JSON.parse(stored!)
      expect(parsed.bio).toContain('Line 1')
      expect(parsed.bio).toContain('Line 2')
    })

    it('allows very long names and emails', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      const longName = 'A'.repeat(100)
      const longEmail = `${'a'.repeat(50)}@${'b'.repeat(30)}.com`
      await user.type(screen.getByLabelText('Name'), longName)
      await user.type(screen.getByLabelText('Email'), longEmail)
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      const stored = localStorage.getItem('profile')
      expect(stored).toBeTruthy()
      const parsed = JSON.parse(stored!)
      expect(parsed.name).toBe(longName)
      expect(parsed.email).toBe(longEmail)
    })

    it('accepts email with plus addressing', async () => {
      const user = userEvent.setup()
      render(<Profile />)
      await user.type(screen.getByLabelText('Name'), 'John Doe')
      await user.type(screen.getByLabelText('Email'), 'john+test@example.com')
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument()
    })
  })
})
