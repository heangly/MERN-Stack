import React from 'react';
import { Col, Row, Image, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import products from '../products';

const ProductDetailsScreen = ({ match }) => {
  const productId = Number(match.params.id);
  const product = products.find((product) => product._id === productId);

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
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
                <Col>{product.countInStock ? 'In Stock' : 'Out of Stock'}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                className='btn-block btn-dark'
                disabled={!product.countInStock}
              >
                {' '}
                Add To Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetailsScreen;
