import mongoose from 'mongoose'

const alertSchema = mongoose.Schema(
  {
    // add relationship between product and user
    user: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },
    virus: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const Alert = mongoose.model('Alert', alertSchema)
export default Alert
