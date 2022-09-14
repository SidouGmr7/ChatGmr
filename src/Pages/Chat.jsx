import React, { useState, useEffect, useRef } from 'react'
import Message from '../Components/Message'
import SendMessage from '../Components/SendMessage'
import { db } from '../firebase'
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore'
import { useParams } from 'react-router-dom'

const Chat = () => {
  const [messages, setMessages] = useState([])
  const params = useParams()
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
