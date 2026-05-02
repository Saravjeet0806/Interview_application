import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import React from 'react'
import toast from 'react-hot-toast'

const Homepage = () => {
  return (
    <div>
      <button className='btn btn-primary' onClick={() => { toast.success("Sucessfull") }}>Click me</button>

      <SignedOut>
        <SignInButton mode="modal">
          <button className='btn btn-secondary'>Sign In</button>
        </SignInButton>
      </SignedOut >

      <SignedIn>
        <SignOutButton>
          <button className='btn btn-secondary'>Sign Out</button>
        </SignOutButton>
      </SignedIn>
      <UserButton />

    </div>
  )
}

export default Homepage