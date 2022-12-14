import React, { useState } from 'react'
import { auth, db } from '../firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { IoMdSend } from 'react-icons/io'

const SendMessage = ({ scroll }) => {
  const [input, setInput] = useState('')
  const params = useParams()
  const sendMessage = async (e) => {
    e.preventDefault()
    if (input === '') {
      alert('Please enter a valid message')
      return
    }
    const { uid, displayName, photoURL } = auth.currentUser
    const Data = {
      text: input,
      name: displayName,
      uid,
      timestamp: serverTimestamp(),
      photoURL: photoURL,
      vu: false,
      to: params.userId,
    }
    if (params.userId === 'All') {
      await addDoc(collection(db, 'GeneralRoom'), Data)
    } else {
      await addDoc(collection(db, 'users', uid, 'messages'), Data)
      await addDoc(collection(db, 'users', params.userId, 'messages'), Data)
    }
    scroll.current.scrollIntoView({ behavior: 'smooth' })
    setInput('')
  }

  return (
    <form
      onSubmit={sendMessage}
      className='h-14 w-full max-w-[728px] text-xl bottom-0 fixed md:w-[50%]'>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className='pl-6 w-[90%] text-xl p-2 bg-gray-200 bg-opacity-80 text-black rounded-full'
        type='text'
        placeholder='Message'
      />
      <button
        className='text-gray-200 text-xl rounded-full p-2 absolute -ml-10 mt-1 bg-[#701efc]'
        type='submit'>
        <IoMdSend />
      </button>
    </form>
  )
}

export default SendMessage
