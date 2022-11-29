import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

const articleSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true
    },

    imageUrl: {
      type: String,
      trim: true,
      required: true
    },

    content: {
      type: String,
      trim: true,
      required: true
    },

    access: {
      type: String,
      enum: ['Basic', 'Standard', 'Premuim'],
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Article', articleSchema)
