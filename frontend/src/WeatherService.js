import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather?city=${encodeURIComponent(city)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};