import React, { useState, useEffect, useRef } from 'react'
import Message from '../components/Message'
import SendMessage from '../components/SendMessage'
import { auth, db } from '../firebase'
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { onAuthStateChanged } from 'firebase/auth'
import { IoIosArrowBack } from 'react-icons/io'

const Chat = () => {
  const [messages, setMessages] = useState([])
  const [Vu, setVu] = useState(0)
  const params = useParams()
  const scroll = useRef()
  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
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

        const qvu = query(
          collection(db, 'users', params.userId, 'messages'),
          where('vu', '==', false),
          where('uid', '==', user.uid)
        )

        onSnapshot(qvu, (s) => {
          let vu = []
          s.forEach((doc) => {
            vu.push(doc.data())
          })
          setVu(vu.length)
        })
      }
    })
  }, [params.userId])
  return (
    <>
      {spinner && <Spinner />}
      <Link
        to='/admin'
        className='fixed z-20 top-5 left-5 text-3xl text-[#701efc] hover:bg-[#701efc] hover:text-white transition rounded-full p-2'>
        <IoIosArrowBack />
      </Link>
      <main className='flex  bg-[#701efc] min-h-screen bg-opacity-10 flex-col p-3 pb-16'>
        {messages &&
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        {Vu === 0 && (
          <p className='rounded-full px-2 w-20  text-gray-400'>vu .....</p>
        )}
      </main>

      <SendMessage scroll={scroll} />
      <span ref={scroll}></span>
    </>
  )
}

export default Chat
