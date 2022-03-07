import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import { RootState } from '../app/store'

const ProtectedRoute = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  return user.email ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRoute
