import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { googleSignIn } from '../firebase/Auth'

const Home = () => {
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  const SignInWithGoogle = () => {
    googleSignIn()
    navigate('/admin')
  }

  return (
    <div className='bg-[#701efc] h-screen'>
      <Navbar to='/admin' />
      <p className='absolute top-[25%] left-[10%] text-[#260a80] text-4xl font-bold'>
        Chat Gmr
      </p>
      <div className='absolute top-[33%] left-[15%] text-[#260a80] text-2xl font-bold space-x-10'>
        <p>The Most Growing</p> <p>App in The World</p>
      </div>
      {!user ? (
        <button
          onClick={SignInWithGoogle}
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
