export interface ProfileData {
  name: string
  email: string
  bio: string
}

export interface Settings {
  theme: 'light' | 'dark'
  language: string
}

const PROFILE_STORAGE_KEY = 'profile'
const SETTINGS_STORAGE_KEY = 'settings'

export function getProfile(): ProfileData | null {
  try {
    const data = localStorage.getItem(PROFILE_STORAGE_KEY)
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
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage is full or access denied, fail silently
  }
}

export function getSettings(): Settings | null {
  try {
    const data = localStorage.getItem(SETTINGS_STORAGE_KEY)
    if (!data) {
      return null
    }
    const parsed = JSON.parse(data)
    // Validate the structure
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      (parsed.theme === 'light' || parsed.theme === 'dark') &&
      typeof parsed.language === 'string'
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

export function setSettings(data: Settings): void {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage is full or access denied, fail silently
  }
}
