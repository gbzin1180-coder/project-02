import sdkDefault from '@api/ghostspay'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { paymentId } = req.body || {}

  if (!paymentId) return res.status(400).json({ error: 'paymentId required' })

  try {
    const sdk = (typeof sdkDefault === 'function') ? sdkDefault() : sdkDefault
    if (!process.env.GHOSTSPAY_API_KEY) {
      return res.status(500).json({ error: 'GHOSTSPAY_API_KEY is not set' })
    }
    if (process.env.GHOSTSPAY_BASE_URL) sdk.server(process.env.GHOSTSPAY_BASE_URL)
    sdk.auth(process.env.GHOSTSPAY_API_KEY)

    const result = await sdk.getTransaction({ id: paymentId })
    const payload = result?.data || result?.body || result

    if (payload) {
      return res.status(200).json({
        id: payload.id,
        status: payload.status,
        paidAmount: payload.paidAmount,
        amount: payload.amount
      })
    }

    return res.status(404).json({ error: 'Transaction not found' })
  } catch (err) {
    console.error('check-payment-status error', err)
    return res.status(500).json({ error: err.message || 'Error checking status' })
  }
}
