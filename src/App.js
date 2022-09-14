import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Admin from './Pages/Admin'
import PrivateRoute from './Components/PrivateRoute'
import Chat from './Pages/Chat';

function App() {
  const style = {
    appContainer: `max-w-[728px] mx-auto text-center`,
    sectionContainer: `flex flex-col h-[90vh] bg-gray-100 mt-10 shadow-xl border relative`,
  }
  return (
    <div className={style.appContainer}>
      <section className='{style.sectionContainer}'>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin:useruid' element={<Chat />} />
            <Route path='/Admin' element={<PrivateRoute />}>
              <Route path='/Admin' element={<Admin />} />
            </Route>
          </Routes>
        </Router>
      </section>
    </div>
  )
}

export default App
