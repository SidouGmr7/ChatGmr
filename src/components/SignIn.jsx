import React from 'react'
import googleIcon from '../img/googleIcon.svg'
import facebookIcon from '../img/facebookIcon.svg'
import { db, auth } from '../firebase'
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const navigate = useNavigate()

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const { uid, displayName, photoURL } = result.user

    const docSnap = await getDoc(doc(db, 'users', uid))
    await updateDoc(doc(db, 'users', uid), {
      LastIn: serverTimestamp(),
    })
    if (!docSnap.exists()) {
      await setDoc(doc(db, 'users', uid), {
        name: displayName,
        uid,
        timestamp: serverTimestamp(),
        photoURL: photoURL,
      })
    }
    if (result) {
      navigate('/admin')
    }
  }

  const facebookSignIn = () => {
    const provider = new FacebookAuthProvider()
    signInWithPopup(auth, provider)
  }
  return (
    <div className='flex justify-center gap-2'>
      <button
        className='bg-white  my-4 p-1 rounded-full w-10 hover:scale-110'
        onClick={googleSignIn}>
        <img src={googleIcon} alt='google' />
      </button>
      <button onClick={facebookSignIn} className='hover:scale-110'>
        <img src={facebookIcon} alt='facebook' />
      </button>
    </div>
  )
}

export default SignIn
