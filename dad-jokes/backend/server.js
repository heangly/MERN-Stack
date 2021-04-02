const colors = require('colors')
const express = require('express')

const app = express()

// ================== Deployment to Heroku ==================
const PORT = process.env.PORT || 5000

// Serve static assests if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('frontend/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

app.listen(PORT, console.log(`==> Sever running on port ${PORT} <==`.cyan.bold))
