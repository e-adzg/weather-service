// App.js
import React, { useState } from 'react';
import { fetchWeather } from './WeatherService';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const capitalizeFirstLetterOfEachWord = (str) => {
  return str.replace(/\b(\w)/g, s => s.toUpperCase());
}

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchWeather = async () => {
    setWeather(null);
    setError(null);
    if (!city.trim()) {
      setError("City name cannot be empty.");
      return;
    }
    try {
      const data = await fetchWeather(city);
      if (data.cod !== 200) {
        throw new Error(data.message || "Error fetching weather data.");
      }
      data.weather[0].description = capitalizeFirstLetterOfEachWord(data.weather[0].description);
      setWeather(data);
    } catch (error) {
      console.error(error);
      setError('Check the spelling of the city.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            error={!!error}
            id="standard-error-helper-text"
            label="City Name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            helperText={error || "Enter the city name to get weather"}
            variant="standard"
          />
        </Box>
        <button onClick={handleFetchWeather}>Get Weather</button>
        {weather && (
          <div>
            <h2>Weather in {weather.name}, {weather.sys.country}</h2>
            <p>Description: {weather.weather[0].description}</p>
            <p>Temperature: {weather.main.temp}°C (Feels like: {weather.main.feels_like}°C)</p>
            <p>Min Temperature: {weather.main.temp_min}°C, Max Temperature: {weather.main.temp_max}°C</p>
            <p>Pressure: {weather.main.pressure} hPa</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Visibility: {weather.visibility / 1000} km</p>
            <p>Wind: {weather.wind.speed} m/s, Direction: {weather.wind.deg}°</p>
            <p>Cloudiness: {weather.clouds.all}%</p>
            <p>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}, Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
