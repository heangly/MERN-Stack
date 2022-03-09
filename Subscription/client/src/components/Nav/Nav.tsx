import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit'
import { Navbar, NavItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { AppDispatch, RootState } from '../../app/store'
import { resetArticles } from '../../features/article/articleSlice'
import { resetAuth } from '../../features/auth/authSlice'
import { resetCheckout } from '../../features/checkout/checkoutSlice'
import { resetPayment } from '../../features/subscriptionPlan/subscriptionPlanSlice'

const Nav = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)

  const logoutHandler = () => {
    const funcs: ActionCreatorWithoutPayload<string>[] = [
      resetAuth,
      resetArticles,
      resetCheckout,
      resetPayment
    ]
    funcs.forEach((func) => dispatch(func()))
  }

  return (
    <Navbar>
      <NavItem>
        <Link to='/' className='nav-link'>
          Home
        </Link>
      </NavItem>

      <NavItem>
        <Link to='/article-plan' className='nav-link'>
          Plan
        </Link>
      </NavItem>

      <NavItem>
        <Link to='/articles' className='nav-link'>
          Articles
        </Link>
      </NavItem>

      {user.token && (
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
