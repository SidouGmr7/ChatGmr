import BG from '../img/Chat.png'
import Navbar from '../Components/Navbar'

const Home = () => {
  return (
    <>
      <Navbar to='/admin'/>
      <img src={BG} alt='' className='md:h-full h-screen' />
    </>
  )
}

export default Home
