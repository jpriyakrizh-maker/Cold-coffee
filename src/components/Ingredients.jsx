import { INGR } from '../data'
import GlassCard from './GlassCard'

export default function Ingredients() {
  return (
    <section id="ingredients" className="sec">
      <h2>What goes in the glass</h2>
      <p className="sub">Four ingredients. Nothing hidden.</p>

      <div className="grid">
        {INGR.map(([icon, name, text]) => (
          <GlassCard key={name}>
            <span className="ic">{icon}</span>
            <h3>{name}</h3>
            <p>{text}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  )
}
