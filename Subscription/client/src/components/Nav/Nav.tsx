import { Navbar, NavItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { AppDispatch, RootState } from '../../app/store'
import { resetAuth } from '../../features/authSlice'

const Nav = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)

  const logoutHandler = () => {
    dispatch(resetAuth())
  }

  return (
    <Navbar>
      <NavItem>
        <Link to='/' className='nav-link'>
          Home
        </Link>
      </NavItem>

      {user.email && (
        <LeftNavContainer>
          <NavItem onClick={logoutHandler}>
            <Link to='/' className='nav-link'>
              Logout
            </Link>
          </NavItem>
        </LeftNavContainer>
      )}
    </Navbar>
  )
}

const LeftNavContainer = styled.div`
  margin-left: auto;
`

export default Nav
