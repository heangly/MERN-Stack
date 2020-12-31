import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Image, ListGroup, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//
import Rating from '../components/Rating';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductDetailsScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productCreateReview;

  const productId = match.params.id;

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(productId));
  }, [dispatch, match, productId, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(productId, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md='5'>
              <Image src={product.image} alt={product.name} fluid></Image>
            </Col>
            <Col md='4'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4>{product.name}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  <small> Description: {product.description}</small>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col>
              <ListGroup>
                <ListGroup.Item className='justify-content-between'>
                  <Row>
                    <Col>Price:</Col>
                    <Col>{product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1}>{x + 1}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className='btn-block btn-dark'
                    disabled={!product.countInStock}
                    onClick={addToCartHandler}
                  >
                    {' '}
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h5>Reviews</h5>
              {product.reviews.length === 0 && (
                <Message variant='primary'>No Review</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating rating={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h5>Write a Customer Review</h5>
                  {errorProductReview && (
                    <Message>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'> 1 - Poor</option>
                          <option value='2'> 2 - Fair</option>
                          <option value='3'> 3 - Good</option>
                          <option value='4'> 4 - Very Good</option>
                          <option value='5'> 5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </Form.Group>
                      <Button type='submit' variant='dark'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant='primary'>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductDetailsScreen;
