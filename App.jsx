import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import Favorites from "./Favorites";
import "./App.css";

const API_BASE = "http://localhost:5002";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const getWeather = () => {
    if (!city) return;
    fetch(`${API_BASE}/weather?city=${city}`)
      .then(res => res.json())
      .then(data => {
        setWeather(data.current);
        setForecast(data.forecast);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        alert("Failed to fetch weather data");
      });
  };

  const addToFavorites = () => {
    if (!city || favorites.includes(city)) return;
    const updated = [...favorites, city];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const deleteFromFavorites = (cityToRemove) => {
    const updated = favorites.filter((fav) => fav !== cityToRemove);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>
      <input
        type="text"
        value={city}
        placeholder="Enter city name"
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {weather && (
        <>
          <WeatherCard data={weather} />
          <button onClick={addToFavorites}>Add to Favorites</button>
        </>
      )}

      {forecast.length > 0 && (
        <div className="forecast">
          <h2>5-Day Forecast</h2>
          <ul>
            {forecast.map((f, idx) => (
              <li key={idx}>
                {f.date}: {f.temp}°C, {f.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Favorites
        list={favorites}
        onSelect={(fav) => {
          setCity(fav);
          getWeather();
        }}
        onDelete={deleteFromFavorites}
      />
    </div>
  );
}

export default App;
