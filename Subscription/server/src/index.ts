import express, { NextFunction, Request, Response } from 'express'
import dotEnv from 'dotenv'
import 'colors'

import { errorHandler, notFound } from './middleware/errorMiddleware'
import authRoutes from './routes/auths'
import { connectDB } from './config/connectDB'

dotEnv.config()
connectDB()

const app = express()
app.use(express.json())

app.use('/api/auth/', authRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = 8080
app.listen(PORT, () =>
  console.log(`Server is running on PORT ${PORT}`.bgCyan.black)
)
