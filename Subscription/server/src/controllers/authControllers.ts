import { IRequestBody } from '../utiles/interfaces'
import asyncHandler from 'express-async-handler'
import { Response } from 'express'
import UserModel from '../models/User'
import generateToken from '../utiles/generateToken'
import { stripe } from '../utiles/stripe'

interface IBody {
  email: string
  password: string
}

const validateEmailAndPassword = (
  email: string,
  password: string,
  res: Response
) => {
  if (!email || !password) {
    res.status(400)
    throw new Error('Email or Password is not provided')
  } else if (password.length < 5) {
    res.status(400)
    throw new Error('Password must be at least 5 characters')
  }
}

// @desc Sign Up User
// @route POST /api/auth/signup
// @access Public
export const signup = asyncHandler(
  async (req: IRequestBody<IBody>, res: Response) => {
    const { email, password } = req.body
    validateEmailAndPassword(email, password, res)

    const exisitingUser = await UserModel.findOne({ email })
    if (exisitingUser) throw new Error('User already exists!')

    const customer = await stripe.customers.create(
      {
        email
      },
      { apiKey: process.env.STRIPE_SECRET_KEY }
    )

    const stripeCustomerId = customer.id

    const user = await UserModel.create({ email, password, stripeCustomerId })
    res.status(201).json({
      token: generateToken(user._id)
    })
  }
)

// @desc Sign In User
// @route POST /api/auth/signin
// @access Public
export const signin = asyncHandler(
  async (req: IRequestBody<IBody>, res: Response) => {
    const { email, password } = req.body
    validateEmailAndPassword(email, password, res)

    const user = await UserModel.findOne({ email })

    if (!user) {
      res.status(401)
      throw new Error('User does not exist')
    }

    if (await user.matchPassword(password)) {
      res.json({
        token: generateToken(user._id)
      })
    } else {
      // unauthorize
      res.status(401)
      throw new Error('Invalid email or password')
    }
  }
)
