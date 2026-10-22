import { useEffect, useRef, useState } from 'react';
import pal from '../palette.json';
import { STEPS } from '../data';
import BlurText from './BlurText';

const N = pal.length;

const src = (i) =>
  `${import.meta.env.BASE_URL}frames/f${String(i + 1).padStart(3, '0')}.webp`;

const stepAt = (q) =>
  q < 0.25 ? 0 : q < 0.5 ? 1 : q < 0.75 ? 2 : 3;

export default function Hero({ onProgress }) {
  const track = useRef();
  const cvs = useRef();
  const imgs = useRef([]);

  const [step, setStep] = useState(0);

  // Frames load in the background. The page opens after the first few.
  useEffect(() => {
    const READY = 3; // page opens once this many frames are in
    const POOL = 8;  // frames loading at the same time
    let next = 0;
    let ready = 0;
    imgs.current = new Array(N);

    const pump = () => {
      if (next >= N) return;
      const i = next++;
      const im = new Image();

      im.onload = im.onerror = () => {
        if (i < READY) onProgress(++ready / READY);
        dispatchEvent(new Event('scroll'));
        pump();
      };

      im.src = src(i);
      imgs.current[i] = im;
    };

    for (let k = 0; k < POOL; k++) pump();
  }, []);

  useEffect(() => {
    let raf;

    const draw = () => {
      const r = track.current.getBoundingClientRect();

      const q = Math.min(
        1,
        Math.max(0, -r.top / (r.height - innerHeight))
      );

      const f = q * (N - 1);
      const i = Math.floor(f);
      const j = Math.min(N - 1, i + 1);
      const t = f - i;

      const avg = pal[i].map(
        (v, k) => v + (pal[j][k] - v) * t
      );

      document.documentElement.style.setProperty(
        '--bg',
        avg.map((v) => Math.round(v * 0.62)).join(',')
      );

      // If this frame is not loaded yet, show the last loaded one before it
      let k = Math.round(f);
      let im = imgs.current[k];
      while (k > 0 && !(im && im.complete && im.naturalWidth)) {
        k--;
        im = imgs.current[k];
      }

      const c = cvs.current;

      if (im && im.complete && im.naturalWidth) {
        if (c.width !== im.naturalWidth) {
          c.width = im.naturalWidth;
          c.height = im.naturalHeight;
        }

        c.getContext('2d').drawImage(im, 0, 0);
      }

      setStep(stepAt(q));
    };

    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };

    addEventListener('scroll', on, { passive: true });
    addEventListener('resize', on);

    draw();

    return () => {
      removeEventListener('scroll', on);
      removeEventListener('resize', on);
    };
  }, []);

  const [,, h1, h2, lead] = STEPS[step];

  return (
    <section id="top" className="track" ref={track}>
      <div className="stick">
        <canvas
          ref={cvs}
          width="480"
          height="864"
          aria-label="Coffee being made, frame by frame"
        />

        <div className="left">
          <BlurText key={step} lines={[h1, h2]} />

          <p className="lead">{lead}</p>

          <div className="steps">
            {STEPS.map(([name, desc], i) => (
              <div
                key={name}
                className={
                  'step' +
                  (i === step ? ' act' : '') +
                  (i < step ? ' done' : '')
                }
                style={{ marginLeft: i % 2 ? 14 : 0 }}
              >
                <b>{name}</b>
                <span>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}