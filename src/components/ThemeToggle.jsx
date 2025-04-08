import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-around p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
      <button
        onClick={toggleTheme}
        className={`p-1.5 rounded-full ${theme === 'light' ? 'bg-primary text-gray-900' : 'text-gray-500 dark:text-gray-400'}`}
      >
        <FiSun size={18} />
      </button>
      <button
        onClick={toggleTheme}
        className={`p-1.5 rounded-full ${theme === 'dark' ? 'bg-primary text-gray-900' : 'text-gray-500 dark:text-gray-400'}`}
      >
        <FiMoon size={18} />
      </button>
    </div>
  );
};

export default ThemeToggle; 