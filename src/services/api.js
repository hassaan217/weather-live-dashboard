// src/services/api.js
import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/api';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://live-weather-dash-backend.vercel.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get current weather for a city or coordinates
export const getCurrentWeather = async (location) => {
  try {
    // Check if location is coordinates (lat,lng format)
    const coordinatesRegex = /^-?\d+\.\d+,\s*-?\d+\.\d+$/;
    let url;
    
    if (coordinatesRegex.test(location)) {
      const [lat, lon] = location.split(',').map(coord => parseFloat(coord.trim()));
      url = `/weather/current?lat=${lat}&lon=${lon}`;
    } else {
      url = `/weather/current?city=${encodeURIComponent(location)}`;
    }
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

// Get 7-day forecast for a city or coordinates
export const getForecast = async (location) => {
  try {
    const coordinatesRegex = /^-?\d+\.\d+,\s*-?\d+\.\d+$/;
    let url;
    
    if (coordinatesRegex.test(location)) {
      const [lat, lon] = location.split(',').map(coord => parseFloat(coord.trim()));
      url = `/weather/forecast/daily?lat=${lat}&lon=${lon}`;
    } else {
      url = `/weather/forecast/daily?city=${encodeURIComponent(location)}`;
    }
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

// Get hourly forecast for a city or coordinates
export const getHourlyForecast = async (location) => {
  try {
    const coordinatesRegex = /^-?\d+\.\d+,\s*-?\d+\.\d+$/;
    let url;
    
    if (coordinatesRegex.test(location)) {
      const [lat, lon] = location.split(',').map(coord => parseFloat(coord.trim()));
      url = `/weather/forecast/hourly?lat=${lat}&lon=${lon}`;
    } else {
      url = `/weather/forecast/hourly?city=${encodeURIComponent(location)}`;
    }
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching hourly forecast:', error);
    throw error;
  }
};

// Get geographical data for a city or coordinates
export const getGeoLocation = async (location) => {
  try {
    const coordinatesRegex = /^-?\d+\.\d+,\s*-?\d+\.\d+$/;
    let url;
    
    if (coordinatesRegex.test(location)) {
      const [lat, lon] = location.split(',').map(coord => parseFloat(coord.trim()));
      url = `/geo/location?lat=${lat}&lon=${lon}`;
    } else {
      url = `/geo/location?city=${encodeURIComponent(location)}`;
    }
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching geo location:', error);
    throw error;
  }
};