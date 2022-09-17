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
      <div
        key={room.uid}
        className='mb-1 bg-gray-200 rounded-full hover:bg-gray-300 hover:scale-[102%] transition '>
        <Link to={`/admin/chat/${room.uid}`}>
          <Card row>
            <CardOverflow>
              <AspectRatio ratio='1' sx={{ width: 90 }}>
                <img
                  src={room.photoURL}
                  className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full'
                  alt=''
                />
                {nbMessege > 0 && (
                  <p className='absolute right-0 top-16 bg-rose-600 rounded-full px-2 text-gray-200 text-sm'>
                    {nbMessege}
                  </p>
                )}
                {room.online && (
                  <GrStatusGoodSmall className='absolute right-0 top-1 bg-green-400 rounded-full px-2 text-gray-200' />
                )}
              </AspectRatio>
            </CardOverflow>
            <CardContent>
              <p className='text-[#260a80] pt-3 text-xl'>{room.name}</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    )
  )
}

export default ChatRoom
