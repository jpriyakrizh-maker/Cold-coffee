import { VARIETIES } from '../data'
import GlassCard from './GlassCard'

export default function Varieties({ onAdd }) {
  return (
    <section id="varieties" className="sec">
      <h2>Our varieties</h2>
      <p className="sub">Pick one and we pour it fresh.</p>

      <div className="grid">
        {VARIETIES.map(([name, price, emoji, img]) => (
          <GlassCard key={name} className="var">
            <div className="slot">
              <span className="zm">{emoji}</span>
              <img
src={`${import.meta.env.BASE_URL}varieties/${img}`}
                alt={name}
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
            <h3>{name}</h3>
            <p className="pr">₹{price} · regular</p>
            <button className="cart" onClick={() => onAdd(name)}>
              Add to cart
            </button>
          </GlassCard>
        ))}
      </div>
    </section>
  )
}