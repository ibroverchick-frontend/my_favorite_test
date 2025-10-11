export function abortRequest(controller: AbortController | null): null {
    if (!controller) return null
    try {
        controller.abort()
    } catch {}
    return null
}