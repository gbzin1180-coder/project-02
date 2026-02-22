import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import QRCode from 'qrcode'

export default function PaymentModal({ open, onClose }) {
  const router = useRouter()
  const [pix, setPix] = useState(null)
  const [qrImg, setQrImg] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copySuccess, setCopySuccess] = useState(false)
  const [paymentId, setPaymentId] = useState(null)
  const textRef = useRef(null)
  const pollingRef = useRef(null)

  // Fetch pagamento - otimizado com timeout
  useEffect(() => {
    if (!open) return
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

    setLoading(true)
    setError(null)
    setPix(null)
    setQrImg(null)
    setPaymentId(null)
    
    fetch('/api/create-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 1490 }),
      signal: controller.signal
    })
      .then(r => {
        if (!r.ok) throw new Error(`API error: ${r.status}`)
        return r.json()
      })
      .then(data => {
        const pixData = data?.pix || data?.data?.pix || data
        if (!pixData?.qrcode) {
          throw new Error('QR Code não recebido')
        }
        setPix(pixData)
        setPaymentId(pixData?.id || data?.id || null)
        
        // Gerar QR Code - agora síncrono e rápido
        QRCode.toDataURL(pixData.qrcode, { 
          margin: 1, 
          scale: 6,
          width: 260 
        }).then(url => {
          setQrImg(url)
        }).catch(err => {
          console.error('QR generation error:', err)
          setError('Erro ao gerar QR Code')
        })
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error('API error:', err)
          setError(err.message || 'Erro ao criar pagamento. Tente novamente.')
        }
      })
      .finally(() => {
        clearTimeout(timeoutId)
        setLoading(false)
      })

    return () => {
      controller.abort()
      clearTimeout(timeoutId)
    }
  }, [open])

  // Polling otimizado - mais rápido inicialmente
  useEffect(() => {
    if (!paymentId || !open) return

    if (pollingRef.current) clearInterval(pollingRef.current)

    let pollCount = 0
    const controller = new AbortController()
    
    const poll = async () => {
      try {
        const res = await fetch('/api/check-payment-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId }),
          signal: controller.signal
        })
        const data = await res.json()

        if (data.status === 'paid' || (data.paidAmount && data.paidAmount > 0)) {
          clearInterval(pollingRef.current)
          onClose()
          router.push('/obrigado')
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Poll error:', err)
        }
      }
    }

    // Primeira verificação em 1s
    const initialTimeout = setTimeout(poll, 1000)
    
    // Depois a cada 3s
    pollingRef.current = setInterval(poll, 3000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(pollingRef.current)
      controller.abort()
    }
  }, [paymentId, open, onClose, router])

  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current)
    }
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = 'auto' }
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [open, onClose])

  if (!open) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px'
    }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: 'var(--card)',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '12px',
            top: '8px',
            background: 'none',
            border: 'none',
            fontSize: '32px',
            cursor: 'pointer',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          ×
        </button>

        <img 
          src="https://i.imgur.com/GhHgSnk.jpeg" 
          alt="Livro"
          loading="eager"
          style={{ width: '100%', display: 'block', objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
        />

        <div style={{ padding: '28px 24px', textAlign: 'center' }}>
          <h3 style={{ 
            margin: '0 0 8px 0', 
            fontSize: '22px',
            fontWeight: 'bold',
            color: 'var(--text)'
          }}>
            Meu Grande Amor, Angélica
          </h3>
          
          <div style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: 'var(--cta)',
            margin: '0 0 20px 0'
          }}>
            R$ 14,90
          </div>
          
          <p style={{ 
            fontStyle: 'italic', 
            color: 'var(--muted)',
            margin: '0 0 24px 0',
            fontSize: '15px',
            lineHeight: '1.5'
          }}>
            Ao comprar você ajuda a espalhar essa história. Obrigado pela sua confiança.
          </p>

          {loading && (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{
                display: 'inline-block',
                width: '40px',
                height: '40px',
                border: '3px solid #f3f3f3',
                borderTop: '3px solid var(--cta)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '12px' }}>Preparando pagamento...</p>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}

          {error && (
            <p style={{ color: '#d32f2f', fontSize: '14px', margin: '12px 0' }}>
              ❌ {error}
            </p>
          )}

          {!loading && pix && (
            <div>
              {qrImg && (
                <div style={{ margin: '12px 0 28px 0', display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={qrImg}
                    alt="QR PIX"
                    style={{ 
                      width: '100%',
                      maxWidth: '260px', 
                      display: 'block',
                      borderRadius: '8px',
                      border: '2px solid var(--cta)',
                      padding: '8px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              )}

              <div style={{ 
                background: '#f5f5f5',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '16px'
              }}>
                <p style={{ 
                  margin: '0 0 8px 0',
                  fontSize: '12px',
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Copie e cole:
                </p>
                
                <textarea
                  ref={textRef}
                  readOnly
                  value={pix.qrcodeText || pix.qrcode || ''}
                  style={{
                    width: '100%',
                    height: '90px',
                    padding: '12px',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    resize: 'none',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    marginBottom: '12px',
                    background: 'white'
                  }}
                />

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button
                    onClick={() => {
                      const text = pix.qrcodeText || pix.qrcode || ''
                      if (navigator.clipboard?.writeText) {
                        navigator.clipboard.writeText(text)
                      } else if (textRef.current) {
                        textRef.current.select()
                        document.execCommand('copy')
                      }
                      setCopySuccess(true)
                      setTimeout(() => setCopySuccess(false), 2000)
                    }}
                    style={{
                      flex: 1,
                      background: 'var(--cta)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 16px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '15px'
                    }}
                  >
                    {copySuccess ? '✓ Copiado!' : 'Copiar PIX'}
                  </button>
                </div>
              </div>

              <p style={{
                color: 'var(--muted)',
                fontSize: '13px',
                margin: '0',
                lineHeight: '1.5'
              }}>
                Após o pagamento, você poderá receber o comprovante. Obrigado pelo apoio!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
