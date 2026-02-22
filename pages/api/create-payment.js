import sdkDefault from '@api/ghostspay'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { amount = 1490 } = req.body || {}

  try {
    const isDev = process.env.NODE_ENV === 'development'
    
    // Support SDK exported either as a factory function or as an instance
    const sdk = (typeof sdkDefault === 'function') ? sdkDefault() : sdkDefault
    if (!process.env.GHOSTSPAY_API_KEY) {
      const msg = 'GHOSTSPAY_API_KEY is not set'
      if (isDev) console.error('[create-payment]', msg)
      return res.status(500).json({ error: msg })
    }
    
    if (process.env.GHOSTSPAY_BASE_URL) {
      sdk.server(process.env.GHOSTSPAY_BASE_URL)
    }
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

    if (isDev) console.log('[create-payment] Sending request...')
    const result = await sdk.postTransactions(body)

    // The SDK may return different shapes depending on the client; normalize:
    const payload = result && (result.pix || result.data || result.body) ? (result.pix ? result : (result.data || result.body || result)) : result

    // If pix is nested, extract it
    const pix = payload.pix || (payload.data && payload.data.pix) || (payload.body && payload.body.pix) || null

    if (pix) {
      if (isDev) console.log('[create-payment] Success')
      return res.status(201).json({ pix })
    }

    return res.status(201).json(payload)
  } catch (err) {
    const isDev = process.env.NODE_ENV === 'development'
    if (isDev) console.error('[create-payment] ERROR:', err?.message)
    
    const status = err?.status || 500
    if (status === 401) {
      return res.status(401).json({ error: 'Unauthorized: check GHOSTSPAY_API_KEY' })
    }
    const message = err?.message || 'Erro ao criar pagamento'
    return res.status(status).json({ error: message })
  }
}
