import React from 'react'
import Navbar from './components/Navbar'
import Chat from './components/Chat'
import { auth } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import LogOut from './components/LogOut'
import BG from './img/Chat.png'

function App() {
  const [user] = useAuthState(auth)
  const style = {
    appContainer: `${user ? 'max-w-[728px]' : ''}  mx-auto text-center`,
    sectionContainer: `flex flex-col h-[90vh] bg-gray-100 mt-10 shadow-xl border relative`,
  }
  return (
    <div className={style.appContainer}>
      <section className='{style.sectionContainer}'>
        {/* Navbar */}
        {user ? (
          <>
            <LogOut />
            <Chat />
          </>
        ) : (
          <>
            <Navbar />
            <img src={BG} alt='' className='md:h-full h-screen' />
          </>
        )}
      </section>
    </div>
  )
}

export default App
