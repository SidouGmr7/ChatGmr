import React from 'react'
import { auth } from '../firebase'
import { FiLogOut } from 'react-icons/fi'

const LogOut = () => {
  return (
    <button
      onClick={() => auth.signOut()}
      className='fixed md:text-3xl text-xl bg-gray-200 px-2 py-2 hover:bg-gray-300 rounded-full'>
      <FiLogOut />
    </button>
  )
}

export default LogOut
