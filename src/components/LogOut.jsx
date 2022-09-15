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
      className='text-2xl text-gray-200 bg-[#701efc] px-2 py-2 hover:bg-[#701efc] hover:bg-opacity-70 rounded-full'>
      <FiLogOut />
    </button>
  )
}

export default LogOut
