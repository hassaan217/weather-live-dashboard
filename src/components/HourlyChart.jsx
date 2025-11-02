// src/components/HourlyChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useWeather } from '../context/WeatherContext';

const HourlyChart = () => {
  const { hourlyData, theme } = useWeather();

  if (!hourlyData || hourlyData.length === 0) return null;

  // Process hourly data
  const data = hourlyData.map(hour => {
    const time = new Date(hour.dt * 1000);
    return {
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      temp: Math.round(hour.main.temp),
      rain: hour.pop ? Math.round(hour.pop * 100) : 0,
    };
  });

  const textColor = theme === 'dark' ? '#E5E7EB' : '#374151';
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  return (
    <div className={`p-6 rounded-xl shadow-lg h-80 ${
      theme === 'dark' ? 'bg-dark-card' : 'bg-light-card'
    }`}>
      <h2 className="text-xl font-bold mb-4">24-Hour Temperature Trend</h2>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="time" stroke={textColor} />
          <YAxis stroke={textColor} />
          <Tooltip 
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
              borderColor: theme === 'dark' ? '#4B5563' : '#E5E7EB',
              color: textColor,
            }}
          />
          <Line type="monotone" dataKey="temp" name="Temperature (°C)" stroke="#4F46E5" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HourlyChart;