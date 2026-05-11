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
})
