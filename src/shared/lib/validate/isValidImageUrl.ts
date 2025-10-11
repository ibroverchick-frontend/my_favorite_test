export function isValidImageUrl(
  url?: string,
  allowedExt: string[] = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg']
): boolean {
  if (!url) return false

  try {
    const parsed = new URL(url)
    if (!['http:', 'https:'].includes(parsed.protocol)) return false

    const ext = parsed.pathname.split('.').pop()?.toLowerCase()
    return !!ext && allowedExt.includes(ext)
  } catch {
    return false
  }
}
