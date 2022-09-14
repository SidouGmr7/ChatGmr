import { Outlet } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import Home from '../Pages/Home'


const PrivateRoute = () => {

  const [user] = useAuthState(auth)

  return user ? <Outlet /> : <Home /> 
}

export default PrivateRoute
