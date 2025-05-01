const BASE_URL = "http://localhost:5002/weather";

export const fetchWeather = async (city) => {
  const response = await fetch(`${BASE_URL}?city=${city}`);
  if (!response.ok) throw new Error("Failed to fetch weather data");
  return await response.json();
};