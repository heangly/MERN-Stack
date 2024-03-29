import mongoose from 'mongoose'
import 'colors'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string)
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (err) {
    const error = err as Error
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}
