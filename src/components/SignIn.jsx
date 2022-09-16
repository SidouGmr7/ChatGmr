import React from 'react'
import googleIcon from '../img/googleIcon.svg'
import facebookIcon from '../img/facebookIcon.svg'
import { useNavigate } from 'react-router-dom'
import { facebookSignIn, googleSignIn } from '../firebase/Auth'

const SignIn = () => {
  const navigate = useNavigate()

  const SignInWithGoogle = () => {
    googleSignIn()
    navigate('/admin')
  }

  return (
    <div className='flex justify-center gap-2'>
      <button
        className='bg-white  my-4 p-1 rounded-full w-10 hover:scale-110'
        onClick={SignInWithGoogle}>
        <img src={googleIcon} alt='google' />
      </button>
      <button onClick={facebookSignIn} className='hover:scale-110'>
        <img src={facebookIcon} alt='facebook' />
      </button>
    </div>
  )
}

export default SignIn
