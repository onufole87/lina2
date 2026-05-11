/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App — landing page', () => {
  it('sets document title to lina2', () => {
    render(<App />)
    expect(document.title).toContain('lina2')
  })

  it('renders lina2 as the primary heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('lina2')
  })

  it('renders a description paragraph', () => {
    render(<App />)
    expect(
      screen.getByText(/The product domain is being finalised/i),
    ).toBeInTheDocument()
  })

  it('renders a Login button', () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /login/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'button')
  })

  it('Login button click does not throw or navigate', async () => {
    const user = userEvent.setup()
    render(<App />)
    const button = screen.getByRole('button', { name: /login/i })
    await user.click(button)
  })

  it('renders a Profile link', () => {
    render(<App />)
    const profileLink = screen.getByRole('link', { name: /profile/i })
    expect(profileLink).toBeInTheDocument()
    expect(profileLink).toHaveAttribute('href', '/profile')
  })

  it('navigates to profile page when profile link is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    const profileLink = screen.getByRole('link', { name: /profile/i })
    await user.click(profileLink)
    expect(screen.getByRole('heading', { level: 1, name: /^Profile$/ })).toBeInTheDocument()
  })
})
