import React from 'react';
import '../styles/Footer.css'

const Footer = () => {
  const getYear = () => new Date().getFullYear();
  
  return(
    <div className='Footer'>
      <div className='social'>
        <a href="https://github.com/heangly" target="_blank"><i className="text-white fab fa-github-square"></i></a>
          <a href="https://www.linkedin.com/in/heang-ly-34443713a/" target="_blank"><i className="text-white fab fa-linkedin"></i></a>
      </div>
      <p className='Footer-built'> Built by Heang Ly</p>
      <p style={{marginTop:'10px'}}> Copyright &copy; {getYear()} All Rights Reserved</p>
    </div>
  )

}

export default Footer;