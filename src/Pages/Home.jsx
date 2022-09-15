import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

const Home = () => {
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const { uid, displayName, photoURL } = user
    const Data = {
      name: displayName,
      uid,
      timestamp: serverTimestamp(),
      photoURL: photoURL,
    }
    const docSnap = await getDoc(doc(db, 'users', uid))

    if (!docSnap.exists()) {
      await setDoc(doc(db, 'users', uid), Data)
    } else {
      await updateDoc(doc(db, 'users', uid), {
        LastIn: serverTimestamp(),
      })
    }
    if (result) {
      navigate('/admin')
    }
  }
  return (
    <div className='bg-[#701efc] h-screen'>
      <Navbar to='/admin' />
      <p className='absolute top-[25%] left-[10%] text-[#260a80] text-4xl font-bold'>
        Chat Gmr
      </p>
      <p className='absolute top-[33%] left-[15%] text-[#260a80] text-2xl font-bold space-x-10'>
        <p>The Most Growing</p> <p>App in The World</p>
      </p>
      {!user ? (
        <button
          onClick={googleSignIn}
          className='absolute top-[50%] bg-[#260a80] p-4 rounded-full text-gray-200 hover:scale-110 shadow-lg transition'>
          Start Chatting
        </button>
      ) : (
        <Link
          to='/admin'
          className='absolute top-[50%] bg-[#260a80] p-4 rounded-full text-gray-200 hover:scale-110 shadow-lg transition'>
          Start Chatting
        </Link>
      )}
    </div>
  )
}

export default Home
