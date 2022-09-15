import React from 'react'
import { Link } from 'react-router-dom'
import AspectRatio from '@mui/joy/AspectRatio'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import CardOverflow from '@mui/joy/CardOverflow'
import { auth } from '../firebase'

const ChatRoom = ({ room }) => {
  return (
    room.uid != auth.currentUser.uid && (
      <div
        key={room.uid}
        className='mb-1 bg-gray-200 rounded-full hover:bg-gray-300 hover:scale-[102%] transition'>
        <Link to={`/admin/chat/${room.uid}`}>
          <Card row>
            <CardOverflow>
              <AspectRatio ratio='1' sx={{ width: 90 }}>
                <img
                  src={room.photoURL}
                  className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full'
                  alt=''
                />
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
