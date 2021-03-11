import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { AppContext } from '../context/context'
import axios from 'axios'

const Alert = ({ history }) => {
  const { loginUser } = React.useContext(AppContext)
  const [virus, setVirus] = useState('yes')
  const [location, setLocation] = useState('Wawa')
  const [user, setUser] = useState('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loginUser'))
    !user && history.push('/')
    setUser(user.name)
  }, [history, loginUser])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (user && location && virus) {
      try {
        await axios.post('/api/alert', {
          user,
          location,
          virus
        })
        history.push('/home')
      } catch (e) {
        console.log('Cannot Create Post')
      }
    }
  }

  return (
    <>
      <Header />
      <div className='container'>
        <h2 className='text-center my-5'>Alert</h2>
        <form
          className='col-10 col-lg-6 m-auto border p-5 rounded'
          onSubmit={handleSubmit}
        >
          <div className='form-group'>
            <label htmlFor='location'>Location</label>
            <select
              className='form-control rounded'
              id='location'
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            >
              <option>Wawa</option>
              <option>Korman Center</option>
              <option>CCI Building</option>
              <option>Lebow Building</option>
            </select>

            <div className='form-group my-4'>
              <label htmlFor='virus'>Have Virus?</label>
              <select
                className='form-control rounded'
                id='virus'
                onChange={(e) => setVirus(e.target.value)}
                value={virus}
              >
                <option>yes</option>
                <option>no</option>
              </select>
            </div>
          </div>
          <button className='btn btn-primary btn-block mb-3'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default Alert
