import React from "react";

const Favorites = ({ list, onSelect, onDelete }) => {
  return (
    <div className="favorites">
      <h2>Favorites</h2>
      <ul>
        {list.map((city, idx) => (
          <li key={idx}>
            {city}
            <button onClick={() => onSelect(city)}>Show</button>
            <button onClick={() => onDelete(city)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
