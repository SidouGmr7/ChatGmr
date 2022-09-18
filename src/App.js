import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Admin from './Pages/Admin'
import Chat from './Pages/Chat'
import Private from './components/Private'

function App() {
  const style = {
    appContainer: `max-w-[728px] md:max-w-full mx-auto text-center`,
    sectionContainer: `flex flex-col h-[90vh] bg-gray-100 mt-10 shadow-xl border relative`,
  }

  const [windowSize, setWindowSize] = useState(getWindowSize())

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize())
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])
  return (
    <div className={style.appContainer}>
      <section className='{style.sectionContainer}'>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            {windowSize.innerWidth > 768 ? (
              <Route path='/admin/chat/:userId' element={<Admin />} />
            ) : (
              <Route path='/admin/chat/:userId' element={<Chat />} />
            )}
            <Route path='/admin' element={<Private />}>
              <Route path='/admin' element={<Admin />} />
            </Route>
          </Routes>
        </Router>
      </section>
    </div>
  )
}

export default App

function getWindowSize() {
  const { innerWidth, innerHeight } = window
  return { innerWidth, innerHeight }
}
