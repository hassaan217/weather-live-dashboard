// src/components/SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiSun, FiMoon, FiX, FiClock } from 'react-icons/fi';
import { useWeather } from '../context/WeatherContext';

const SearchBar = () => {
  const { fetchWeatherData, theme, toggleTheme, recentSearches } = useWeather();
  const [city, setCity] = useState('');
  const [showRecent, setShowRecent] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowRecent(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city);
      setCity('');
      setShowRecent(false);
    }
  };

  const handleRecentClick = (cityName) => {
    setCity(cityName);
    setShowRecent(false);
    fetchWeatherData(cityName);
  };

  const clearSearch = () => {
    setCity('');
  };

  return (
    <div className={`w-full p-6 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-90 ${
      theme === 'dark' ? 'bg-dark-card' : 'bg-light-card'
    }`}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-weather-primary">Weather Analytics Dashboard</h1>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow" ref={dropdownRef}>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setShowRecent(e.target.value.length > 0);
                }}
                onFocus={() => setShowRecent(city.length > 0)}
                placeholder="Search for a city..."
                className={`w-full py-3 px-4 pl-12 pr-10 rounded-lg focus:ring-2 focus:ring-weather-primary backdrop-blur-sm ${
                  theme === 'dark' 
                    ? 'bg-dark-bg bg-opacity-70 text-white border-gray-600' 
                    : 'bg-white bg-opacity-70 text-gray-800 border-gray-300'
                }`}
              />
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              {city && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX />
                </button>
              )}
            </form>

            {/* Recent searches dropdown */}
            {showRecent && recentSearches.length > 0 && (
              <div className={`absolute z-10 w-full mt-1 rounded-lg shadow-lg backdrop-blur-sm ${
                theme === 'dark' ? 'bg-gray-800 bg-opacity-90' : 'bg-white bg-opacity-90'
              }`}>
                <div className="py-1">
                  <div className={`px-4 py-2 text-xs font-semibold ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Recent Searches
                  </div>
                  {recentSearches.slice(0, 5).map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentClick(search.city)}
                      className={`flex items-center w-full px-4 py-2 text-left hover:${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                      }`}
                    >
                      <FiClock className="mr-3 text-gray-400" />
                      <div>
                        <div className="font-medium">{search.city}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(search.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;