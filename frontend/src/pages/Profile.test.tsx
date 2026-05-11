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

  it('renders name field with correct label', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )
    const nameLabel = screen.getByText('Name')
    const nameInput = screen.getByPlaceholderText('Enter your name')
    expect(nameLabel).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
  })

  it('renders email field with correct label', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )
    const emailLabel = screen.getByText('Email')
    const emailInput = screen.getByPlaceholderText('Enter your email')
    expect(emailLabel).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
  })

  it('renders bio field with correct label', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )
    const bioLabel = screen.getByText('Bio')
    const bioTextarea = screen.getByPlaceholderText('Tell us about yourself')
    expect(bioLabel).toBeInTheDocument()
    expect(bioTextarea).toBeInTheDocument()
  })

  it('renders Save button', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )
    const saveButton = screen.getByRole('button', { name: /save/i })
    expect(saveButton).toBeInTheDocument()
  })

  it('allows user to type into name field', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )
    const nameInput = screen.getByPlaceholderText('Enter your name') as HTMLInputElement
    await user.type(nameInput, 'John Doe')
    expect(nameInput.value).toBe('John Doe')
  })

  it('allows user to type into email field', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )
    const emailInput = screen.getByPlaceholderText('Enter your email') as HTMLInputElement
    await user.type(emailInput, 'john@example.com')
    expect(emailInput.value).toBe('john@example.com')
  })

  it('allows user to type into bio field', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )
    const bioTextarea = screen.getByPlaceholderText('Tell us about yourself') as HTMLTextAreaElement
    await user.type(bioTextarea, 'This is my bio')
    expect(bioTextarea.value).toBe('This is my bio')
  })

  it('renders without errors', () => {
    const { container } = render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )
    expect(container).toBeInTheDocument()
  })
})
