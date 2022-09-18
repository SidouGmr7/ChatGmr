import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AspectRatio from '@mui/joy/AspectRatio'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import CardOverflow from '@mui/joy/CardOverflow'
import { auth, db } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { GrStatusGoodSmall } from 'react-icons/gr'

const ChatRoom = ({ room }) => {
  const [nbMessege, setnbMessege] = useState(0)
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const q = query(
        collection(db, 'users', user.uid, 'messages'),
        where('vu', '==', false),
        where('uid', '==', room.uid)
      )
      onSnapshot(q, (s) => {
        let messages = []
        s.forEach((doc) => {
          messages.push(doc.data())
        })
        setnbMessege(messages.length)
      })
    })
  }, [room.uid])
  return (
    room.uid !== auth.currentUser.uid && (
      <Link to={`/admin/chat/${room.uid}`}>
        <div
          class='flex hover:bg-gray-300  transition  rounded-full p-1 items-center'
          key={room.uid}>
          <div class='flex-shrink-0  rounded-full border border-gray-200'>
            <img src={room.photoURL} className='rounded-full ' alt='' />
          </div>
          <div class='ml-4 flex flex-1 flex-col'>
            <div class='flex justify-between  font-medium text-gray-900'>
              <p className='text-[#260a80] w-full'>{room.name}</p>
              {room.online && (
                <GrStatusGoodSmall className='bg-green-400 rounded-full px-2 text-gray-200' />
              )}
            </div>
            <div class='flex flex-1 items-end justify-between text-sm'>
              <p class='text-gray-500'>Last message</p>

              <div class='flex'>
                {nbMessege > 0 && (
                  <p className=' bg-rose-600 rounded-full px-2 text-gray-200'>
                    {nbMessege}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  )
}

export default ChatRoom
