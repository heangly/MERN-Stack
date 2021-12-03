const express = require('express');
const axios = require('axios');
const config = require('../../config/default.json');

// api key setup
const apiId = config.EdamamId;
const apiKey = config.EdamamKey;
const baseUrl = config.EdamamIdBaseURL;

const router = express.Router();

const fetchingRecipeData = async (foodName) => {
  const url = `${baseUrl}app_id=${apiId}&app_key=${apiKey}&q=${foodName}&to=52`;
  const response = await axios.get(url);
  return response.data;
};

// @route GET server/search
router.get('/', (req, res) => {
  const {foodName} = req.query;
  console.log(`searchRoute recieves a GET request for recipe ${foodName}`);
  fetchingRecipeData(foodName)
    .then(data => res.send(data.hits))
    .catch(err => console.log(err));
});

module.exports = router;
