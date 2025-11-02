// src/components/ForecastChart.jsx
import React from 'react';
import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import { useWeather } from '../context/WeatherContext';

const ForecastChart = () => {
  const { forecastData, theme } = useWeather();

  if (!forecastData || forecastData.length === 0) return null;

  // Process forecast data for the chart
  const data = forecastData.map(day => {
    const date = new Date(day.dt * 1000);
    return {
      name: date.toLocaleDateString('en-US', { weekday: 'short' }),
      temp: Math.round(day.main.temp),
      minTemp: Math.round(day.main.temp_min),
      maxTemp: Math.round(day.main.temp_max),
      rain: day.pop ? Math.round(day.pop * 100) : 0, // Probability of precipitation
    };
  });

  const textColor = theme === 'dark' ? '#E5E7EB' : '#374151';
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  return (
    <div className={`p-6 rounded-xl shadow-lg h-96 ${
      theme === 'dark' ? 'bg-dark-card' : 'bg-light-card'
    }`}>
      <h2 className="text-xl font-bold mb-4">7-Day Temperature Forecast</h2>
      <ResponsiveContainer width="100%" height="85%">
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="name" stroke={textColor} />
          <YAxis stroke={textColor} />
          <Tooltip 
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
              borderColor: theme === 'dark' ? '#4B5563' : '#E5E7EB',
              color: textColor,
            }}
          />
          <Legend />
          <Bar dataKey="minTemp" name="Min Temp (°C)" fill="#60A5FA" />
          <Bar dataKey="maxTemp" name="Max Temp (°C)" fill="#EF4444" />
          <Line type="monotone" dataKey="temp" name="Avg Temp (°C)" stroke="#4F46E5" strokeWidth={2} dot={{ r: 4 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;