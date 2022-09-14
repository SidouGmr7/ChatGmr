import Navbar from './../Components/Navbar'
import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore'
import ChatRoom from '../Components/ChatRoom';

const Admin = () => {
  const [chatrooms, setChatRoom] = useState([])
  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('timestamp'))
    onSnapshot(q, (querySnapshot) => {
      let chatrooms = []
      querySnapshot.forEach((doc) => {
        chatrooms.push(doc.data())
      })
      setChatRoom(chatrooms)
    })
  }, [])

  return (
    <>
      <Navbar to='/' />
      <main className='flex flex-col p-3  pb-16'>
        {chatrooms &&
          chatrooms.map((room) => (
            <ChatRoom key={room.id} room={room} />
          ))}
      </main>
    </>
  )
}

export default Admin
