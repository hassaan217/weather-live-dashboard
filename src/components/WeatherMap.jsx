// src/components/WeatherMap.jsx
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useWeather } from '../context/WeatherContext';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet using CDN
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to update map view when position changes
function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center && map) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

const WeatherMap = () => {
  const { geoData, fetchWeatherData, theme } = useWeather();
  const [position, setPosition] = useState([51.505, -0.09]); // Default to London
  const [mapKey, setMapKey] = useState(0); // Key to force re-render map
  const mapRef = useRef(null);

  useEffect(() => {
    // Check if geoData and geoData.coord exist before accessing them
    if (geoData && geoData.coord && geoData.coord.lat && geoData.coord.lon) {
      const newPosition = [geoData.coord.lat, geoData.coord.lon];
      setPosition(newPosition);
      // Force re-render of map by changing key
      setMapKey(prev => prev + 1);
    }
  }, [geoData]);

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    
    try {
      // Show loading indicator
      const loadingDiv = document.createElement('div');
      loadingDiv.className = 'loading-indicator';
      loadingDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 20px;
        border-radius: 8px;
        z-index: 10000;
      `;
      loadingDiv.textContent = 'Fetching weather data...';
      document.body.appendChild(loadingDiv);
      
      // Reverse geocoding to get city name
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      
      // Remove loading indicator
      document.body.removeChild(loadingDiv);
      
      if (data && data.address) {
        // Try to get city name from the response
        const city = data.address.city || 
                   data.address.town || 
                   data.address.village || 
                   data.address.county || 
                   'Unknown Location';
        
        // Fetch weather data for this location
        fetchWeatherData(city);
      } else {
        // Fallback to coordinates if no city name found
        fetchWeatherData(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      // Remove loading indicator if still exists
      const loadingIndicator = document.querySelector('.loading-indicator');
      if (loadingIndicator) {
        document.body.removeChild(loadingIndicator);
      }
      // Fallback to coordinates
      fetchWeatherData(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    }
  };

  // Check if geoData and its required properties exist before rendering
  if (!geoData || !geoData.coord || !geoData.name || !geoData.sys) {
    return (
      <div className={`p-6 rounded-xl shadow-lg h-96 ${
        theme === 'dark' ? 'bg-dark-card' : 'bg-light-card'
      }`}>
        <h2 className="text-xl font-bold mb-4">Interactive Weather Map</h2>
        <div className="flex items-center justify-center h-[85%]">
          <p>Loading map data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-xl shadow-lg h-96 ${
      theme === 'dark' ? 'bg-dark-card' : 'bg-light-card'
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Interactive Weather Map</h2>
        <div className="text-sm text-gray-500">
          Click anywhere to get weather for that location
        </div>
      </div>
      
      <div className="relative h-[85%] w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <MapContainer 
          key={mapKey}
          center={position} 
          zoom={12} 
          style={{ height: '100%', width: '100%' }}
          onClick={handleMapClick}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              <div className="text-center">
                <div className="font-bold">{geoData.name}, {geoData.sys.country}</div>
                <div className="text-sm mt-1">
                  {geoData.weather && geoData.weather[0] ? geoData.weather[0].description : 'Weather data unavailable'}
                </div>
                <div className="text-sm mt-1">
                  Temp: {geoData.main ? `${Math.round(geoData.main.temp)}°C` : 'Temperature unavailable'}
                </div>
              </div>
            </Popup>
          </Marker>
          <MapController center={position} />
        </MapContainer>
      </div>
      
      <div className="mt-3 text-xs text-gray-500 flex justify-between">
        <span>Lat: {position[0].toFixed(4)}</span>
        <span>Lng: {position[1].toFixed(4)}</span>
      </div>
    </div>
  );
};

export default WeatherMap;                             