import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  return (
    <Navbar
      variant='dark'
      expand='lg'
      className='py-3'
      style={{ background: 'black' }}
    >
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>ONLINE SHOP</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          {/* activekey = false, fix the active navlink */}
          <Nav className='ml-auto' activeKey='false'>
            <LinkContainer to='/cart'>
              <Nav.Link>
                <i className='fas fa-shopping-cart' /> CART
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login'>
              <Nav.Link>
                <i className='fas fa-user' /> SIGN IN
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;