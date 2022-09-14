import React from 'react'
import { auth } from '../firebase'
import { FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const LogOut = () => {
  const Navigate = useNavigate()
  const signOut = () => {
    auth.signOut()
    Navigate('/')
  }
  return (
    <button
      onClick={signOut}
      className='fixed text-2xl bg-gray-200 px-2 py-2 hover:bg-gray-300 rounded-full'>
      <FiLogOut />
    </button>
  )
}

export default LogOut
