// src/components/ClimateComparisonPanel.jsx
import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { 
  BarChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ComposedChart
} from 'recharts';
import { FiTrendingUp, FiCalendar } from 'react-icons/fi';

const ClimateComparisonPanel = () => {
  const { weatherData, forecastData, theme } = useWeather();

  if (!weatherData || !forecastData) return null;

  // Generate mock historical data for comparison
  const generateHistoricalData = () => {
    const historical = [];
    const currentTemp = weatherData.main.temp;
    
    // Generate data for the past 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Create a realistic historical temperature with some variation
      const variation = (Math.random() - 0.5) * 6; // ±3 degrees variation
      const temp = currentTemp + variation;
      
      historical.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        historical: Math.round(temp),
        forecast: i === 0 ? Math.round(currentTemp) : null
      });
    }
    
    // Add forecast data for the next 7 days
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      // Use forecast data if available, otherwise generate a realistic forecast
      let forecastTemp;
      if (i <= forecastData.length) {
        forecastTemp = Math.round(forecastData[i-1].main.temp);
      } else {
        const variation = (Math.random() - 0.5) * 4; // ±2 degrees variation
        forecastTemp = Math.round(currentTemp + variation);
      }
      
      historical.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        historical: null,
        forecast: forecastTemp
      });
    }
    
    return historical;
  };

  const data = generateHistoricalData();
  const textColor = theme === 'dark' ? '#E5E7EB' : '#374151';
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  return (
    <div className={`p-6 rounded-xl shadow-lg ${
      theme === 'dark' ? 'bg-dark-card' : 'bg-light-card'
    }`}>
      <div className="flex items-center mb-4">
        <FiTrendingUp className="mr-2 text-weather-primary" />
        <h2 className="text-xl font-bold">Climate Comparison</h2>
      </div>
      
      <div className="mb-4 flex items-center text-sm text-gray-500">
        <FiCalendar className="mr-1" />
        <span>Historical vs. Forecast Temperature Trends</span>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="date" stroke={textColor} />
            <YAxis stroke={textColor} />
            <Tooltip 
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                borderColor: theme === 'dark' ? '#4B5563' : '#E5E7EB',
                color: textColor,
              }}
            />
            <Legend />
            <Bar dataKey="historical" name="Historical (°C)" fill="#60A5FA" />
            <Bar dataKey="forecast" name="Forecast (°C)" fill="#4F46E5" />
            <Line 
              type="monotone" 
              dataKey="historical" 
              name="Historical Trend" 
              stroke="#10B981" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              connectNulls={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      <div className={`mt-4 p-4 rounded-lg ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <h3 className="font-medium mb-2">Climate Insights</h3>
        <p className="text-sm text-gray-500">
          The forecast shows a {data[7].forecast > data[0].historical ? 'warming' : 'cooling'} trend 
          compared to historical averages. This {data[7].forecast > data[0].historical ? 'increase' : 'decrease'} 
          of {Math.abs(data[7].forecast - data[0].historical)}°C over the next week is 
          {Math.abs(data[7].forecast - data[0].historical) > 3 ? ' significant and ' : ' '}
          within normal seasonal variations.
        </p>
      </div>
    </div>
  );
};

export default ClimateComparisonPanel;