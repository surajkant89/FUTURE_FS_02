const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const API_KEY = process.env.OPENWEATHER_API_KEY;

app.get("/weather", async (req, res) => {
  const { city } = req.query;
  try {
    // 1. Get coordinates of the city
    const geoRes = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = geoRes.data;
    const { lat, lon } = data.coord;

    // 2. Get forecast using coordinates
    const forecastRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const forecastData = forecastRes.data.list;

    // 3. Process 5-day forecast (one per day at 12:00)
    const dailyForecast = forecastData.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5).map(item => ({
      date: item.dt_txt.split(" ")[0],
      temp: item.main.temp,
      description: item.weather[0].description,
      icon: item.weather[0].icon
    }));

    // 4. Return current + forecast
    res.json({
      current: {
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed * 3.6,
        description: data.weather[0].description,
      },
      forecast: dailyForecast
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(5002, () => console.log("Server running on http://localhost:5002"));
