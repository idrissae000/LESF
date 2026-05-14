/** Strip HTML tags and trim whitespace from any string input. */
export function sanitize(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value.replace(/<[^>]*>/g, '').trim()
}
