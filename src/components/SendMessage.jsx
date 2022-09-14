import React, { useState } from 'react'
import { auth, db } from '../firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

const SendMessage = ({ scroll }) => {
  const [input, setInput] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault()
    if (input === '') {
      alert('Please enter a valid message')
      return
    }
    const { uid, displayName } = auth.currentUser
    await addDoc(collection(db, 'messages'), {
      text: input,
      name: displayName,
      uid,
      timestamp: serverTimestamp(),
      photoURL : auth.currentUser.photoURL
    })
    setInput('')
    scroll.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <form
      onSubmit={sendMessage}
      className='h-14 w-full max-w-[728px] text-xl bottom-0 fixed'>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className='pl-6  w-[90%] text-xl p-2 bg-gray-200 bg-opacity-80 text-black rounded-full'
        type='text'
        placeholder='Message'
      />
    </form>
  )
}

export default SendMessage
