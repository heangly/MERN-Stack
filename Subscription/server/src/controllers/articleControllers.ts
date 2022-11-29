import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { IRequest } from '../middleware/authMiddleware'
import Article from '../models/Article'
import { stripe } from '../utiles/stripe'

enum Plan {
  Basic = 'Basic',
  Standard = 'Standard',
  Premuim = 'Premuim'
}

// @desc Get Articles
// @route GET /api/articles
// @access Private
export const getArticles = asyncHandler(
  async (req: IRequest, res: Response) => {
    const user = req.user!
    console.log(user)
    const { data } = await stripe.subscriptions.list(
      {
        customer: user.stripeCustomerId,
        status: 'all',
        expand: ['data.default_payment_method']
      },
      { apiKey: process.env.STRIPE_SECRET_KEY }
    )

    if (!data.length) {
      res.json([])
    }

    //@ts-ignore
    const plan = data[0].plan.nickname

    let articles: any[]

    if (plan === Plan.Basic) {
      articles = await Article.find({ access: 'Basic' })
    } else if (plan === Plan.Standard) {
      articles = await Article.find({
        access: { $in: [Plan.Basic, Plan.Standard] }
      })
    } else {
      articles = await Article.find({})
    }

    res.json(articles)
  }
)
