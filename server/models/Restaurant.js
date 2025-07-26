const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  menu: [
    {
      item: String,
      price: Number,
    },
  ],
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
