import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import LogOut from './LogOut'
import SignIn from './SignIn'
import Logo from '../img/Logo.PNG'

const Navbar = ({ to }) => {
  const [user] = useAuthState(auth)

  return (
    <div className='flex fixed w-full bg-[#030143] h-20 justify-between items-center p-4'>
      <Link to={to}>
        <img
          src={user ? user.photoURL : null}
          className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full'
          alt=''
        />
      </Link>
      <img src={Logo} alt='' className='w-60' />
      {user ? (
        <div className=' drop-shadow-xl rounded-full'>
          <LogOut />
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  )
}

export default Navbar
