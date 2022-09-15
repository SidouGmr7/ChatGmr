import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import LogOut from './LogOut'
import SignIn from './SignIn'
const style = {
  nav: `flex fixed w-full bg-gray-800 h-20 justify-between items-center p-4`,
  heading: `text-white text-3xl`,
}

const Navbar = ({to}) => {
  const [user] = useAuthState(auth)

  return (
    <div className={style.nav}>
      <h1 className={style.heading}>Chat App Gmr</h1>
      {user ? (
        <div className="flex gap-2 p-7">
          <Link to={to}>
            <img
              src={user ? user.photoURL : null}
              className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full'
              alt=''
            />
          </Link>
          <div className=" drop-shadow-xl rounded-full">
          <LogOut />
          </div>
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  )
}

export default Navbar
