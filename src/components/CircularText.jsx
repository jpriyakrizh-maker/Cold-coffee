
export default function CircularText({ text, children }) {
  return (
    <div className="ring">
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path
            id="cp"
            d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
          />
        </defs>

        <text>
          <textPath
            href="#cp"
            textLength="484"
            lengthAdjust="spacing"
          >
            {text}
          </textPath>
        </text>
      </svg>

      <span>{children}</span>
    </div>
  );
}
