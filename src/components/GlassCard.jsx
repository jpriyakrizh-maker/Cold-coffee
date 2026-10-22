
export default function GlassCard({
  className = '',
  tilt = true,
  children,
}) {
  const move = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    el.style.setProperty('--mx', x + 'px');
    el.style.setProperty('--my', y + 'px');

    if (tilt) {
      el.style.setProperty(
        '--ry',
        (x / r.width - 0.5) * 14 + 'deg'
      );

      el.style.setProperty(
        '--rx',
        -(y / r.height - 0.5) * 14 + 'deg'
      );
    }
  };

  const leave = (e) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  };

  return (
    <article
      className={'glass ' + className}
      onMouseMove={move}
      onMouseLeave={leave}
    >
      {tilt && (
        <i
          className="neon"
          aria-hidden="true"
        />
      )}

      {children}
    </article>
  );
}
