import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RestaurantMenu() {
  const { id } = useParams();
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/restaurants`)
      .then(res => {
        const restaurant = res.data.find(r => r._id === id);
        if (restaurant) setMenu(restaurant.menu || []);
      });
  }, [id]);

  const addToCart = (item) => {
    const existing = cart.find(i => i.item === item.item);
    if (existing) {
      setCart(cart.map(i =>
        i.item === item.item ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const placeOrder = async () => {
    const token = localStorage.getItem('token');
    const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/orders`,
        { restaurantId: id, items: cart, totalPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Order placed!');
      setCart([]);
    } catch (err) {
      alert('Order failed');
    }
  };

  return (
    <div>
      <h2>Menu</h2>
      {menu.map((item, idx) => (
        <div key={idx}>
          <p>{item.item} - ${item.price}</p>
          <button onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
      ))}

      <h3>🛒 Cart</h3>
      {cart.map((item, i) => (
        <p key={i}>
          {item.item} x {item.quantity} = ${item.quantity * item.price}
        </p>
      ))}
      {cart.length > 0 && <button onClick={placeOrder}>Place Order</button>}
    </div>
  );
}

export default RestaurantMenu;
