import { useState } from 'react'
import PaymentModal from '../components/PaymentModal'

export default function Home() {
  const [open, setOpen] = useState(false)

  return (
    <>
    <main className="wrap">
      <section className="hero">
        <img src="https://i.imgur.com/GhHgSnk.jpeg" alt="Casal juntos sorrindo" />
        <div className="hero-content">
          <h1>Meu Grande Amor, Angélica</h1>
          <p className="subtitle">Uma história real de amor, escolhas e construção diária.</p>

            <button className="cta" onClick={() => setOpen(true)}>
              Comprar agora
            </button>
        </div>
      </section>

      <section className="section">
        <h2>Sobre o livro</h2>
        <p>Este livro não foi escrito para impressionar.<br />Foi escrito para ser sentido.</p>

        <div className="quote">
          <p>
            Luto todos os dias com a falta da minha esposa, Angélica, e sinto sua presença
            em cada lembrança, em cada gesto e em cada canto da minha vida.
          </p>
        </div>
      </section>

      <section className="section">
        <h2>As últimas viagens</h2>
        <div className="grid">
          <div className="img-card"><img src="https://i.imgur.com/xEez8PH.jpeg" alt=""/></div>
          <div className="img-card"><img src="https://i.imgur.com/YZH6M1f.jpeg" alt=""/></div>
          <div className="img-card"><img src="https://i.imgur.com/9kWeVVz.jpeg" alt=""/></div>
        </div>
      </section>

      <section className="section footer-cta">
        <h2>Uma história que pode tocar você</h2>
        <p>Talvez você se reconheça.<br />Talvez apenas sinta.<br />E isso já é suficiente.</p>

          <button className="cta" onClick={() => setOpen(true)}>
            Comprar agora
          </button>
      </section>

    </main>
    <PaymentModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
