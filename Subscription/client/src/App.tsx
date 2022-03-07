import { ToastContainer } from 'react-toastify'
import Nav from './components/Nav/Nav'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Articles from './pages/Articles'
import ProtectedRoute from './routes/ProtectedRoute'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/articles' element={<ProtectedRoute />}>
            <Route path='/articles' element={<Articles />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer theme='colored' />
    </div>
  )
}

export default App
