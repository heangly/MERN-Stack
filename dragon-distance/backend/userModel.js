import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    // add relationship between product and user
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
export default User
