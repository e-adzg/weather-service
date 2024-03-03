// App.js
import React, { useState, useEffect } from 'react';
import { fetchWeather, fetchNodesMetrics, fetchPodsMetrics, fetchRequestCountMetrics } from './WeatherService';
import BasicCard from './BasicCard';
import CustomTable from './CustomTable';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import image1 from './assets/image1.png';
import image2 from './assets/image2.png';

const capitalizeFirstLetterOfEachWord = (str) => {
  return str.replace(/\b(\w)/g, s => s.toUpperCase());
}

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [nodesMetrics, setNodesMetrics] = useState([]);
  const [showMetrics, setShowMetrics] = useState(false);
  const [podsMetrics, setPodsMetrics] = useState([]);
  const [requestCountMetrics, setRequestCountMetrics] = useState({});
  const [fadeState, setFadeState] = useState('fade-in');
  const [fadeTransition, setFadeTransition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(image1);
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    let intervalId;

    if (!weather && !isLoading) {
      setShowImages(true);
      intervalId = setInterval(() => {
        setCurrentImage(current => (current === image1 ? image2 : image1));
      }, 1000);
    } else {
      setShowImages(false);
    }

    return () => clearInterval(intervalId);
  }, [weather, isLoading]);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (showMetrics) {
        const nodesData = await fetchNodesMetrics();
        setNodesMetrics(nodesData);

        const podsData = await fetchPodsMetrics();
        setPodsMetrics(podsData);

        const requestCountData = await fetchRequestCountMetrics();
        setRequestCountMetrics(requestCountData);
      }
    };

    fetchMetrics();

    let intervalId;
    if (showMetrics) {
      intervalId = setInterval(fetchMetrics, 5000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [showMetrics]);

  const FADE_DURATION = 1000;

  const handleFetchWeather = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    setFadeState('fade-out');

    const timeout = setTimeout(async () => {
      setWeather(null);
      setError(null);

      if (!city.trim()) {
        setError("City name cannot be empty.");
        setIsLoading(false);
        setShowImages(true);
        setFadeState('fade-in');
        return;
      }

      try {
        const data = await fetchWeather(city);
        if (data.cod !== 200) {
          throw new Error(data.message || "Error fetching weather data.");
        }
        data.weather[0].description = capitalizeFirstLetterOfEachWord(data.weather[0].description);
        setWeather(data);
        setShowImages(false);
      } catch (error) {
        console.error(error);
        setError('Check the spelling of the city.');
        setShowImages(true);
      }
      setIsLoading(false);
      setFadeState('fade-in');
    }, FADE_DURATION);

    setFadeTransition(timeout);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Box
          component="form"
          onSubmit={handleFetchWeather}
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
            sx={{
              '& label': {
                color: 'white',
              },
              '& .MuiInput-underline:before': {
                borderBottomColor: 'white',
              },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottomColor: 'white',
              },
              '& .MuiInput-input': {
                color: 'white',
              },
              '& .MuiFormHelperText-root': {
                color: 'white',
              },
              '& .Mui-error': {
                color: '#f44336',
              }
            }}
          />
          <IconButton type="submit" aria-label="search" color="primary" onClick={handleFetchWeather}>
            {isLoading ? <CircularProgress size={24} /> : <SearchIcon />}
          </IconButton>
        </Box>
        <div className={`weather-display ${fadeState}`} style={{ transitionDuration: `${FADE_DURATION}ms` }}>
          {!weather && !isLoading ? (
            <img src={currentImage} alt="Weather Placeholder" style={{
              width: '100%',
              maxWidth: '600px',
              opacity: fadeState === 'fade-in' ? 1 : 0,
              transform: 'scale(0.5)',
            }} />
          ) : weather ? (
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
          ) : isLoading ? (
            <CircularProgress size={24} />
          ) : null}
        </div>
      </header>

      <div className="Metrics-toggle">
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={showMetrics} onChange={() => setShowMetrics(!showMetrics)} color="primary" />}
            label="Metrics"
            labelPlacement="top"
          />
        </FormGroup>
        {showMetrics && nodesMetrics.map((node) => (
          <Fade in={showMetrics} key={node.nodeName} timeout={500}>
            <div>
              <BasicCard
                nodeName={node.nodeName}
                cpuUsage={node.cpuUsage}
                memoryUsage={node.memoryUsage}
              />
            </div>
          </Fade>
        ))}
        {showMetrics && podsMetrics.length > 0 && (
          <Fade in={showMetrics} timeout={500}>
            <div>
              <CustomTable podsMetrics={podsMetrics} requestCountMetrics={requestCountMetrics} />
            </div>
          </Fade>
        )}
      </div>
    </div>
  );
}

export default App;
