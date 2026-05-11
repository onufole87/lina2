export default function Profile() {
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
          {/* Form fields will be added in next subtask */}
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
