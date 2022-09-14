import React from 'react'
import googleIcon from '../img/googleIcon.svg'
import facebookIcon from '../img/facebookIcon.svg'

import { auth } from '../firebase'
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'

const googleSignIn = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
}

const facebookSignIn = () => {
  const provider = new FacebookAuthProvider()
  signInWithPopup(auth, provider)
}

const SignIn = () => {
  return (
    <div className='flex justify-center gap-2'>
      <button
        className='bg-white  my-4 p-1 rounded-full  w-10  hover:scale-110'
        onClick={googleSignIn}>
        <img src={googleIcon} alt='google' />
      </button>
      <button
        onClick={facebookSignIn}
        className='hover:scale-110'>
        <img src={facebookIcon} alt='facebook' />
      </button>
    </div>
  )
}

export default SignIn
