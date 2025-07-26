import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${process.env.REACT_APP_API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setOrders(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.map(order => (
        <div key={order._id}>
          <p>Status: {order.status}</p>
          <p>Total: ${order.totalPrice}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
