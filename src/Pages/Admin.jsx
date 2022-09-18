import Navbar from '../components/Navbar'

import Chat from './Chat'
import UserInfo from '../components/UserInfo'
import Sidebar from '../components/Sidebar'

const Admin = () => {
  return (
    <div className='bg-gray-200 md:bg-transparent  md:flex md:flex-row'>
      <Navbar to='/' />
        <Sidebar />
      <div className='md:visible invisible basis-1/2 overflow-auto h-screen'>
        <Chat />
      </div>
      <div className='md:visible invisible flex flex-col p-3 pt-24'>
        <UserInfo />
      </div>
    </div>
  )
}

export default Admin
