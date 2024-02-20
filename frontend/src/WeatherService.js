import axios from 'axios';

export const fetchWeather = async (city, baseUrl) => {
  try {
    const response = await axios.get(`${baseUrl}/weather?city=${encodeURIComponent(city)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};