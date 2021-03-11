import Alert from './alertModel.js'
import User from './userModel.js'
import { alerts, users } from './data.js'
import connectDB from './config/db.js'

connectDB()

const importData = async () => {
  try {
    await Alert.deleteMany()
    await User.deleteMany()
    // now import new data
    await Alert.insertMany(alerts)
    await User.insertMany(users)
    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.log(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    // clear all data first before import new data

    await Alert.deleteMany()
    await User.deleteMany()
    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.log(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
