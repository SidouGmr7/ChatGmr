import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-[#701efc] h-screen">
      <Navbar to='/admin' />
      <Link to='/admin'  className="absolute top-[50%] right-[50%] bg-[#260a80] p-4 rounded-full text-gray-200 hover:scale-110 shadow-lg transition">Start Chatting</Link>
    </div>
  )
}

export default Home
