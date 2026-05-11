'use client'

import { useState } from 'react'
import { validateProfileForm } from '../utils/validation'
import type { ValidationError } from '../utils/validation'
import { getProfile, setProfile } from '../utils/storage'

export default function Profile() {
  const [name, setName] = useState(() => getProfile()?.name ?? '')
  const [email, setEmail] = useState(() => getProfile()?.email ?? '')
  const [bio, setBio] = useState(() => getProfile()?.bio ?? '')
  const [errors, setErrors] = useState<ValidationError>({})

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    // Clear error when user starts typing
    if (errors.name) {
      const newErrors = { ...errors }
      delete newErrors.name
      setErrors(newErrors)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    // Clear error when user starts typing
    if (errors.email) {
      const newErrors = { ...errors }
      delete newErrors.email
      setErrors(newErrors)
    }
  }

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value)
  }

  const handleSave = (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault()
    }
    const validationErrors = validateProfileForm(name, email, bio)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, save to localStorage
      setProfile({ name, email, bio })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Profile
        </h1>

        {/* Profile Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Profile Information
          </h2>
          <p className="mt-2 text-gray-600">
            Manage your personal information below.
          </p>

          <form className="mt-6 space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={handleNameChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Bio Field */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-900">
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={handleBioChange}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Save Button */}
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
          </form>
        </section>

        {/* Settings Section */}
        <section className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
          <p className="mt-2 text-gray-600">
            Customize your preferences.
          </p>
          {/* Theme and language selectors will be added in Story 2 */}
        </section>
      </div>
    </div>
  )
}
