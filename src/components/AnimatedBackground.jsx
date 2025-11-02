// src/components/AnimatedBackground.jsx
import React, { useEffect, useState } from 'react';
import { 
  WiDaySunny, 
  WiCloudy, 
  WiThunderstorm, 
  WiMoonFull
} from 'react-icons/wi';

const AnimatedBackground = ({ theme }) => {
  const [weatherType, setWeatherType] = useState('clear');
  const [timeOfDay, setTimeOfDay] = useState('day');
  
  // Simulate changing weather conditions
  useEffect(() => {
    const weatherTypes = ['clear', 'cloudy', 'rainy', 'snowy', 'stormy'];
    const times = ['day', 'night'];
    
    const weatherInterval = setInterval(() => {
      const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
      setWeatherType(randomWeather);
    }, 10000); // Change weather every 10 seconds
    
    const timeInterval = setInterval(() => {
      const randomTime = times[Math.floor(Math.random() * times.length)];
      setTimeOfDay(randomTime);
    }, 20000); // Change time every 20 seconds
    
    return () => {
      clearInterval(weatherInterval);
      clearInterval(timeInterval);
    };
  }, []);

  // Render weather elements based on current weather type
  const renderWeatherElements = () => {
    try {
      switch (weatherType) {
        case 'cloudy':
          return (
            <>
              <div className="absolute top-20 left-10 animate-float-slow">
                <WiCloudy className="text-gray-300 dark:text-gray-400" size={100} />
              </div>
              <div className="absolute top-40 right-1/4 animate-float-medium">
                <WiCloudy className="text-gray-200 dark:text-gray-500" size={80} />
              </div>
              <div className="absolute bottom-40 left-1/3 animate-float-fast">
                <WiCloudy className="text-gray-400 dark:text-gray-600" size={90} />
              </div>
            </>
          );
        case 'rainy':
          return (
            <>
              <div className="absolute top-20 left-10 animate-float-slow">
                <WiCloudy className="text-gray-400 dark:text-gray-500" size={100} />
              </div>
              <div className="absolute top-40 right-1/4 animate-float-medium">
                <WiCloudy className="text-gray-500 dark:text-gray-600" size={80} />
              </div>
              {/* Rain drops */}
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-rain"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    opacity: Math.random() * 0.7 + 0.3
                  }}
                >
                  <div className="w-0.5 h-5 bg-blue-400 rounded-full"></div>
                </div>
              ))}
            </>
          );
        case 'snowy':
          return (
            <>
              <div className="absolute top-20 left-10 animate-float-slow">
                <WiCloudy className="text-gray-300 dark:text-gray-500" size={100} />
              </div>
              <div className="absolute top-40 right-1/4 animate-float-medium">
                <WiCloudy className="text-gray-400 dark:text-gray-600" size={80} />
              </div>
              {/* Snow flakes */}
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-snow"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    opacity: Math.random() * 0.8 + 0.2
                  }}
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              ))}
            </>
          );
        case 'stormy':
          return (
            <>
              <div className="absolute top-20 left-10 animate-float-slow">
                <WiCloudy className="text-gray-600 dark:text-gray-700" size={100} />
              </div>
              <div className="absolute top-40 right-1/4 animate-float-medium">
                <WiThunderstorm className="text-purple-500 dark:text-purple-400" size={80} />
              </div>
              {/* Lightning effect */}
              <div className="absolute inset-0 animate-lightning">
                <div className="absolute inset-0 bg-white opacity-0"></div>
              </div>
              {/* Rain drops */}
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-rain-heavy"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 1}s`,
                    opacity: Math.random() * 0.8 + 0.2
                  }}
                >
                  <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                </div>
              ))}
            </>
          );
        default: // clear
          return (
            <>
              <div className="absolute top-20 left-10 animate-float-slow">
                <WiCloudy className="text-gray-200 dark:text-gray-600" size={60} />
              </div>
              <div className="absolute top-40 right-1/4 animate-float-medium">
                <WiCloudy className="text-gray-100 dark:text-gray-500" size={50} />
              </div>
            </>
          );
      }
    } catch (error) {
      console.error('Error rendering weather elements:', error);
      return null;
    }
  };

  // Render celestial body based on theme and time
  const renderCelestialBody = () => {
    try {
      if (theme === 'light') {
        return (
          <div className="absolute top-10 right-10 transition-all duration-1000">
            <WiDaySunny className="text-yellow-300 animate-pulse-slow" size={150} />
            {/* Sun rays */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-pulse"
                style={{
                  top: '50%',
                  left: '50%',
                  width: '200px',
                  height: '2px',
                  background: 'linear-gradient(to right, transparent, rgba(255, 220, 0, 0.3), transparent)',
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                  transformOrigin: 'left center'
                }}
              ></div>
            ))}
          </div>
        );
      } else {
        return (
          <div className="absolute top-10 right-10 transition-all duration-1000">
            <div className="relative">
              {/* Enhanced moon with purple glow */}
              <div className="absolute inset-0 rounded-full bg-purple-500 opacity-20 blur-2xl"></div>
              <div className="absolute inset-0 rounded-full bg-indigo-500 opacity-15 blur-3xl"></div>
              <WiMoonFull className="text-gray-300 animate-glow relative z-10" size={150} />
              
              {/* Stars with purple tint */}
              {[...Array(150)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-twinkle"
                  style={{
                    top: `${Math.random() * 200 - 50}%`,
                    left: `${Math.random() * 200 - 50}%`,
                    width: `${Math.random() * 3 + 1}px`,
                    height: `${Math.random() * 3 + 1}px`,
                    backgroundColor: Math.random() > 0.7 ? '#e9d5ff' : 'white', // Mix of purple tinted and white stars
                    borderRadius: '50%',
                    animationDelay: `${Math.random() * 5}s`,
                    opacity: Math.random() * 0.8 + 0.2,
                    boxShadow: Math.random() > 0.5 ? '0 0 5px #e9d5ff' : 'none'
                  }}
                ></div>
              ))}
              
              {/* Purple nebula effect */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-900 rounded-full opacity-10 blur-2xl animate-pulse-slow"></div>
              <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-indigo-900 rounded-full opacity-10 blur-xl animate-pulse-medium"></div>
            </div>
          </div>
        );
      }
    } catch (error) {
      console.error('Error rendering celestial body:', error);
      return null;
    }
  };

  return (
    <div 
      className="fixed inset-0 -z-10 overflow-hidden transition-colors duration-1000"
      style={{ 
        backgroundColor: theme === 'light' ? '#f3f4f6' : '#172130' 
      }}
    >
      {/* Celestial body (sun/moon) */}
      {renderCelestialBody()}
      
      {/* Weather elements */}
      {renderWeatherElements()}
      
      {/* Moving clouds in the distance */}
      <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
        <div className="absolute bottom-0 w-[200%] h-full animate-cloud-move">
          <div className="absolute bottom-0 w-1/4 h-1/2 bg-gray-400 dark:bg-gray-700 rounded-full opacity-30"></div>
          <div className="absolute bottom-0 left-1/4 w-1/3 h-2/3 bg-gray-500 dark:bg-gray-600 rounded-full opacity-40"></div>
          <div className="absolute bottom-0 left-2/4 w-1/5 h-1/3 bg-gray-400 dark:bg-gray-700 rounded-full opacity-30"></div>
        </div>
      </div>
      
      {/* Additional purple elements for dark theme */}
      {theme === 'dark' && (
        <>
          {/* Purple aurora effect at the top */}
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-purple-900/20 to-transparent opacity-50"></div>
          
          {/* Floating purple particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                backgroundColor: '#e9d5ff',
                borderRadius: '50%',
                opacity: Math.random() * 0.3 + 0.1,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 20 + 10}s`
              }}
            ></div>
          ))}
          
          {/* Purple shooting stars */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-shooting-star"
              style={{
                top: `${Math.random() * 50}%`,
                left: `${Math.random() * 100}%`,
                width: '100px',
                height: '2px',
                background: 'linear-gradient(to right, transparent, #e9d5ff, transparent)',
                animationDelay: `${Math.random() * 30}s`,
                transform: `rotate(${Math.random() * 60 - 30}deg)`
              }}
            ></div>
          ))}
        </>
      )}
    </div>
  );
};

export default AnimatedBackground;