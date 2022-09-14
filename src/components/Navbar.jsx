import React from 'react'
import SignIn from './SignIn'
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
const style = {
  nav: `flex fixed w-full bg-gray-800 h-20 justify-between items-center p-4`,
  heading: `text-white text-3xl`,
}

const Navbar = () => {
  const [user] = useAuthState(auth)
  return (
    <div className={style.nav}>
      <h1 className={style.heading}>Chat App Gmr</h1>
      <SignIn />
    </div>
  )
}

export default Navbar
