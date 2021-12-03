import React from 'react';
import {NavLink} from 'react-router-dom';
import '../styles/Navbar.css'

const Navbar = () =>{
  return(
    <div className='Navbar'>
      <nav>
        <NavLink className='Navbar-brand' to='/recipes'>
          <i className="fas fa-utensils"></i> RF
        </NavLink>

        <ul className='Navbar-menu'>
          <NavLink exact activeClassName='active-link' to='/recipes'>
              Home
          </NavLink>
          <NavLink exact activeClassName='active-link' to='/recipes/favorite'>
              Favorite
          </NavLink>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar;