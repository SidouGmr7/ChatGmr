import React, { useState, useEffect, useRef } from 'react'
import Message from './Message'
import SendMessage from './SendMessage'
import { db } from '../firebase'
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore'

const Chat = () => {
  const [messages, setMessages] = useState([])
  const scroll = useRef()
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'))
    onSnapshot(q, (querySnapshot) => {
      let messages = []
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id })
      })
      setMessages(messages)
    })
  }, [])

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
