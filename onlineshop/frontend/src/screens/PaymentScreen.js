import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
//
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  !shippingAddress && history.push('/shipping');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeOrder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h2 className='py-3'>Payment Method</h2>
      <Form onSubmit={submitHandler} className='mt-3'>
        <Form.Group>
          <Form.Label as='h5'>Select Method</Form.Label>

          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button variant='dark' type='submit'>
          Place Order
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
