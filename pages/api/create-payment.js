import sdkDefault from '@api/ghostspay'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { amount = 1490 } = req.body || {}

  try {
    // DEBUG: Log environment variables (sem expor a chave completa)
    console.log('[create-payment] Starting...')
    console.log('[create-payment] GHOSTSPAY_API_KEY exists:', !!process.env.GHOSTSPAY_API_KEY)
    console.log('[create-payment] GHOSTSPAY_API_KEY length:', process.env.GHOSTSPAY_API_KEY?.length || 0)
    console.log('[create-payment] GHOSTSPAY_COMPANY_ID:', process.env.GHOSTSPAY_COMPANY_ID)
    
    // Support SDK exported either as a factory function or as an instance
    const sdk = (typeof sdkDefault === 'function') ? sdkDefault() : sdkDefault
    if (!process.env.GHOSTSPAY_API_KEY) {
      console.error('[create-payment] ERROR: GHOSTSPAY_API_KEY is not set')
      return res.status(500).json({ error: 'GHOSTSPAY_API_KEY is not set on the server environment' })
    }
    if (process.env.GHOSTSPAY_BASE_URL) {
      console.log('[create-payment] Setting base URL:', process.env.GHOSTSPAY_BASE_URL)
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

    console.log('[create-payment] Sending request to SDK...')
    const result = await sdk.postTransactions(body)
    console.log('[create-payment] SDK response:', JSON.stringify(result, null, 2))

    // The SDK may return different shapes depending on the client; normalize:
    const payload = result && (result.pix || result.data || result.body) ? (result.pix ? result : (result.data || result.body || result)) : result

    // If pix is nested, extract it
    const pix = payload.pix || (payload.data && payload.data.pix) || (payload.body && payload.body.pix) || null

    if (pix) {
      console.log('[create-payment] Success! Returning PIX data')
      return res.status(201).json({ pix })
    }

    // If no pix, return the whole payload for inspection
    console.log('[create-payment] No PIX in response, returning full payload')
    return res.status(201).json(payload)
  } catch (err) {
    console.error('[create-payment] ERROR:', err)
    console.error('[create-payment] Error message:', err?.message)
    console.error('[create-payment] Error status:', err?.status)
    // If the SDK returns a FetchError with status, forward a clearer message
    const status = err && err.status ? err.status : 500
    if (status === 401) {
      return res.status(401).json({ error: 'Unauthorized: check GHOSTSPAY_API_KEY and permissions' })
    }
    const message = err && err.message ? err.message : 'Erro ao criar pagamento'
    return res.status(status).json({ error: message })
  }
}
