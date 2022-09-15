import React, { useState, useEffect, useRef } from 'react'
import Message from '../components/Message'
import SendMessage from '../components/SendMessage'
import { auth, db } from '../firebase'
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { onAuthStateChanged } from 'firebase/auth'

const Chat = () => {
  const [messages, setMessages] = useState([])
  const params = useParams()
  const scroll = useRef()
  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const q =
          params.userId === 'All'
            ? query(collection(db, 'GeneralRoom'), orderBy('timestamp'))
            : query(
                collection(db, 'users', user.uid, 'messages'),
                orderBy('timestamp')
              )
        onSnapshot(q, (s) => {
          let messages = []
          s.forEach((doc) => {
            messages.push({ ...doc.data(), id: doc.id })
          })
          setMessages(messages)
          setSpinner(false)
        })
      }
    })
  }, [params.userId])
  return spinner ? (
    <Spinner />
  ) : (
    <>
      <p>{}</p>
      <main className='flex flex-col p-3 pb-16'>
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
