import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <Row>
      <Container>
        <Col className='text-center py-3'>Copyright &copy; Ecommerce</Col>
      </Container>
    </Row>
  );
};

export default Footer;
