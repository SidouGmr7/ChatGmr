import React from 'react'
import { Link } from 'react-router-dom'
import AspectRatio from '@mui/joy/AspectRatio'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import CardOverflow from '@mui/joy/CardOverflow'

const ChatRoom = ({ room }) => {
  return (
    <div className='mb-1 bg-gray-200 bg-opacity-50 rounded-lg hover:bg-gray-300 transition'>
      <Link to={`/chat/${room.uid}`}>
        <Card row>
          <CardOverflow>
            <AspectRatio ratio='1' sx={{ width: 90 }}>
              <img
                src={room.photoURL}
                className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl'
                alt=''
              />
            </AspectRatio>
          </CardOverflow>
          <CardContent>
            <p className='text-gray-700 pt-3 text-xl'>{room.name}</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}

export default ChatRoom
