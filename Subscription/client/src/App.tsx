import { ToastContainer } from 'react-toastify'
import Nav from './components/Nav/Nav'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Articles from './pages/Articles'
import ProtectedRoute from './routes/ProtectedRoute'
import ArticlePlans from './pages/ArticlePlans'
import { NotFound } from './pages/NotFound'

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
          <Route path='/article-plan' element={<ProtectedRoute />}>
            <Route path='/article-plan' element={<ArticlePlans />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme='colored' autoClose={3000} />
    </div>
  )
}

export default App
