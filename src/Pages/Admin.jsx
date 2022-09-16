import Navbar from '../components/Navbar'
import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore'
import ChatRoom from '../components/ChatRoom'
import General from '../img/General.PNG'

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
  const Global = {
    uid: 'All',
    name: 'General Chat Room',
    photoURL: General,
  }

  return (
    <div className='bg-[#701efc] h-screen'>
      <Navbar to='/' />
      <main className='flex flex-col p-3 pt-24 '>
        <ChatRoom key={Global.uid} room={Global} />
        {chatrooms &&
          chatrooms.map((room) => <ChatRoom key={room.uid} room={room} />)}
      </main>
    </div>
  )
}

export default Admin
