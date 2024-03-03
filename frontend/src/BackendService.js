// BackendService.js
import axios from 'axios';

const baseUrl = 'http://172.18.0.2:31000';


// Utility method to capitalize first letter of each word
const capitalizeFirstLetterOfEachWord = (str) => {
  return str.replace(/\b(\w)/g, s => s.toUpperCase());
};

// Fetch weather data
export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`${baseUrl}/weather?city=${encodeURIComponent(city)}`);
    if (response.data.weather && response.data.weather.length > 0) {
      response.data.weather[0].description = capitalizeFirstLetterOfEachWord(response.data.weather[0].description);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Fetch node metrics
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

// Fetch pod metrics
export const fetchPodsMetrics = async () => {
  try {
    const response = await axios.get(`${baseUrl}/metrics/pods`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pods metrics:', error);
    throw error;
  }
};

// Fetch request count metrics
export const fetchRequestCountMetrics = async () => {
  try {
    const response = await axios.get(`${baseUrl}/metrics/request-count`);
    return response.data;
  } catch (error) {
    console.error('Error fetching request count metrics:', error);
    throw error;
  }
};

// Fetch HPA metrics
export const fetchHpaMetrics = async () => {
  try {
    const response = await axios.get(`${baseUrl}/metrics/hpa`);
    return response.data;
  } catch (error) {
    console.error('Error fetching HPA details:', error);
    throw error;
  }
};