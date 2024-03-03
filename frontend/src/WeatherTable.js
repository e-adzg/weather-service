// WeatherTable.js
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const WeatherTable = ({ weather }) => {
  const rows = [
    { key: 'Description', value: weather.weather[0].description },
    { key: 'Temperature', value: `${weather.main.temp}°C (Feels like: ${weather.main.feels_like}°C)` },
    { key: 'Min Temperature', value: `${weather.main.temp_min}°C` },
    { key: 'Max Temperature', value: `${weather.main.temp_max}°C` },
    { key: 'Pressure', value: `${weather.main.pressure} hPa` },
    { key: 'Humidity', value: `${weather.main.humidity}%` },
    { key: 'Visibility', value: `${weather.visibility / 1000} km` },
    { key: 'Wind', value: `${weather.wind.speed} m/s, Direction: ${weather.wind.deg}°` },
    { key: 'Cloudiness', value: `${weather.clouds.all}%` },
    { key: 'Sunrise', value: new Date(weather.sys.sunrise * 1000).toLocaleTimeString() },
    { key: 'Sunset', value: new Date(weather.sys.sunset * 1000).toLocaleTimeString() }
  ];

  return (
    <TableContainer component={Paper} elevation={8} sx={{ borderRadius: '20px', marginTop: '20px' }}>
      <Table sx={{ minWidth: 650 }} aria-label="weather table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                {row.key}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WeatherTable;