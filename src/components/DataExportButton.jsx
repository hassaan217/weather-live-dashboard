// src/components/DataExportButton.jsx
import React, { useState } from 'react';
import { FiDownload, FiFileText, FiCheck } from 'react-icons/fi';
import { useWeather } from '../context/WeatherContext';

const DataExportButton = () => {
  const { weatherData, forecastData, hourlyData, theme } = useWeather();
  const [exportStatus, setExportStatus] = useState('idle'); // idle, exporting, success

  const exportToCSV = () => {
    if (!weatherData || !forecastData) return;
    
    setExportStatus('exporting');
    
    try {
      // Create CSV content
      let csvContent = "data:text/csv;charset=utf-8,";
      
      // Add headers
      csvContent += "Date,Temperature (°C),Humidity (%),Wind Speed (m/s),Pressure (hPa),Weather Condition\n";
      
      // Add current weather
      const currentDate = new Date().toLocaleDateString();
      csvContent += `${currentDate},${weatherData.main.temp},${weatherData.main.humidity},${weatherData.wind.speed},${weatherData.main.pressure},"${weatherData.weather[0].description}"\n`;
      
      // Add forecast data
      forecastData.forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString();
        csvContent += `${date},${day.main.temp},${day.main.humidity},${day.wind.speed},${day.main.pressure},"${day.weather[0].description}"\n`;
      });
      
      // Add hourly data if available
      if (hourlyData) {
        csvContent += "\nHourly Forecast\n";
        csvContent += "Time,Temperature (°C),Humidity (%),Wind Speed (m/s),Precipitation (%)\n";
        
        hourlyData.forEach(hour => {
          const time = new Date(hour.dt * 1000).toLocaleTimeString();
          csvContent += `${time},${hour.main.temp},${hour.main.humidity},${hour.wind.speed},${(hour.pop || 0) * 100}\n`;
        });
      }
      
      // Create download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `weather-data-${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      
      // Trigger download
      link.click();
      document.body.removeChild(link);
      
      setExportStatus('success');
      setTimeout(() => setExportStatus('idle'), 3000);
    } catch (error) {
      console.error('Error exporting data:', error);
      setExportStatus('idle');
    }
  };

  return (
    <button
      onClick={exportToCSV}
      disabled={exportStatus === 'exporting' || !weatherData || !forecastData}
      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
        theme === 'dark' 
          ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
          : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {exportStatus === 'exporting' ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Exporting...
        </>
      ) : exportStatus === 'success' ? (
        <>
          <FiCheck className="mr-2" />
          Exported!
        </>
      ) : (
        <>
          <FiDownload className="mr-2" />
          <FiFileText className="mr-2" />
          Export to CSV
        </>
      )}
    </button>
  );
};

export default DataExportButton;