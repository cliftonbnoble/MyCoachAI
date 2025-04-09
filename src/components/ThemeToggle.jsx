import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    // Container now just holds the button, width will be set in Sidebar
    <div className="flex items-center justify-center">
      <button
        onClick={toggleTheme}
        className={`relative p-2 rounded-full transition-colors duration-300 ease-in-out overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark-surface ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        {/* Sun Icon - visible in light mode */}
        <FiSun
          size={18}
          className={`transition-opacity duration-300 ease-in-out ${isDark ? 'opacity-0' : 'opacity-100 text-yellow-500'
            }`}
        />
        {/* Moon Icon - visible in dark mode, positioned absolutely over the sun */}
        <FiMoon
          size={18}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ease-in-out ${isDark ? 'opacity-100 text-primary' : 'opacity-0'
            }`}
        />
      </button>
    </div>
  );
};

export default ThemeToggle; 