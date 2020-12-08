import products from '../products.js';

export const getProducts = (req, res) => {
  res.json(products);
};

export const getProductById = (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
};
