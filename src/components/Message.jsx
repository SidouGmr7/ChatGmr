import React from 'react'
import { auth } from '../firebase'
import Tooltip from '@mui/material/Tooltip'

const style = {
  message: ` items-center shadow-xl  py-2 px-3 rounded-tl-full rounded-tr-full`,
  sent: `bg-[#395dff] text-white text-end float-right rounded-bl-full`,
  received: `bg-[#e5e5ea] text-black float-left rounded-br-full`,
}

const Message = ({ message }) => {
  const messageClass =
    message.uid === auth.currentUser.uid ? `${style.sent}` : `${style.received}`
  const chatClass =
    message.uid === auth.currentUser.uid ? `flex-row-reverse` : ``
  return (
    <div className={`flex  gap-2 m-3 ${chatClass}`}>
      <Tooltip title={message.name} arrow>
        <img
          src={message.photoURL}
          className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-tl-full rounded-tr-full rounded-br-full'
          alt=''
        />
      </Tooltip>
      <div className={`${style.message} ${messageClass}`}>
        <p>{message.text}</p>
      </div>
    </div>
  )
}

export default Message
