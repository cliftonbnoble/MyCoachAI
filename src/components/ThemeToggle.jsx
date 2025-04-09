import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    // Increase vertical padding (e.g., p-1.5)
    <button
      onClick={toggleTheme}
      className={`relative flex items-center w-full p-1.5 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark-surface ${isDark ? 'bg-gray-700' : 'bg-gray-100'
        }`}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {/* Sliding Knob - should adjust height automatically */}
      <span
        className={`absolute top-0 bottom-0 left-0 w-1/2 rounded-full bg-primary transition-transform duration-300 ease-in-out transform ${isDark ? 'translate-x-full' : 'translate-x-0'
          }`}
      ></span>

      {/* Increase icon size */}
      <div className="relative z-10 flex justify-between w-full px-2"> 
        <FiSun
          size={22} // Increased size
          className={`transition-colors duration-300 ${isDark ? 'text-yellow-500' : 'text-gray-900'
            }`}
        />
        <FiMoon
          size={22} // Increased size
          className={`transition-colors duration-300 ${isDark ? 'text-gray-900' : 'text-gray-400'
            }`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle; 