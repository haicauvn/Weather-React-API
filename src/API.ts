// Define the BASE_URL constant
const BASE_URL = "https://api.weatherapi.com/v1";

// Your API key
export const API_KEY = 'c9a0ca46550648b29ce125849232709';

// Fetch current weather data
export const fetchCurrentWeather = async (city: string) => {
  const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=no&lang=vi`);
  const data = await response.json();
  console.log(data);
  return data;
};

// Fetch hourly weather data
export const fetchHourlyWeather = async (city: string) => {
  const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=no&lang=vi`);
  const data = await response.json();
  console.log(data);
  return data.forecast.forecastday[0].hour;
};

// Fetch 3-day weather data
export const fetchThreeDayWeather = async (city: string) => {
  const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no&lang=vi`);
  const data = await response.json();
  console.log(data);
  return data.forecast.forecastday;
};
