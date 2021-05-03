import products from './products.js'
import express from 'express'
import 'colors'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.get('/', (req, res) => {
  res.send('API is running')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find((product) => product._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`==> Server starts on PORT ${PORT} <==`.bgCyan.black)
)
