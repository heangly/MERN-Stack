import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button } from 'react-bootstrap';
//
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = ({ history, location, match }) => {
  const productId = match.params.id;
  const qty = Number(location.search.split('=')[1]) || 1;

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [productId, qty, dispatch]);

  const changeQtyHandler = (e, item) => {
    dispatch(addToCart(item.product, Number(e.target.value)));
    history.push('/cart');
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <>
      {!cartItems.length ? (
        <Message>
          Your cart is empty <Link to='/'>Go Back</Link>
        </Message>
      ) : (
        <Row className='mt-4'>
          <Col md={8}>
            <h3>Shopping Cart</h3>
            <ListGroup variant='flush' className='mt-4'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={4}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) => changeQtyHandler(e, item)}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash' />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <ListGroup>
              <ListGroup.Item>
                <h4>
                  Subtotal ({cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                  ) Items
                </h4>
                $
                {cartItems
                  .reduce((acc, curr) => acc + curr.price * curr.qty, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='btn-block btn-dark p-2'
                  onClick={checkoutHandler}
                >
                  Process to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CartScreen;
