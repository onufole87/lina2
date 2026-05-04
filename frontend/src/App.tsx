import { useEffect } from 'react'

export default function App() {
  useEffect(() => {
    document.title = 'lina2'
  }, [])

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
    </main>
  )
}
