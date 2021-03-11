import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/context'
import axios from 'axios'

const Register = ({ history }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const { setLoginUser } = React.useContext(AppContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password === '' || password !== confirmPassword) {
      setError('Passwords Error')
    } else {
      try {
        if (username && password) {
          const { data } = await axios.post('/api/users/register', {
            username,
            password
          })
          localStorage.setItem(
            'loginUser',
            JSON.stringify({
              name: data.name,
              address: data.address,
              alert: data.alert
            })
          )

          setLoginUser(data.name)
          history.push('/home')
        }
      } catch (e) {
        setError('UserName Already Exist')
      }
    }

    setUsername('')
    setPassword('')
  }

  return (
    <>
      <div className='auth text-center my-5'>
        {error && <div className='alert alert-danger'>{error}</div>}
        <h1 className='my-5'>Register</h1>
        <form
          className='col-10 m-auto border p-5 rounded'
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

          <div className='form-group row my-4'>
            <label className='col-sm-2 col-form-label'>Confirm Password</label>
            <div className='col-sm-10'>
              <input
                type='password'
                className='form-control'
                placeholder='confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button className='btn btn-primary btn-block mb-3'>Submit</button>
          <p>
            Already have an account? <Link to='/'>Login here</Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default Register
