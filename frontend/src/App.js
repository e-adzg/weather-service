import React, { useState } from 'react';
import { fetchWeather } from './WeatherService';
import useDetermineApiBaseUrl from './useDetermineApiBaseUrl';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const baseUrl = useDetermineApiBaseUrl();

  const handleFetchWeather = async () => {
    try {
      const data = await fetchWeather(city, baseUrl);
      setWeather(data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch weather');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
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
