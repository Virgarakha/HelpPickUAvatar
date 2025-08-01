import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AvatarGenerator from './components/AvatarGenerator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AvatarGenerator/>
    </>
  )
}

export default App
