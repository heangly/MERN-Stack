import express from 'express'
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

const router = express.Router()

// @desc Fetch All Products
// @route GET /api/prducts
// @access Public
router.route('/').get(
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)

// @desc Fetch One Single Product
// @route GET /api/prducts/id
// @access Public
router.route('/:id').get(
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)

export default router
