// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { useWeather } from '../context/WeatherContext';
import SearchBar from '../components/SearchBar';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import ForecastChart from '../components/ForecastChart';
import HourlyChart from '../components/HourlyChart';
import WindHumidityChart from '../components/WindHumidityChart';
import WeatherMap from '../components/WeatherMap';
import RecentSearches from '../components/RecentSearches';
import WeatherInsights from '../components/WeatherInsights';
import AnalyticsCards from '../components/AnalyticsCards';
import KPICards from '../components/KPICards';
import RiskAlertsPanel from '../components/RiskAlertsPanel';
import ClimateComparisonPanel from '../components/ClimateComparisonPanel';
import DataExportButton from '../components/DataExportButton';
import LoadingSkeleton from '../components/LoadingSkeleton';
import AnimatedBackground from '../components/AnimatedBackground';
import Footer from '../components/Footer';
import ErrorBoundary from '../components/ErrorBoundary';

const Home = () => {
  const {
    theme,
    loading,
    error,
    weatherData,
    forecastData,
    hourlyData,
    geoData,
  } = useWeather();

  // Apply theme to the entire page
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.backgroundColor = '#1F2937';
      root.style.color = '#E5E7EB';
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#F9FAFB';
      root.style.color = '#374151';
    }
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <ErrorBoundary theme={theme}>
        <AnimatedBackground theme={theme} />
      </ErrorBoundary>
      
      <div className="relative z-10 flex-grow">
        <div className="container mx-auto px-4 py-8">
          <SearchBar />

          {loading && <LoadingSkeleton />}

          {error && (
            <div className={`p-4 mb-6 rounded-lg ${
              theme === 'dark' ? 'bg-red-900' : 'bg-red-100'
            }`}>
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {weatherData && (
            <>
              <div className="mb-6">
                <CurrentWeatherCard />
              </div>
              
              <div className="mb-6">
                <KPICards />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  {forecastData && <ForecastChart />}
                </div>
                <div>
                  {weatherData && <WeatherInsights />}
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  {hourlyData && <HourlyChart />}
                </div>
                <div>
                  <RiskAlertsPanel />
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  {forecastData && <WindHumidityChart />}
                </div>
                <div>
                  {forecastData && <AnalyticsCards />}
                </div>
              </div>
              
              <div className="mb-6">
                <ClimateComparisonPanel />
              </div>
              
              <div className="mb-6">
                <ErrorBoundary theme={theme}>
                  <WeatherMap />
                </ErrorBoundary>
              </div>
              
              <div className="flex justify-between items-center">
                <RecentSearches />
                <DataExportButton />
              </div>
            </>
          )}
        </div>
      </div>
      
      <Footer theme={theme} />
    </div>
  );
};

export default Home;