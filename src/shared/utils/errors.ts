export const DEFAULT_FALLBACK_MESSAGE = 'Произошла ошибка'
export const DEFAULT_FALLBACK_MESSAGE_DOC = 'Ошибка при получении документов'

export function getErrorMessage(err: any, fallbackMessage = 'Произошла ошибка'): string {
  const serverData = err?.response?.data
  if (serverData) {
    if (typeof serverData === 'string') return serverData
    if (serverData.message) return serverData.message
    return JSON.stringify(serverData)
  }

  if (err?.message) return err.message

  return fallbackMessage
}
