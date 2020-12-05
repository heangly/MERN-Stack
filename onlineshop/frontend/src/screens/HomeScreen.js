import React from 'react';
import { Row, Col } from 'react-bootstrap';
//
import products from '../products';
import Product from '../components/Product';

const HomeScreen = () => {
  return (
    <>
      <h1 className='py-3'>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product.name} sm={12} md={6} xl={4}>
            <Product key={product._id} product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
