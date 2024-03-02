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

export const fetchNodesMetrics = async () => {
  try {
    const response = await axios.get(`${baseUrl}/metrics/nodes`);
    const formattedData = response.data.map(node => ({
      ...node,
      cpuUsage: (node.cpuUsage * 100).toFixed(2) + ' %',
      memoryUsage: (node.memoryUsage / 1e6).toFixed(2) + ' MB'
    }));
    return formattedData;
  } catch (error) {
    console.error('Error fetching nodes metrics:', error);
    throw error;
  }
};