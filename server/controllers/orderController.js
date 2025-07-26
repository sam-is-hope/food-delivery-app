const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  try {
    const { restaurantId, items, totalPrice } = req.body;
    const order = new Order({
      customerId: req.user.id,
      restaurantId,
      items,
      totalPrice,
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ msg: 'Error placing order' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching orders' });
  }
};
