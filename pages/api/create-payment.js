import sdkDefault from '@api/ghostspay'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { amount = 1490 } = req.body || {}

  try {
    // Support SDK exported either as a factory function or as an instance
    const sdk = (typeof sdkDefault === 'function') ? sdkDefault() : sdkDefault
    if (!process.env.GHOSTSPAY_API_KEY) {
      return res.status(500).json({ error: 'GHOSTSPAY_API_KEY is not set on the server environment' })
    }
    if (process.env.GHOSTSPAY_BASE_URL) sdk.server(process.env.GHOSTSPAY_BASE_URL)
    sdk.auth(process.env.GHOSTSPAY_API_KEY)

    const body = {
      customer: {
        name: 'Cliente',
        email: 'cliente@exemplo.com',
        phone: '11999999999',
        document: { number: '00000000000', type: 'CPF' }
      },
      paymentMethod: 'PIX',
      amount: amount,
      items: [ { title: 'Meu Grande Amor - eBook', unitPrice: amount, quantity: 1 } ],
      pix: { expiresInDays: 1 }
    }

    const result = await sdk.postTransactions(body)
    console.log('create-payment result raw:', result)

    // The SDK may return different shapes depending on the client; normalize:
    const payload = result && (result.pix || result.data || result.body) ? (result.pix ? result : (result.data || result.body || result)) : result

    // If pix is nested, extract it
    const pix = payload.pix || (payload.data && payload.data.pix) || (payload.body && payload.body.pix) || null

    if (pix) {
      return res.status(201).json({ pix })
    }

    // If no pix, return the whole payload for inspection
    return res.status(201).json(payload)
  } catch (err) {
    console.error('create-payment error', err)
    // If the SDK returns a FetchError with status, forward a clearer message
    const status = err && err.status ? err.status : 500
    if (status === 401) {
      return res.status(401).json({ error: 'Unauthorized: check GHOSTSPAY_API_KEY and permissions' })
    }
    const message = err && err.message ? err.message : 'Erro ao criar pagamento'
    return res.status(status).json({ error: message })
  }
}
