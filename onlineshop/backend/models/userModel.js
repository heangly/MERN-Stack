import mongoose from 'mongoose';
import bycrpt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

// before saving password, encrypt the password first
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = bycrpt.getSalt(10);
  this.password = await bycrpt.hash(this.password, salt);
});

// checking matching password
userSchema.method.matchPassword = async function (enteredPassword) {
  return await bycrpt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
y;
