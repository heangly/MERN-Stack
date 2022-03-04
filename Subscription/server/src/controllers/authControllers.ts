import { IRequestBody } from '../utiles/interfaces'
import asyncHandler from 'express-async-handler'
import { Response } from 'express'
import UserModel from '../models/User'
import generateToken from '../utiles/generateToken'

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

    const user = await UserModel.create({ email, password })

    res.status(201).json({
      email: user.email,
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

    if (user && (await user.matchPassword(password))) {
      res.json({
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
      // unauthorize
      res.status(401)
      throw new Error('Invalid email or password')
    }
  }
)
