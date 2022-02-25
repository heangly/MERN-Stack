const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
require('dotenv').config()
require('colors')

const app = express()
connectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const PORT = process.env.PORT || 4000

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () =>
  console.log(`=> Server started on port ${PORT} <=`.yellow.bold)
)
