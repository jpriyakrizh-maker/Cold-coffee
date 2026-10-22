
import { useState } from 'react';
import { NAME, LINKS } from '../data';

export default function Header({ count }) {
  const [temp, setTemp] = useState('Hot');

  const toOrder = () => {
    document
      .getElementById('build')
      .scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bar">
      <a className="box logo" href="#top">
        {NAME}
      </a>

      <nav className="box nav">
        {LINKS.map(([l, h]) => (
          <a key={h} href={h}>
            {l}
          </a>
        ))}
      </nav>

      <div className="right">
        <div className="box seg">
          {['Hot', 'Iced'].map((t) => (
            <button
              key={t}
              className={t === temp ? 'on' : ''}
              onClick={() => setTemp(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <button
          className="order"
          onClick={toOrder}
          aria-label={`Order, ${count} in your order`}
        >
          <span className="oi">☕</span>
          <span className="ot">Order a coffee</span>
          <span className="oc">{count}</span>
        </button>
      </div>
    </header>
  );
}
