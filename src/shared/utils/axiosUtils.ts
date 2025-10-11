export function isRequestCanceled(err: any): boolean {
  return err?.code === 'ERR_CANCELED' || err?.name === 'CanceledError'
}