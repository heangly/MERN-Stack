import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  const [user, setUser] = useState('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loginUser'))
  }, [location.pathname, user])

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div className='container'>
        <Link className='navbar-brand' to='/home'>
          Dragon Distance
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item active'>
              <Link className='nav-link' to='/home'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/alert'>
                Alert
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/about'>
                About
              </Link>
            </li>

            <li className='nav-item dropdown'>
              <span
                style={{ cursor: 'pointer' }}
                className='nav-link dropdown-toggle'
                id='navbarDropdown'
                role='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                {JSON.parse(
                  localStorage.getItem('loginUser')
                ).name.toUpperCase()}
              </span>
              <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <Link className='dropdown-item' to='/'>
                  Logout
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
