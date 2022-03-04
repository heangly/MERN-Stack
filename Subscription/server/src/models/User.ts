import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, 'Please enter the email to Model'],
      unique: true
    },

    password: {
      type: String,
      trim: true,
      required: [true, 'Please enter the password to Model'],
      min: 5,
      unique: false
    }
  },
  {
    timestamps: true
  }
)

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

export default mongoose.model('User', userSchema)
