import React, { useState } from 'react';
import { fetchWeather } from './WeatherService';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const handleFetchWeather = async () => {
    try {
      const data = await fetchWeather(city);
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
            <h2>Weather in {weather.name}</h2>
            <p>Description: {weather.weather[0].description}</p>
            <p>Temperature: {weather.main.temp}°K</p>
            <p>Humidity: {weather.main.humidity}%</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
