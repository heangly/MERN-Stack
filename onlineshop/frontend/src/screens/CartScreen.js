import React from 'react';

const CartScreen = ({ location }) => {
  console.log(location.search.split('=')[1]);
  return <div>hi</div>;
};

export default CartScreen;
