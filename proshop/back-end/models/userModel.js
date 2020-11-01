import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
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

}, { timestamps: true })

// before save password -> encrypt first
userSchema.pre('save', async function (next) {
  // if user not update password, just move on (like when they only update email)
  // this is all parts of mongoose
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  // this.password = plain text so we reset it
  // so we add "salt" to hash it
  this.password = await bcrypt.hash(this.password, salt);
})

// checking password (custom method for model)
userSchema.methods.matchPassword = async function (enteredPassowrd) {
  return await bcrypt.compare(enteredPassowrd, this.password)
}

const User = mongoose.model('User', userSchema);

export default User;