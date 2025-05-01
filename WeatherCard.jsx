import React from "react";

const WeatherCard = ({ data }) => {
  return (
    <div className="weather-card">
      <h2>Current Weather</h2>
      <p><strong>Temperature:</strong> {data.temp} °C</p>
      <p><strong>Feels Like:</strong> {data.feels_like} °C</p>
      <p><strong>Humidity:</strong> {data.humidity}%</p>
      <p><strong>Wind:</strong> {data.wind_speed} km/h</p>
      <p><strong>Description:</strong> {data.description}</p>
    </div>
  );
};

export default WeatherCard;
