export default function Obrigado() {
  return (
    <main className="wrap">
      <section className="section">
        <h1>Obrigado pela sua compra</h1>
        <p>
          Para receber o produto, por favor entre em contato conosco pelo TikTok:
        </p>
        <p>
          <a href={process.env.NEXT_PUBLIC_TIKTOK_URL} target="_blank" rel="noreferrer">Ver no TikTok</a>
        </p>
        <p>Se houver qualquer problema, responda por lá e retornaremos o mais rápido possível.</p>
      </section>
    </main>
  )
}
