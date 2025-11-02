

// src/components/LoadingSkeleton.jsx
import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>
        ))}
      </div>
      
      <div className="h-80 bg-white dark:bg-gray-800 rounded-lg shadow mb-6"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-64 bg-white dark:bg-gray-800 rounded-lg shadow"></div>
        <div className="h-64 bg-white dark:bg-gray-800 rounded-lg shadow"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;