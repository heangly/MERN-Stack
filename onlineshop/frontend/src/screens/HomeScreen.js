import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
//
import Product from '../components/Product';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      mounted && setProducts(data);
    };
    fetchProducts();
    return () => (mounted = false);
  }, [products]);

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
