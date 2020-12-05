import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  return (
    <Navbar bg='dark' variant='dark' expand='lg' className='py-3'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>ONLINE SHOP</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto' activeKey='false'>
            <LinkContainer to='/cart'>
              <Nav.Link href='#home'>
                <i className='fas fa-shopping-cart' /> CART
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/signin'>
              <Nav.Link href='#link'>
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
