// src/components/AnalyticsCards.jsx
import React from 'react';
import { useWeather } from '../context/WeatherContext';

const AnalyticsCards = () => {
  const { forecastData, theme } = useWeather();

  if (!forecastData || forecastData.length === 0) return null;

  // Find hottest day
  const hottestDay = forecastData.reduce((prev, current) => 
    (prev.main.temp_max > current.main.temp_max) ? prev : current
  );
  
  // Find coldest day
  const coldestDay = forecastData.reduce((prev, current) => 
    (prev.main.temp_min < current.main.temp_min) ? prev : current
  );
  
  // Find highest wind day
  const highestWindDay = forecastData.reduce((prev, current) => 
    (prev.wind.speed > current.wind.speed) ? prev : current
  );
  
  // Find highest rain probability
  const highestRainDay = forecastData.reduce((prev, current) => 
    ((prev.pop || 0) > (current.pop || 0)) ? prev : current
  );

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className={`p-6 rounded-xl shadow-lg ${
      theme === 'dark' ? 'bg-dark-card' : 'bg-light-card'
    }`}>
      <h2 className="text-xl font-bold mb-4">Weather Analytics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`p-4 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <p className="text-sm text-gray-500">Hottest Day</p>
          <p className="text-xl font-bold">{Math.round(hottestDay.main.temp_max)}°C</p>
          <p className="text-sm">{formatDate(hottestDay.dt)}</p>
        </div>
        <div className={`p-4 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <p className="text-sm text-gray-500">Coldest Day</p>
          <p className="text-xl font-bold">{Math.round(coldestDay.main.temp_min)}°C</p>
          <p className="text-sm">{formatDate(coldestDay.dt)}</p>
        </div>
        <div className={`p-4 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <p className="text-sm text-gray-500">Highest Wind</p>
          <p className="text-xl font-bold">{Math.round(highestWindDay.wind.speed)} m/s</p>
          <p className="text-sm">{formatDate(highestWindDay.dt)}</p>
        </div>
        <div className={`p-4 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <p className="text-sm text-gray-500">Rain Risk</p>
          <p className="text-xl font-bold">{Math.round((highestRainDay.pop || 0) * 100)}%</p>
          <p className="text-sm">{formatDate(highestRainDay.dt)}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCards;