const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

// @desc Login  user
// @route POST /api/users/login
// @desc Private
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('Please enter all fields to login')
  }
  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200)
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentails')
  }
})

// @desc Register new user
// @route POST /api/users
// @desc Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields to register')
  }

  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already registered')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const createdUser = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if (createdUser) {
    res.status(201)
    res.json({
      _id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      token: generateToken(createdUser._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})

// @desc Get user data
// @route GET /api/users/me
// @desc Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id)
  res.status(200)
  res.json({
    id: _id,
    name,
    email
  })
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

module.exports = { loginUser, registerUser, getMe }
