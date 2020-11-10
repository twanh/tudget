/**
 * Check if an email adresss is valid
 * Source: https://ui.dev/validate-email-address-javascript/
 * @param  {string} email The emailadress to check
 * @returns boolean
 */
export function emailIsValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
