// src/components/WeatherInsights.jsx
import React from 'react';
import { useWeather } from '../context/WeatherContext';

const WeatherInsights = () => {
  const { weatherData, forecastData, theme } = useWeather();

  if (!weatherData || !forecastData) return null;

  // Generate insights based on weather data
  const generateInsights = () => {
    const insights = [];
    
    // Current weather condition
    const condition = weatherData.weather[0].main;
    const description = weatherData.weather[0].description;
    
    // Temperature analysis
    const currentTemp = weatherData.main.temp;
    const feelsLike = weatherData.main.feels_like;
    const tempDiff = Math.abs(currentTemp - feelsLike);
    
    // Forecast analysis
    const temps = forecastData.map(day => day.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
    
    // Rain probability
    const rainProbs = forecastData.map(day => day.pop || 0);
    const maxRainProb = Math.max(...rainProbs);
    
    // Wind analysis
    const winds = forecastData.map(day => day.wind.speed);
    const maxWind = Math.max(...winds);
    
    // Generate insights
    if (condition === 'Clear') {
      insights.push(`Expect clear skies today. Temperature will drop by ${Math.round(tempDiff)}°C during the evening.`);
    } else if (condition === 'Rain') {
      insights.push(`Rain expected today. Don't forget your umbrella!`);
    } else if (condition === 'Clouds') {
      insights.push(`Cloudy skies today with no precipitation expected.`);
    }
    
    if (maxRainProb > 0.5) {
      insights.push(`High chance of rain (${Math.round(maxRainProb * 100)}%) on ${forecastData[rainProbs.indexOf(maxRainProb)].dt_txt.split(' ')[0]}.`);
    }
    
    if (maxWind > 10) {
      insights.push(`Strong winds expected, reaching up to ${Math.round(maxWind)} m/s.`);
    }
    
    insights.push(`The average temperature over the next 7 days will be ${Math.round(avgTemp)}°C, with a high of ${Math.round(maxTemp)}°C and a low of ${Math.round(minTemp)}°C.`);
    
    return insights;
  };

  const insights = generateInsights();

  return (
    <div className={`p-6 rounded-xl shadow-lg ${
      theme === 'dark' ? 'bg-dark-card' : 'bg-light-card'
    }`}>
      <h2 className="text-xl font-bold mb-4">Weather Insights</h2>
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 text-weather-primary mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="ml-3">{insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherInsights;