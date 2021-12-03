import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link>
              <small>Sign In</small>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <small>Sign In</small>
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>
              <small>Shipping</small>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <small>Shipping</small>
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>
              <small>Payment</small>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <small>Payment</small>
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>
              <small>Place Order</small>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <small>Place Order</small>
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
