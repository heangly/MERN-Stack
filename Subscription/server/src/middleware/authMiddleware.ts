import jwt, { JwtPayload } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import UserModel from '../models/User'
import { NextFunction, Request, Response } from 'express'

interface IRequest extends Request {
  user?: string
}

const protect = asyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    let token
    if (req.headers.authorization?.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

        // '-password' = dont include password
        // set req.user to have loggined user data
        req.user = await UserModel.findById(decoded.id as string).select(
          '-password'
        )
        next()
      } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error('Not authorized, token failed')
      }
    }

    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token')
    }
  }
)

// const admin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next()
//   } else {
//     res.status(401)
//     throw new Error('Not authorized as an admin')
//   }
// }

export { protect }
