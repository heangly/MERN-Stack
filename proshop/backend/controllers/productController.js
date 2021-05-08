import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

// @desc Fetch All Products
// @route GET /api/prducts
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc Fetch One Single Product
// @route GET /api/prducts/id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById }
