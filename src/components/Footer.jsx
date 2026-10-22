
import { NAME, FACTS } from '../data';
import CircularText from './CircularText';

export default function Footer() {
  return (
    <footer id="visit">
      <div className="strip" aria-hidden="true">
        <div>
          {[0, 1].map((k) => (
            <span key={k}>
              {FACTS.map((f) => (
                <em key={f}>{f}</em>
              ))}
            </span>
          ))}
        </div>
      </div>

      <h2 className="mark" aria-label={NAME}>
        {NAME}
      </h2>

      <div className="fgrid">
        <div>
          <h4>Roastery</h4>
          <p>The Brewed &amp; Co. counter</p>
          <p>Theni, Tamil Nadu</p>
        </div>

        <div>
          <h4>Open hours</h4>
          <p>Every day, 8 am to 10 pm</p>
          <p>Cold brew sells out by 6 pm</p>
        </div>

        <div>
          <h4>Since</h4>
          <p>2024, one counter</p>
          <p>Roasted and poured daily</p>
        </div>

        <CircularText text="Cold brew · Mocha frappe · Filter kaapi · Cappuccino · ">
          🧋
        </CircularText>
      </div>

      <div className="fbase">
        <p>
          © {new Date().getFullYear()} {NAME}
        </p>

        <nav>
          <a href="#">Thankyou-Visit Again🤝</a>
        </nav>
      </div>
    </footer>
  );
}
