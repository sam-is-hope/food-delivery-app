import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/restaurants`)
      .then(res => setRestaurants(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Available Restaurants</h1>
      {restaurants.map(r => (
        <div key={r._id}>
          <h3>{r.name}</h3>
          <p>{r.address}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
