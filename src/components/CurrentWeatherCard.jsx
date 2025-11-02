// src/components/CurrentWeatherCard.jsx
import React from 'react';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';
import { useWeather } from '../context/WeatherContext';

const CurrentWeatherCard = () => {
  const { weatherData, theme } = useWeather();

  if (!weatherData) return null;

  const { name, main, weather, wind } = weatherData;
  const temperature = Math.round(main.temp);
  const feelsLike = Math.round(main.feels_like);
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const weatherCondition = weather[0].main;
  const weatherDescription = weather[0].description;

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <WiDaySunny className="text-yellow-400" size={64} />;
      case 'Rain':
        return <WiRain className="text-blue-400" size={64} />;
      case 'Clouds':
        return <WiCloudy className="text-gray-400" size={64} />;
      case 'Snow':
        return <WiSnow className="text-blue-200" size={64} />;
      case 'Thunderstorm':
        return <WiThunderstorm className="text-purple-400" size={64} />;
      case 'Fog' || 'Mist' || 'Haze':
        return <WiFog className="text-gray-300" size={64} />;
      default:
        return <WiDaySunny className="text-yellow-400" size={64} />;
    }
  };

  return (
    <div className={`p-6 rounded-xl shadow-lg ${
      theme === 'dark' ? 'bg-dark-card' : 'bg-light-card'
    }`}>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="mr-4">
            {getWeatherIcon(weatherCondition)}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="capitalize text-gray-500">{weatherDescription}</p>
          </div>
        </div>
        
        <div className="text-center md:text-right">
          <div className="text-5xl font-bold">{temperature}°C</div>
          <p className="text-gray-500">Feels like: {feelsLike}°C</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <p className="text-gray-500">Humidity</p>
          <p className="text-xl font-semibold">{humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500">Wind Speed</p>
          <p className="text-xl font-semibold">{windSpeed} m/s</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500">Min Temp</p>
          <p className="text-xl font-semibold">{Math.round(main.temp_min)}°C</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500">Max Temp</p>
          <p className="text-xl font-semibold">{Math.round(main.temp_max)}°C</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;