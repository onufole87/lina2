import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Profile from './Profile'

describe('Profile component', () => {
  it('renders the profile page heading', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )
    expect(screen.getByRole('heading', { level: 1, name: /^Profile$/ })).toBeInTheDocument()
  })

  it('renders profile information section', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )
    expect(screen.getByText(/profile information/i)).toBeInTheDocument()
  })

  it('renders settings section', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )
    expect(screen.getByText(/settings/i)).toBeInTheDocument()
  })

  it('renders without errors', () => {
    const { container } = render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )
    expect(container).toBeInTheDocument()
  })

  it('renders all three form fields with correct labels', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Bio')).toBeInTheDocument()
  })

  it('allows user to type into the name field', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )
    const nameInput = screen.getByLabelText('Name') as HTMLInputElement
    await user.type(nameInput, 'John Doe')
    expect(nameInput.value).toBe('John Doe')
  })

  it('allows user to type into the email field', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement
    await user.type(emailInput, 'john@example.com')
    expect(emailInput.value).toBe('john@example.com')
  })

  it('allows user to type into the bio field', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )
    const bioTextarea = screen.getByLabelText('Bio') as HTMLTextAreaElement
    await user.type(bioTextarea, 'This is my bio')
    expect(bioTextarea.value).toBe('This is my bio')
  })

  it('renders a Save button', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
  })

  // Validation tests
  describe('Validation', () => {
    it('shows name validation error when submitted empty', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      )
      const saveButton = screen.getByRole('button', { name: /save/i })
      await user.click(saveButton)
      await expect(screen.findByText('Name is required')).resolves.toBeInTheDocument()
    })

    it('shows email validation error when submitted empty', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      )
      const saveButton = screen.getByRole('button', { name: /save/i })
      await user.click(saveButton)
      await expect(screen.findByText('Email is required')).resolves.toBeInTheDocument()
    })

    it('shows email format validation error for invalid email', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      )
      const emailInput = screen.getByLabelText('Email')
      await user.type(emailInput, 'invalid-email')
      const saveButton = screen.getByRole('button', { name: /save/i })
      await user.click(saveButton)
      await expect(screen.findByText('Please enter a valid email address')).resolves.toBeInTheDocument()
    })

    it('does not show error for empty bio field', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      )
      const nameInput = screen.getByLabelText('Name')
      const emailInput = screen.getByLabelText('Email')
      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      const saveButton = screen.getByRole('button', { name: /save/i })
      await user.click(saveButton)
      // Bio field has no error message for empty value
      expect(screen.queryByText(/bio.*required/i)).not.toBeInTheDocument()
    })

    it('blocks form submission when name is empty', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      )
      const emailInput = screen.getByLabelText('Email')
      await user.type(emailInput, 'john@example.com')
      const saveButton = screen.getByRole('button', { name: /save/i })
      await user.click(saveButton)
      await expect(screen.findByText('Name is required')).resolves.toBeInTheDocument()
    })

    it('blocks form submission when email is empty', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      )
      const nameInput = screen.getByLabelText('Name')
      await user.type(nameInput, 'John Doe')
      const saveButton = screen.getByRole('button', { name: /save/i })
      await user.click(saveButton)
      await expect(screen.findByText('Email is required')).resolves.toBeInTheDocument()
    })

    it('blocks form submission when email format is invalid', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      )
      const nameInput = screen.getByLabelText('Name')
      const emailInput = screen.getByLabelText('Email')
      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'not-an-email')
      const saveButton = screen.getByRole('button', { name: /save/i })
      await user.click(saveButton)
      await expect(screen.findByText('Please enter a valid email address')).resolves.toBeInTheDocument()
    })

    it('allows form submission when name and email are valid, even with empty bio', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      )
      const nameInput = screen.getByLabelText('Name')
      const emailInput = screen.getByLabelText('Email')
      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      const saveButton = screen.getByRole('button', { name: /save/i })
      await user.click(saveButton)
      // No error messages should appear
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument()
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument()
      expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument()
    })

    it('clears name error when user starts typing', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      )
      const saveButton = screen.getByRole('button', { name: /save/i })
      await user.click(saveButton)
      await expect(screen.findByText('Name is required')).resolves.toBeInTheDocument()
      const nameInput = screen.getByLabelText('Name')
      await user.type(nameInput, 'J')
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument()
    })

    it('clears email error when user starts typing', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      )
      const saveButton = screen.getByRole('button', { name: /save/i })
      await user.click(saveButton)
      await expect(screen.findByText('Email is required')).resolves.toBeInTheDocument()
      const emailInput = screen.getByLabelText('Email')
      await user.type(emailInput, 'j')
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument()
    })
  })
})
