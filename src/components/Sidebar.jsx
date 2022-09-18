import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore'
import ChatRoom from '../components/ChatRoom'
import General from '../img/General.PNG'
const Sidebar = () => {
  const [chatrooms, setChatRoom] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('timestamp'))
    onSnapshot(q, (qs) => {
      let chatrooms = []
      qs.forEach((doc) => {
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
    <div className='flex flex-col p-2 overflow-auto h-screen pt-24'>
        <ChatRoom key={Global.uid} room={Global} />
        {chatrooms &&
          chatrooms.map((room) => <ChatRoom key={room.uid} room={room} />)}
        {chatrooms &&
          chatrooms.map((room) => <ChatRoom key={room.uid} room={room} />)}
        {chatrooms &&
          chatrooms.map((room) => <ChatRoom key={room.uid} room={room} />)}
    </div>
  )
}

export default Sidebar
