// App.js
import React, { useState, useEffect } from 'react';
import { fetchWeather, fetchNodesMetrics, fetchPodsMetrics, fetchRequestCountMetrics } from './WeatherService';
import NodeCard from './NodeCard';
import PodMetricTable from './PodMetricTable';
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
import WeatherTable from './WeatherTable';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import avatarImage from './assets/image3.jpg';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [nodesMetrics, setNodesMetrics] = useState([]);
  const [showMetrics, setShowMetrics] = useState(false);
  const [podsMetrics, setPodsMetrics] = useState([]);
  const [requestCountMetrics, setRequestCountMetrics] = useState({});
  const [fadeState, setFadeState] = useState('fade-in');
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(image1);
  const [sliderValue, setSliderValue] = useState(0);

  // Function to handle sending weather requests
  const handleSendRequests = async () => {
    for (let i = 0; i < sliderValue; i++) {
      try {
        const response = await fetchWeather('Lucan');
        console.log(response);
      } catch (error) {
        console.error(`Error sending request ${i + 1}:`, error);
      }
    }
  };
  
  // Theme customization
  const theme = createTheme({
    typography: {
      fontFamily: "'M PLUS 1p', sans-serif",
      body1: {
        fontWeight: 700,
      },
    },
  });
  
  // Handle slider value change
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  // Image GIF effect
  useEffect(() => {
    let intervalId;

    if (!weather && !isLoading) {
      intervalId = setInterval(() => {
        setCurrentImage(current => (current === image1 ? image2 : image1));
      }, 1000);
    } else {
    }

    return () => clearInterval(intervalId);
  }, [weather, isLoading]);

  // Fetching metrics data
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

  // Fetch weather data on submit
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
        setFadeState('fade-in');
        return;
      }

      try {
        const data = await fetchWeather(city);
        if (data.cod !== 200) {
          throw new Error(data.message || "Error fetching weather data.");
        }
        setWeather(data);
      } catch (error) {
        console.error(error);
        setError('Check the spelling of the city.');
      }
      setIsLoading(false);
      setFadeState('fade-in');
    }, FADE_DURATION);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">

      {/* AVATAR */}
      <a href="https://github.com/e-adzg" target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', top: 20, left: 20 }}>
          <Avatar
            alt="e-adzg"
            src={avatarImage}
            sx={{ width: 56, height: 56, border: '2px solid white', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)'}}
          />
        </a>

        {/* HEADER - Contains search and weather display */}
        <header className="App-header">

          {/* Search box and search icon */}
          <Box
            component="form"
            onSubmit={handleFetchWeather}
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
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
                '& label': { color: 'white' },
                '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'white' },
                '& .MuiInput-input': { color: 'white' },
                '& .MuiFormHelperText-root': { color: 'white' },
                '& .Mui-error': { color: '#f44336' }
              }}
            />
            <IconButton type="submit" aria-label="search" color="primary" onClick={handleFetchWeather}>
              {isLoading ? <CircularProgress size={24} /> : <SearchIcon />}
            </IconButton>
          </Box>

          {/* WEATHER DISPLAY - Displays weather info, or else displays GIF, if loading display loading icon */}
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
                <h2 className="bold-text">Weather in {weather.name}, {weather.sys.country}</h2>
                <WeatherTable weather={weather} />
              </div>
            ) : isLoading ? (
              <CircularProgress size={24} />
            ) : null}
          </div>
        </header>

        {/* METRICS TOGGLE - Contains all metrics related */}
        <div className="Metrics-toggle">
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={showMetrics} onChange={() => setShowMetrics(!showMetrics)} color="primary" />}
              label="Metrics"
              labelPlacement="top"
            />
          </FormGroup>

          {/* Node Metrics */}
          {showMetrics && nodesMetrics.map((node) => (
            <Fade in={showMetrics} key={node.nodeName} timeout={500}>
              <div>
                <NodeCard
                  nodeName={node.nodeName}
                  cpuUsage={node.cpuUsage}
                  memoryUsage={node.memoryUsage}
                />
              </div>
            </Fade>
          ))}

          {/* Pod Metrics */}
          {showMetrics && podsMetrics.length > 0 && (
            <Fade in={showMetrics} timeout={500}>
              <div>
                <PodMetricTable podsMetrics={podsMetrics} requestCountMetrics={requestCountMetrics} />
              </div>
            </Fade>
          )}

          {/* Send Requests Slider and Button */}
          {showMetrics && (
            <Fade in={showMetrics} timeout={500}>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: '100px' }}>
                  <Slider
                    sx={{ width: 200 }}
                    step={10}
                    marks={[
                      { value: 0, label: <Typography sx={{ color: 'white' }}>0</Typography> },
                      { value: 100, label: <Typography sx={{ color: 'white' }}>100</Typography> },
                    ]}
                    value={sliderValue}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                    onChange={handleSliderChange}
                  />
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={() => handleSendRequests(sliderValue)}
                  >
                    SEND REQUESTS
                  </Button>
                </Box>
            </Fade>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
