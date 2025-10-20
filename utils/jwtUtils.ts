function validateJWT(token: string): boolean {
  try {
    const [, payloadBase64] = token.split('.')
    if (!payloadBase64) return false

    const payloadJson = atob(
      payloadBase64.replace(/-/g, '+').replace(/_/g, '/')
    )
    const payload = JSON.parse(payloadJson)

    if (!payload.exp) return false

    const currentTime = Math.floor(Date.now() / 1000)
    return currentTime < payload.exp
  } catch {
    return false
  }
}

export { validateJWT }
