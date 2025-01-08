const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
  title: String,
  price: Number,
  link: { type: String, unique: true },
  platform: String,
  imageUrl: String,
  color: String,
  category: String
});

const Furniture = mongoose.model('Furniture', furnitureSchema);

module.exports = Furniture;
