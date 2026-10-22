import { useState } from 'react'
import { VARIETIES, SIZES, SWEET, ROAST } from '../data'
import GlassCard from './GlassCard'

const PRICE = Object.fromEntries(VARIETIES.map(([name, price]) => [name, price]))

function Opts({ label, items, value, onPick }) {
  return (
    <div>
      <span className="fl">{label}</span>
      <div className="opts">
        {items.map((item) => (
          <button
            type="button"
            key={item}
            className={item === value ? 'on' : ''}
            onClick={() => onPick(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function OrderForm({ coffee, setCoffee, say, onPlaced }) {
  const [f, setF] = useState({
    name: '',
    phone: '',
    size: '',
    sweet: '',
    roast: '',
  })
  const [msg, setMsg] = useState('')

  const set = (key) => (value) => setF((current) => ({ ...current, [key]: value }))
  const total = coffee && f.size ? PRICE[coffee] + SIZES[f.size] : 0

  const place = () => {
    if (!f.name.trim() || f.phone.replace(/\D/g, '').length < 10) {
      return say('Add your name and a 10-digit phone number')
    }

    if (!coffee || !f.size || !f.sweet || !f.roast) {
      return say('Choose your coffee, size, sweetness and roast')
    }

    onPlaced()
    say('Order placed')
    setMsg(
      `Thanks, ${f.name.trim()}! Your ${coffee} (${f.size}, ${f.sweet.toLowerCase()}, ${f.roast.toLowerCase()} roast). Total ₹${total}.`,
    )
  }

  return (
    <section id="build" className="sec">
      <h2>Place your order</h2>
      <p className="sub">Tell us your favourite and we start pouring.</p>
      <GlassCard className="form" tilt={false}>
        <div className="f2">
          <label>
            Your name
            <input
              value={f.name}
              onChange={(event) => set('name')(event.target.value)}
              placeholder="Priya"
            />
          </label>
          <label>
            Phone
            <input
              inputMode="tel"
              value={f.phone}
              onChange={(event) => set('phone')(event.target.value)}
              placeholder="98765 43210"
            />
          </label>
        </div>
        <Opts
          label="Favourite coffee"
          items={VARIETIES.map((variety) => variety[0])}
          value={coffee}
          onPick={setCoffee}
        />
        <div className="f2">
          <Opts
            label="Cup size"
            items={Object.keys(SIZES)}
            value={f.size}
            onPick={set('size')}
          />
          <Opts
            label="Roast"
            items={ROAST}
            value={f.roast}
            onPick={set('roast')}
          />
        </div>
        <Opts
          label="Sweetness"
          items={SWEET}
          value={f.sweet}
          onPick={set('sweet')}
        />
        <label>
          Notes
          <input
            value={f.notes || ''}
            onChange={(event) => set('notes')(event.target.value)}
            placeholder="Less ice, extra foam…"
          />
        </label>
        <div className="bot">
          <div className="tot">
            Total <b>{total ? `₹${total}` : '—'}</b>
          </div>
          <button className="order add" onClick={place}>
            <span className="oi">☕</span>
            <span className="ot">Place order</span>
          </button>
        </div>
        {msg && (
          <p id="res" className="show" role="status">
            {msg}
          </p>
        )}
      </GlassCard>
    </section>
  )
}
