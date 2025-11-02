// src/components/ErrorBoundary.jsx
import React, { Component } from 'react';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 z-50">
          <div className={`max-w-md w-full p-6 rounded-xl shadow-lg ${
            this.props.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="text-center">
              <FiAlertTriangle className="mx-auto text-yellow-500" size={48} />
              <h2 className="mt-4 text-xl font-bold">Something went wrong</h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                We're sorry, but an error occurred while loading the animated background.
              </p>
              <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded text-left text-sm overflow-auto max-h-32">
                <code>{this.state.error && this.state.error.toString()}</code>
              </div>
              <button
                onClick={this.handleReset}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
              >
                <FiRefreshCw className="mr-2" />
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;