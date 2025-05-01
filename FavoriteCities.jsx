import React, { useEffect, useState } from "react";

export default function Favorites({ onSelect }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(fav);
  }, []);

  return (
    <div className="favorites">
      <h3>⭐ Favorite Cities</h3>
      <ul>
        {favorites.map((city, idx) => (
          <li key={idx}>
            {city}
            <button onClick={() => onSelect(city)}>Show</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
