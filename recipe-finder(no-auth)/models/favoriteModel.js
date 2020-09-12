const mongoose = require('mongoose');
const {Schema} = mongoose;

const favoriteSchema = new Schema({
  recipeName: {
    type: String,
    required: true,
    trim: true,
    unique:true
  },

  image:{
    type: String,
    required: true,
    trim: true
  },

  description:{
    type: Array,
    required: true,
    trim: true
  },
  
  date:{
    type:Date,
    default: Date.now()
  }
});

module.exports = Favorite = mongoose.model('Favorite', favoriteSchema);