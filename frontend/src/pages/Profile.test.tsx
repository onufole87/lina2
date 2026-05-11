import { render, screen } from '@testing-library/react'
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
})
