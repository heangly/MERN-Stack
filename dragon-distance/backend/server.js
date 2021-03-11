import express from 'express'
import colors from 'colors'
import connectDB from './config/db.js'
import asyncHandler from 'express-async-handler'
import User from './userModel.js'
import Alert from './alertModel.js'

const app = express()

app.use(express.json())

connectDB()

app.get(
  '/api/alert',
  asyncHandler(async (req, res) => {
    const alerts = await Alert.find({}).sort({ createdAt: -1 })
    res.json(alerts)
  })
)

app.post(
  '/api/alert',
  asyncHandler(async (req, res) => {
    const { user, location, virus } = req.body

    const newAlert = new Alert({
      user,
      location,
      virus
    })

    await newAlert.save()

    res.status(201).json('post created')
  })
)

app.delete(
  '/api/alert/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params

    const alert = await Alert.findById(id)
    if (alert) {
      await alert.remove()
      res.json({ message: 'Post removed' })
    } else {
      res.status(404)
      throw new Error('Post not found')
    }
  })
)

app.post(
  '/api/users/login',
  asyncHandler(async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ name: username })

    if (user && user.password === password) {
      res.json({
        _id: user._id,
        name: user.name
      })
    } else {
      // unauthorize
      res.status(401)
      throw new Error('Invalid user or password')
    }
  })
)

app.post(
  '/api/users/register',
  asyncHandler(async (req, res) => {
    const { username, password } = req.body
    const userExist = await User.findOne({ name: username })

    if (userExist) {
      res.status(400)
      throw new Error('User already exists')
    }

    const user = await User.create({
      name: username,
      password
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })
)

// ================== Deployment to Heroku ==================
// Serve static assests if in production
const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('frontend/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

app.listen(PORT, console.log(`==> Sever running on port ${PORT} <==`.cyan.bold))
