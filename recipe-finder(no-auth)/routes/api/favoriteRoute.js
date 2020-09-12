const express = require('express');
const FavoriteModel = require('../../models/favoriteModel');
const router = express.Router();


// @route GET server/favorite
router.get('/', (req, res) => {
  const {userId} = req.query;
  console.log('favoriteRoute recieves a GET request');
  FavoriteModel.find({userId})
    // -1 = descending order
    .sort({date: -1})
    .then(favorites => {
      res.json(favorites)
    })
});

// @route POST server/favorite
router.post('/', (req, res) => {
  console.log('favoriteRoute recieves a POST request');
  const {recipeName, image, description} = req.body.body;
  const newFavorite = new FavoriteModel({recipeName, image, description});
  newFavorite.save()
    .then(favorite => {
      console.log(`Successfully ADDED ${recipeName} to DB`)
      res.json(favorite);
    })
    .catch(err => res.status(404).json({success: false}));
});

// @route DELETE server/favorite
router.delete('/:recipeName', (req, res) => {
  console.log('favoriteRoute recieves a DELETE request');
  const {recipeName} = req.params;
  FavoriteModel.deleteOne({recipeName})
    .then(() => {
      console.log(`Successfully DELETED ${recipeName} from DB`)
      res.json({success: true})
    })
    .catch(err => console.log(err));
})


module.exports = router;
