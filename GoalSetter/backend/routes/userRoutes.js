const express = require('express')
const router = express.Router()
const {
  registerUser,
  getMe,
  loginUser
} = require('../controllers/userControllers')
const { protected } = require('../middleware/authMiddleware')

router.route('/').post(registerUser)
router.route('/login').post(loginUser)
router.route('/me').get(protected, getMe)

module.exports = router
