import React, { createContext, useState, useEffect } from 'react';
import { getCurrentWeather, getForecast, getHourlyForecast, getGeoLocation } from '../services/api';

export const WeatherContext = createContext();


export const WeatherProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [geoData, setGeoData] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }

    // Fetch default city on initial load if no weather data is present
    // Default: Karachi (24.8607, 67.0011 or by name 'Karachi')
    // Prefer name to go through normal flow
    if (!weatherData) {
      fetchWeatherData('Karachi');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const fetchWeatherData = async (city) => {
    // Use Karachi by default when no city is provided
    const effectiveCity = city && city.trim() ? city : 'Karachi';

    setLoading(true);
    setError(null);
    try {
      // Check if city is coordinates (lat,lng format)
      const coordinatesRegex = /^-?\d+\.\d+,\s*-?\d+\.\d+$/;
      let cityName = effectiveCity;
      
      if (coordinatesRegex.test(effectiveCity)) {
        // If it's coordinates, we need to get the city name
        const [lat, lng] = effectiveCity.split(',').map(coord => parseFloat(coord.trim()));
        const geoResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`
        );
        const geoData = await geoResponse.json();
        
        if (geoData && geoData.address) {
          cityName = geoData.address.city || 
                     geoData.address.town || 
                     geoData.address.village || 
                     geoData.address.county || 
                     'Unknown Location';
        }
      }
      
      const current = await getCurrentWeather(effectiveCity);
      setWeatherData(current);

      const forecast = await getForecast(effectiveCity);
      setForecastData(forecast.list.slice(0, 7)); // 7-day forecast

      const hourly = await getHourlyForecast(effectiveCity);
      setHourlyData(hourly.list.slice(0, 24)); // 24-hour forecast

      const geo = await getGeoLocation(effectiveCity);
      setGeoData(geo);

      // Update recent searches
      const newSearch = { 
        city: cityName, 
        timestamp: new Date().toISOString(),
        coordinates: effectiveCity
      };
      const updatedSearches = [newSearch, ...recentSearches.filter(s => s.city !== cityName)].slice(0, 10);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider value={{
      theme,
      toggleTheme,
      weatherData,
      forecastData,
      hourlyData,
      geoData,
      recentSearches,
      loading,
      error,
      fetchWeatherData
    }}>
      {children}
    </WeatherContext.Provider>
  );
};

// ✅ Add this
export const useWeather = () => React.useContext(WeatherContext);
