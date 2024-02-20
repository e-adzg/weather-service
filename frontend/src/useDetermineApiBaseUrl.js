// useDetermineApiBaseUrl.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useDetermineApiBaseUrl = () => {
  const [baseUrl, setBaseUrl] = useState('http://localhost:8080'); // Default URL

  useEffect(() => {
    const checkBaseUrl = async () => {
      try {
        // Use the Spring Boot Actuator health check endpoint
        await axios.get(`${baseUrl}/actuator/health`);
        // If successful, keep the default baseUrl
      } catch (error) {
        // If there's an error switch to the cluster URL
        setBaseUrl('http://172.18.0.2:31000');
      }
    };

    checkBaseUrl();
  }, []);

  return baseUrl;
};

export default useDetermineApiBaseUrl;