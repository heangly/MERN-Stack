const express = require('express');
const mongoose = require('mongoose');
const searchRoute = require('./routes/api/searchRoute');
const favoriteRoute = require('./routes/api/favoriteRoute');
const config = require("./config/default.json");
const path = require('path');

const app = express();

app.use(express.json());


//  ================== Database ==================
const db = process.env.MONGOD_URI || config.mongoURI;
// Connect to Mongo
mongoose
  .connect(db, {useNewUrlParser: true , useCreateIndex: true, useUnifiedTopology: true})
  .then(() => console.log('==> MongoDB successfully connected <=='))
  .catch(err => console.log('dbError:', err));

app.use('/server/search', searchRoute);
app.use('/server/favorite', favoriteRoute);

// ================== Deployment to Heroku ==================
// Serve static assests if in production
if(process.env.NODE_ENV === 'production'){
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`==> Server starts at ports:${port} <==`));


