// src/components/KPICards.jsx
import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { 
  FiThermometer, 
  FiDroplet, 
  FiWind, 
  FiActivity,
  FiSun,
  FiCloudRain,
  FiAlertTriangle
} from 'react-icons/fi';

const KPICards = () => {
  const { weatherData, theme } = useWeather();

  if (!weatherData) return null;

  const { main, wind, weather } = weatherData;
  const temperature = Math.round(main.temp);
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const pressure = main.pressure;
  const weatherCondition = weather[0].main;

  // Determine alert level based on weather conditions
  const getAlertLevel = () => {
    if (temperature > 35) return { level: 'high', color: 'bg-red-500', text: 'text-red-500' };
    if (temperature < 0) return { level: 'high', color: 'bg-blue-500', text: 'text-blue-500' };
    if (humidity > 80) return { level: 'medium', color: 'bg-yellow-500', text: 'text-yellow-500' };
    return { level: 'low', color: 'bg-green-500', text: 'text-green-500' };
  };

  const alert = getAlertLevel();

  const kpiData = [
    {
      title: 'Temperature',
      value: `${temperature}°C`,
      icon: <FiThermometer className="text-blue-500" />,
      change: '+2°C from yesterday',
      changeType: 'positive'
    },
    {
      title: 'Humidity',
      value: `${humidity}%`,
      icon: <FiDroplet className="text-blue-400" />,
      change: '-5% from yesterday',
      changeType: 'negative'
    },
    {
      title: 'Wind Speed',
      value: `${windSpeed} m/s`,
      icon: <FiWind className="text-gray-500" />,
      change: 'Same as yesterday',
      changeType: 'neutral'
    },
    {
      title: 'Pressure',
      value: `${pressure} hPa`,
      icon: <FiActivity className="text-purple-500" />,
      change: '+3 hPa from yesterday',
      changeType: 'positive'
    }
  ];

  return (
    <div className={`p-6 rounded-xl shadow-lg ${
      theme === 'dark' ? 'bg-dark-card' : 'bg-light-card'
    }`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Weather KPIs</h2>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <span className={alert.text}>
            {alert.level === 'high' ? <FiAlertTriangle className="inline mr-1" /> : 
             alert.level === 'medium' ? <FiCloudRain className="inline mr-1" /> : 
             <FiSun className="inline mr-1" />}
            {alert.level.toUpperCase()} RISK
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{kpi.title}</p>
                <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                <p className={`text-xs mt-2 ${
                  kpi.changeType === 'positive' ? 'text-green-500' : 
                  kpi.changeType === 'negative' ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {kpi.change}
                </p>
              </div>
              <div className={`p-2 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                {kpi.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KPICards;