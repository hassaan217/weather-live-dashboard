// // src/components/FooterEnhanced.jsx
// import React from 'react';
// import { 
//   FiGithub, 
//   FiLinkedin, 
//   FiMail, 
//   FiGlobe, 
//   FiCode, 
//   FiDatabase,
//   FiCloud,
//   FiBarChart2,
//   FiServer,
//   FiCalendar,
//   FiUser,
//   FiAward,
//   FiStar,
//   FiExternalLink
// } from 'react-icons/fi';

// const Footer= ({ theme }) => {
//   const currentYear = new Date().getFullYear();
  
//   return (
//     <footer className={`w-full py-10 mt-12 border-t backdrop-blur-sm ${
//       theme === 'dark' 
//         ? 'bg-dark-card bg-opacity-90 text-gray-300 border-gray-700' 
//         : 'bg-light-card bg-opacity-90 text-gray-700 border-gray-300'
//     }`}>
//       <div className="container mx-auto px-4">
//         {/* Top Section with Branding */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <div className="mb-6 md:mb-0">
//             <div className="flex items-center mb-3">
//               <div className={`p-2 rounded-lg mr-3 ${
//                 theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
//               }`}>
//                 <FiCloud className="text-weather-primary" size={24} />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold">Weather Analytics Dashboard</h2>
//                 <p className="text-sm opacity-80">AI-powered global climate insights & forecasting</p>
//               </div>
//             </div>
//             <div className="flex items-center mt-4">
//               <div className={`p-1 rounded-full mr-2 ${
//                 theme === 'dark' ? 'bg-green-900' : 'bg-green-100'
//               }`}>
//                 <FiAward className="text-green-500" size={16} />
//               </div>
//               <span className="text-sm font-medium">Production Ready • Enterprise Grade</span>
//             </div>
//           </div>
          
//           <div className="flex flex-col sm:flex-row gap-3">
//             <a 
//               href="https://github.com/yourusername/weather-analytics-dashboard" 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
//                 theme === 'dark' 
//                   ? 'bg-gray-800 hover:bg-gray-700' 
//                   : 'bg-gray-100 hover:bg-gray-200'
//               }`}
//             >
//               <FiGithub className="mr-2" />
//               <span>View Code</span>
//             </a>
//             <a 
//               href="https://linkedin.com/in/yourprofile" 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
//                 theme === 'dark' 
//                   ? 'bg-blue-900 hover:bg-blue-800' 
//                   : 'bg-blue-100 hover:bg-blue-200'
//               }`}
//             >
//               <FiLinkedin className="mr-2" />
//               <span>LinkedIn</span>
//             </a>
//           </div>
//         </div>
        
//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//           {/* Developer Section */}
//           <div>
//             <h3 className="font-semibold mb-3 flex items-center">
//               <FiUser className="mr-2" /> Developer
//             </h3>
//             <p className="mb-3 text-sm">
//               Hassaan — Data Analyst & Full-Stack Developer
//             </p>
//             <p className="text-xs opacity-75 mb-3">
//               Specializing in climate data visualization and predictive analytics
//             </p>
//             <div className="flex items-center text-xs">
//               <FiStar className="text-yellow-500 mr-1" />
//               <span>5+ years experience in data analytics</span>
//             </div>
//           </div>
          
//           {/* Technologies Section */}
//           <div>
//             <h3 className="font-semibold mb-3 flex items-center">
//               <FiCode className="mr-2" /> Tech Stack
//             </h3>
//             <ul className="space-y-2 text-sm">
//               <li className="flex items-center">
//                 <FiGlobe className="mr-2 text-blue-500" size={16} />
//                 React.js & Redux
//               </li>
//               <li className="flex items-center">
//                 <FiServer className="mr-2 text-green-500" size={16} />
//                 FastAPI & Python
//               </li>
//               <li className="flex items-center">
//                 <FiDatabase className="mr-2 text-green-700" size={16} />
//                 MongoDB Atlas
//               </li>
//               <li className="flex items-center">
//                 <FiBarChart2 className="mr-2 text-purple-500" size={16} />
//                 Recharts & D3.js
//               </li>
//             </ul>
//           </div>
          
//           {/* Features Section */}
//           <div>
//             <h3 className="font-semibold mb-3">Key Features</h3>
//             <ul className="space-y-2 text-sm">
//               <li className="flex items-start">
//                 <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
//                 Real-time Weather Analytics
//               </li>
//               <li className="flex items-start">
//                 <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
//                 7-Day Forecast Modeling
//               </li>
//               <li className="flex items-start">
//                 <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
//                 Interactive Climate Maps
//               </li>
//               <li className="flex items-start">
//                 <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mt-1.5 mr-2"></span>
//                 Risk Assessment & Alerts
//               </li>
//             </ul>
//           </div>
          
//           {/* Resources Section */}
//           <div>
//             <h3 className="font-semibold mb-3">Resources</h3>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <a href="/docs/README.md" target="_blank" rel="noreferrer" className="hover:text-weather-primary transition-colors flex items-center">
//                   <FiExternalLink className="mr-1" size={14} />
//                   Documentation (Index)
//                 </a>
//               </li>
//               <li>
//                 <a href="/docs/ARCHITECTURE.md" target="_blank" rel="noreferrer" className="hover:text-weather-primary transition-colors flex items-center">
//                   <FiExternalLink className="mr-1" size={14} />
//                   Architecture
//                 </a>
//               </li>
//               <li>
//                 <a href="/docs/COMPONENTS.md" target="_blank" rel="noreferrer" className="hover:text-weather-primary transition-colors flex items-center">
//                   <FiExternalLink className="mr-1" size={14} />
//                   Components
//                 </a>
//               </li>
//               <li>
//                 <a href="/docs/DATA-FLOW.md" target="_blank" rel="noreferrer" className="hover:text-weather-primary transition-colors flex items-center">
//                   <FiExternalLink className="mr-1" size={14} />
//                   Data Flow
//                 </a>
//               </li>
//               <li>
//                 <a href="/docs/SETUP.md" target="_blank" rel="noreferrer" className="hover:text-weather-primary transition-colors flex items-center">
//                   <FiExternalLink className="mr-1" size={14} />
//                   Setup & Installation
//                 </a>
//               </li>
//               <li>
//                 <a href="/docs/API-REFERENCE.md" target="_blank" rel="noreferrer" className="hover:text-weather-primary transition-colors flex items-center">
//                   <FiExternalLink className="mr-1" size={14} />
//                   API Reference
//                 </a>
//               </li>
//               <li>
//                 <a href="/docs/FUTURE-ENHANCEMENTS.md" target="_blank" rel="noreferrer" className="hover:text-weather-primary transition-colors flex items-center">
//                   <FiExternalLink className="mr-1" size={14} />
//                   Future Enhancements
//                 </a>
//               </li>
//               <li>
//                 <a href="mailto:your.email@example.com" className="hover:text-weather-primary transition-colors flex items-center">
//                   <FiMail className="mr-1" size={14} />
//                   Contact Developer
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
        
//         {/* Bottom Bar */}
//         <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="text-sm opacity-75 mb-4 md:mb-0">
//               <div className="flex items-center mb-1">
//                 <FiCalendar className="mr-1" size={14} />
//                 <span>v1.0 • Updated {currentYear}</span>
//               </div>
//               <p>🌍 Weather Data by OpenWeatherMap API</p>
//             </div>
            
//             <div className="flex items-center space-x-4 text-sm">
//               <div className="flex items-center">
//                 <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
//                 <span>Production Ready</span>
//               </div>
//               <div className="flex items-center">
//                 <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
//                 <span>MIT License</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


// src/components/FooterEnhanced.jsx
import React from 'react';
import { 
  FiGithub, 
  FiLinkedin, 
  FiMail, 
  FiGlobe, 
  FiCode, 
  FiDatabase,
  FiCloud,
  FiBarChart2,
  FiServer,
  FiCalendar,
  FiUser,
  FiAward,
  FiStar,
  FiExternalLink
} from 'react-icons/fi';

const Footer = ({ theme }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`w-full py-10 mt-12 border-t backdrop-blur-sm ${
      theme === 'dark' 
        ? 'bg-dark-card bg-opacity-90 text-gray-300 border-gray-700' 
        : 'bg-light-card bg-opacity-90 text-gray-700 border-gray-300'
    }`}>
      <div className="container mx-auto px-4">
        {/* Top Section with Branding */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-3">
              <div className={`p-2 rounded-lg mr-3 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <FiCloud className="text-weather-primary" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Weather Analytics Dashboard</h2>
                <p className="text-sm opacity-80">AI-powered global climate insights & forecasting</p>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <div className={`p-1 rounded-full mr-2 ${
                theme === 'dark' ? 'bg-green-900' : 'bg-green-100'
              }`}>
                <FiAward className="text-green-500" size={16} />
              </div>
              <span className="text-sm font-medium">Production Ready • Enterprise Grade</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <a 
              href="https://github.com/yourusername/weather-analytics-dashboard" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <FiGithub className="mr-2" />
              <span>View Code</span>
            </a>
            <a 
              href="https://linkedin.com/in/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'bg-blue-900 hover:bg-blue-800' 
                  : 'bg-blue-100 hover:bg-blue-200'
              }`}
            >
              <FiLinkedin className="mr-2" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Developer Section */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <FiUser className="mr-2" /> Developer
            </h3>
            <p className="mb-3 text-sm">
              Hassaan — Data Analyst & Full-Stack Developer
            </p>
            <p className="text-xs opacity-75 mb-3">
              Specializing in climate data visualization and predictive analytics
            </p>
            <div className="flex items-center text-xs">
              <FiStar className="text-yellow-500 mr-1" />
              <span>1+ years experience in data analytics</span>
            </div>
          </div>
          
          {/* Technologies Section */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <FiCode className="mr-2" /> Tech Stack
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <FiGlobe className="mr-2 text-blue-500" size={16} />
                React.js & Redux
              </li>
              <li className="flex items-center">
                <FiServer className="mr-2 text-green-500" size={16} />
                FastAPI & Python
              </li>
              <li className="flex items-center">
                <FiDatabase className="mr-2 text-green-700" size={16} />
                MongoDB Atlas
              </li>
              <li className="flex items-center">
                <FiBarChart2 className="mr-2 text-purple-500" size={16} />
                Recharts & D3.js
              </li>
            </ul>
          </div>
          
          {/* Features Section */}
          <div>
            <h3 className="font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                Real-time Weather Analytics
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                7-Day Forecast Modeling
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                Interactive Climate Maps
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mt-1.5 mr-2"></span>
                Risk Assessment & Alerts
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm opacity-75 mb-4 md:mb-0">
              <div className="flex items-center mb-1">
                <FiCalendar className="mr-1" size={14} />
                <span>v1.0 • Updated {currentYear}</span>
              </div>
              <p>🌍 Weather Data by OpenWeatherMap API</p>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                <span>Production Ready</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                <span>MIT License</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;