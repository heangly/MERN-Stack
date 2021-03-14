import mongoose from 'mongoose'
import bycrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unqiue: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { timestamps: true }
)

// adding method to check the password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bycrypt.compare(enteredPassword, this.password)
}

// this function fires before user model is saved
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bycrypt.genSalt(10)
  this.password = await bycrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
