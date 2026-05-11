export interface ProfileData {
  name: string
  email: string
  bio: string
}

const STORAGE_KEY = 'profile'

export function getProfile(): ProfileData | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) {
      return null
    }
    const parsed = JSON.parse(data)
    // Validate the structure
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      typeof parsed.name === 'string' &&
      typeof parsed.email === 'string' &&
      typeof parsed.bio === 'string'
    ) {
      return parsed
    }
    // Invalid structure, return null
    return null
  } catch {
    // JSON parse error or localStorage access error
    return null
  }
}

export function setProfile(data: ProfileData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage is full or access denied, fail silently
  }
}
