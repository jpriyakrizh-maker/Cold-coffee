import { useRef, useState } from 'react'
import Loader from './components/Loader'
import Toast from './components/Toast'
import Header from './components/Header'
import Hero from './components/Hero'
import Ingredients from './components/Ingredients'
import Varieties from './components/Varieties'
import OrderForm from './components/OrderForm'
import Footer from './components/Footer'

export default function App() {
  const [count, setCount] = useState(0)
  const [coffee, setCoffee] = useState('')
  const [toast, setToast] = useState('')
  const [load, setLoad] = useState(0)
  const timer = useRef()

  const say = (message) => {
    setToast(message)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(''), 2200)
  }

  const add = (name) => {
    setCoffee(name)
    setCount((currentCount) => currentCount + 1)
    say(`${name} added to your order`)
  }

  return (
    <>
      <Loader progress={load} />
      <Toast text={toast} />
      <Header count={count} />
      <Hero onProgress={setLoad} />
      <Ingredients />
      <Varieties onAdd={add} />
      <OrderForm
        coffee={coffee}
        setCoffee={setCoffee}
        say={say}
        onPlaced={() => setCount((currentCount) => currentCount + 1)}
      />
      <Footer />
    </>
  )
}
