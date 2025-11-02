// src/components/RecentSearches.jsx
import React from 'react';
import { FiClock, FiMapPin, } from 'react-icons/fi';
import { useWeather } from '../context/WeatherContext';

const RecentSearches = () => {
  const { recentSearches, fetchWeatherData, theme } = useWeather();

  const handleSearchClick = (search) => {
    fetchWeatherData(search.city);
  };

  const isCoordinate = (city) => {
    return /^-?\d+\.\d+,\s*-?\d+\.\d+$/.test(city);
  };

  const formatCoordinate = (coord) => {
    const [lat, lng] = coord.split(',').map(c => parseFloat(c.trim()));
    return `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`;
  };

  return (
    <div className={`p-6 rounded-xl shadow-lg ${
      theme === 'dark' ? 'bg-dark-card' : 'bg-light-card'
    }`}>
      <div className="flex items-center mb-4">
        <FiClock className="mr-2 text-weather-primary" />
        <h2 className="text-xl font-bold">Recent Searches</h2>
      </div>
      
      {recentSearches.length === 0 ? (
        <p className="text-gray-500">No recent searches yet.</p>
      ) : (
        <div className="space-y-3">
          {recentSearches.map((search, index) => (
            <div 
              key={index} 
              onClick={() => handleSearchClick(search)}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {isCoordinate(search.city) ? (
                <Navigation className="mr-3 text-weather-secondary" />
              ) : (
                <FiMapPin className="mr-3 text-weather-secondary" />
              )}
              <div className="flex-1">
                <p className="font-medium">
                  {isCoordinate(search.city) ? formatCoordinate(search.city) : search.city}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(search.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentSearches;