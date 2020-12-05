import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Products = ({ product }) => {
  return (
    <>
      <Card className='p-3 my-3 rounded'>
        <Link to={`/product/${product._id}`}>
          <Card.Img variant='top' src={product.image} />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as='div'>
              <strong> {product.name} </strong>
            </Card.Title>
          </Link>

          <Card.Text as='div'>
            <div className='my-3'>{`${product.rating} from ${product.numReviews} reviews`}</div>
          </Card.Text>

          <Card.Text as='h4'>
            $<strong>{product.price} </strong>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Products;
