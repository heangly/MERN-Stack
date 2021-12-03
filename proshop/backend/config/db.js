import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`.blue.bold)
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold)
    process.exit(1)
  }
}

export default connectDB
