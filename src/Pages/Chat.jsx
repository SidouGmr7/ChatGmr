import React, { useState, useEffect, useRef } from 'react'
import Message from '../Components/Message'
import SendMessage from '../Components/SendMessage'
import { auth, db } from '../firebase'
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

const Chat = () => {
  const [messages, setMessages] = useState([])
  const [user] = useAuthState(auth)

  const params = useParams()
  const scroll = useRef()

  useEffect(() => {
    const q =
      params.userId == 'All'
        ? query(collection(db, 'GeneralRoom'), orderBy('timestamp'))
        : query(
            collection(db, 'users', user.uid, 'messages'),
            orderBy('timestamp')
          )
    onSnapshot(q, (querySnapshot) => {
      let messages = []
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id })
      })
      setMessages(messages)
    })
  }, [params.userId])

  return (
    <>
      <main className='flex flex-col p-3  pb-16'>
        {messages &&
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
      </main>
      <SendMessage scroll={scroll} />
      <span ref={scroll}></span>
    </>
  )
}

export default Chat
