import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Profile from './pages/Profile'

function Landing() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-5xl font-bold tracking-tight">lina2</h1>
      <p className="text-lg text-gray-600">
        The product domain is being finalised. Check back soon.
      </p>
      <button
        type="button"
        className="rounded bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Login
      </button>
      <Link
        to="/profile"
        className="mt-4 text-indigo-600 hover:text-indigo-700 underline"
      >
        Profile
      </Link>
    </main>
  )
}

export default function App() {
  useEffect(() => {
    document.title = 'lina2'
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
