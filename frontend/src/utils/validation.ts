export interface ValidationError {
  [key: string]: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateName(name: string): string | undefined {
  if (!name || name.trim() === '') {
    return 'Name is required'
  }
  return undefined
}

export function validateEmail(email: string): string | undefined {
  if (!email || email.trim() === '') {
    return 'Email is required'
  }
  if (!EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address'
  }
  return undefined
}

export function validateBio(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _bio: string
): string | undefined {
  // Bio is optional, no validation needed
  return undefined
}

export function validateProfileForm(
  name: string,
  email: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _bio: string
): ValidationError {
  const errors: ValidationError = {}

  const nameError = validateName(name)
  if (nameError) {
    errors.name = nameError
  }

  const emailError = validateEmail(email)
  if (emailError) {
    errors.email = emailError
  }

  // Bio has no validation requirements

  return errors
}
