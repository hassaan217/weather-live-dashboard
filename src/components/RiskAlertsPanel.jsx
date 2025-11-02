// src/components/RiskAlertsPanel.jsx
import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { 
  FiAlertTriangle, 
  FiSun, 
  FiCloud, 
  FiCloudRain,
  FiWind
} from 'react-icons/fi';

const RiskAlertsPanel = () => {
  const { weatherData, forecastData, theme } = useWeather();

  if (!weatherData || !forecastData) return null;

  const { main, weather, wind } = weatherData;
  const temperature = main.temp;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const weatherCondition = weather[0].main;

  // Calculate risk scores
  const calculateRisks = () => {
    const risks = [];
    
    // Heat risk
    if (temperature > 30) {
      risks.push({
        type: 'Heat Risk',
        level: temperature > 35 ? 'High' : 'Medium',
        icon: <FiSun className="text-yellow-500" />,
        color: temperature > 35 ? 'bg-red-500' : 'bg-yellow-500',
        description: 'High temperatures can cause heat exhaustion'
      });
    }
    
    // Cold risk
    if (temperature < 5) {
      risks.push({
        type: 'Cold Risk',
        level: temperature < 0 ? 'High' : 'Medium',
        icon: <FiSnowflake className="text-blue-400" />,
        color: temperature < 0 ? 'bg-blue-500' : 'bg-blue-300',
        description: 'Low temperatures increase risk of hypothermia'
      });
    }
    
    // Wind risk
    if (windSpeed > 10) {
      risks.push({
        type: 'Wind Risk',
        level: windSpeed > 15 ? 'High' : 'Medium',
        icon: <FiWind className="text-gray-500" />,
        color: windSpeed > 15 ? 'bg-purple-500' : 'bg-purple-300',
        description: 'Strong winds can cause property damage'
      });
    }
    
    // Rain risk
    const rainProbs = forecastData.map(day => day.pop || 0);
    const maxRainProb = Math.max(...rainProbs);
    if (maxRainProb > 0.6) {
      risks.push({
        type: 'Rain Risk',
        level: maxRainProb > 0.8 ? 'High' : 'Medium',
        icon: <FiCloudRain className="text-blue-500" />,
        color: maxRainProb > 0.8 ? 'bg-blue-600' : 'bg-blue-400',
        description: `High chance of rain (${Math.round(maxRainProb * 100)}%)`
      });
    }
    
    // If no specific risks, add general weather condition
    if (risks.length === 0) {
      risks.push({
        type: 'Weather Condition',
        level: 'Normal',
        icon: weatherCondition === 'Clear' ? <FiSun className="text-yellow-500" /> : 
               weatherCondition === 'Clouds' ? <FiCloud className="text-gray-500" /> :
               <FiCloudRain className="text-blue-500" />,
        color: 'bg-green-500',
        description: `Current conditions: ${weather[0].description}`
      });
    }
    
    return risks;
  };

  const risks = calculateRisks();

  return (
    <div className={`p-6 rounded-xl shadow-lg ${
      theme === 'dark' ? 'bg-dark-card' : 'bg-light-card'
    }`}>
      <h2 className="text-xl font-bold mb-4">Risk & Alerts</h2>
      <div className="space-y-4">
        {risks.map((risk, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg border-l-4 ${risk.color} ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="flex items-start">
              <div className={`p-2 rounded-lg mr-4 ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                {risk.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{risk.type}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    risk.level === 'High' ? 'bg-red-500 text-white' :
                    risk.level === 'Medium' ? 'bg-yellow-500 text-gray-800' :
                    'bg-green-500 text-white'
                  }`}>
                    {risk.level}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{risk.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskAlertsPanel;