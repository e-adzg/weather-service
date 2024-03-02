// WeatherService.js
import axios from 'axios';

const baseUrl = 'http://172.18.0.2:31000';

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`${baseUrl}/weather?city=${encodeURIComponent(city)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};