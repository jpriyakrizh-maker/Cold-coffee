
export default function BlurText({ lines }) {
  let k = 0;

  const words = (t) =>
    t.split(' ').map((w) => (
      <span
        key={w + k}
        className="bw"
        style={{
          animationDelay: `${0.1 + k++ * 0.1}s`,
        }}
      >
        {w}{' '}
      </span>
    ));

  return (
    <h1>
      {words(lines[0])}
      <br />
      <em>{words(lines[1])}</em>
    </h1>
  );
}
