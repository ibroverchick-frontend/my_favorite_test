export function normalizeResponse<T = any>(json: any): T[] {
  if (!json) return []
  if (Array.isArray(json)) return json as T[]
  if (Array.isArray(json.items)) return json.items as T[]
  if (Array.isArray(json.data)) return json.data as T[]
  if (Array.isArray(json.results)) return json.results as T[]
  return []
}