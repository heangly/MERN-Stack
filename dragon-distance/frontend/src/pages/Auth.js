import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/context'

const Auth = ({ history }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setLoginUser } = React.useContext(AppContext)

  useEffect(() => {
    localStorage.clear()
  }, [history])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (username && password) {
        const { data } = await axios.post('/api/users/login', {
          username,
          password
        })
        localStorage.setItem(
          'loginUser',
          JSON.stringify({
            name: data.name
          })
        )
        setLoginUser(data.name)
        history.push('/home')
      }
    } catch (e) {
      setError('Wrong username or password')
    }
  }

  return (
    <>
      <div className='auth text-center mt-5'>
        {error && <div className='alert alert-danger'>{error}</div>}
        <h1 className='my-5'>Sign In</h1>
        <form
          className='col-10 col-lg-6 m-auto border p-5 rounded'
          onSubmit={handleSubmit}
        >
          <div className='form-group row'>
            <label className='col-sm-2 col-form-label'>Username</label>
            <div className='col-sm-10'>
              <input
                type='text'
                className='form-control'
                placeholder='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div className='form-group row my-4'>
            <label className='col-sm-2 col-form-label'>Password</label>
            <div className='col-sm-10'>
              <input
                type='password'
                className='form-control'
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button className='btn btn-primary btn-block mb-3'>Submit</button>
          <p>
            Do not have an account? <Link to='/register'>Register here</Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default Auth
