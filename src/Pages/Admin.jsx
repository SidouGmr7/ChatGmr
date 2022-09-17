import Navbar from '../components/Navbar'
import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore'
import ChatRoom from '../components/ChatRoom'
import General from '../img/General.PNG'
import Chat from './Chat'
import UserInfo from '../components/UserInfo'

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
    <div className=' bg-[#701efc] md:bg-transparent  md:flex md:flex-row'>
      <Navbar to='/' />
      <div className='flex flex-col p-3 pt-24 md:fix'>
        <ChatRoom key={Global.uid} room={Global} />
        {chatrooms &&
          chatrooms.map((room) => <ChatRoom key={room.uid} room={room} />)}
      </div>
      <div className='md:visible invisible basis-1/2'>
        <Chat />
      </div>
      <div className='md:visible invisible flex flex-col p-3 pt-24'>
        <UserInfo />
      </div>
    </div>
  )
}

export default Admin
