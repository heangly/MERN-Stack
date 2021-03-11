import mongoose from 'mongoose'

const MONGO_URI =
  'mongodb+srv://admin:admin123@cluster0.jzrr5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
