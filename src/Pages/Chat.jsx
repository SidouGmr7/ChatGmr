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
import { FaAngleDown } from 'react-icons/fa'
import { SiStatuspage } from 'react-icons/si'

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
  }, [params.userId, scroll])

  const scrolling = () => {
    scroll.current.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div className='bg-[#49196b0e] min-h-screen  bg-opacity-10'>
      {spinner && <Spinner />}
      <main className='flex flex-col p-3 pb-16'>
        <Link
          to='/admin'
          className='md:invisible absolute z-20 top-5 left-5 text-3xl text-[#701efc] hover:bg-[#701efc] hover:bg-opacity-50 hover:text-white transition rounded-full p-2'>
          <IoIosArrowBack />
        </Link>
        <button
          onClick={scrolling}
          className='md:invisible absolute z-20 right-0 text-3xl text-[#701efc] hover:bg-[#701efc] hover:bg-opacity-50 hover:text-white transition rounded-full p-2'>
          <FaAngleDown />
        </button>
        {messages &&
          messages.map((message) => (
            <>
              {message.to === params.userId && (
                <Message key={message.id} message={message} />
              )}
              {message.uid === params.userId && (
                <Message key={message.id} message={message} />
              )}
            </>
          ))}
        {Vu === 0 && (
          <p className=' px-2  text-gray-400 flex'>
            <SiStatuspage />
            vu ..
          </p>
        )}
      </main>
      <SendMessage scroll={scroll} />

      <span ref={scroll}></span>
    </div>
  )
}

export default Chat
