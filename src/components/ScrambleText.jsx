import { useEffect, useRef, useState } from 'react'

const abc = 'abcdefghijklmnopqrstuvwxyz'

// ReactBits-style scramble: letters shuffle, then settle left to right on hover
export default function ScrambleText({ text }) {
  const [s, setS] = useState(text)
  const t = useRef()

  const go = () => {
    let i = 0
    clearInterval(t.current)

    t.current = setInterval(() => {
      setS(
        [...text]
          .map((c, k) => (k < i || c === ' ' ? c : abc[Math.random() * 26 | 0]))
          .join(''),
      )

      if (++i > text.length) {
        clearInterval(t.current)
        setS(text)
      }
    }, 35)
  }

  useEffect(() => () => clearInterval(t.current), [])

  return <span onMouseEnter={go}>{s}</span>
}
