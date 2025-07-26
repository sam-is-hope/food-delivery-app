const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  items: [{ item: String, quantity: Number }],
  status: { type: String, enum: ['pending', 'preparing', 'delivered'], default: 'pending' },
  totalPrice: Number,
});

module.exports = mongoose.model('Order', orderSchema);
