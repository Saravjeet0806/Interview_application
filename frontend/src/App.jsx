import { useState } from 'react'
import './App.css'
import { SignInButton, SignOutButton } from '@clerk/clerk-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Welcome to react</h1>
      <SignOutButton>
        <SignInButton mode='modal'>
          <button className=''>Sign up Please</button>
        </SignInButton>
      </SignOutButton>
    </>
  )
}

export default App