import { Request, Response } from 'express'
import asynHandler from 'express-async-handler'
import { IRequest } from '../middleware/authMiddleware'
import Article from '../models/Article'
import User from '../models/User'
import { stripe } from '../utiles/stripe'

// @desc Get All Subscription Plans Prices
// @route GET /api/prices
// @access Private
export const getPrices = asynHandler(async (_: Request, res: Response) => {
  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY
  })
  res.json(prices)
})

// @desc Checkout payment
// @route POST /api/session
// @access Private
export const checkoutPayment = asynHandler(
  async (req: IRequest, res: Response) => {
    const { stripeCustomerId } = req.user!

    const session = await stripe.checkout.sessions.create(
      {
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: req.body.priceId,
            quantity: 1
          }
        ],
        success_url: 'http://localhost:3000/articles',
        cancel_url: 'http://localhost:3000/article-plan',
        customer: stripeCustomerId
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY
      }
    )

    res.json(session)
  }
)
