// src/components/WindHumidityChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts';
import { useWeather } from '../context/WeatherContext';

const WindHumidityChart = () => {
  const { forecastData, theme } = useWeather();

  if (!forecastData || forecastData.length === 0) return null;

  // Process forecast data for wind and humidity
  const data = forecastData.map(day => {
    const date = new Date(day.dt * 1000);
    return {
      name: date.toLocaleDateString('en-US', { weekday: 'short' }),
      humidity: day.main.humidity,
      wind: day.wind.speed,
    };
  });

  const textColor = theme === 'dark' ? '#E5E7EB' : '#374151';
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  return (
    <div className={`p-6 rounded-xl shadow-lg h-80 ${
      theme === 'dark' ? 'bg-dark-card' : 'bg-light-card'
    }`}>
      <h2 className="text-xl font-bold mb-4">Humidity & Wind Analytics</h2>
      <ResponsiveContainer width="100%" height="85%">
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="name" stroke={textColor} />
          <YAxis yAxisId="left" stroke={textColor} />
          <YAxis yAxisId="right" orientation="right" stroke={textColor} />
          <Tooltip 
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
              borderColor: theme === 'dark' ? '#4B5563' : '#E5E7EB',
              color: textColor,
            }}
          />
          <Legend />
          <Bar yAxisId="left" dataKey="humidity" name="Humidity (%)" fill="#60A5FA" />
          <Line yAxisId="right" type="monotone" dataKey="wind" name="Wind Speed (m/s)" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WindHumidityChart;