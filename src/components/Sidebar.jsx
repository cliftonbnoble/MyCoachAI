import React from 'react';
import { FiSun, FiMoon, FiChevronsLeft, FiChevronsRight, FiUser, FiMessageCircle } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle.jsx';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  // Placeholder for chat history items
  const chatHistory = [
    { id: 1, title: 'Financial Aid Inquiry' },
    { id: 2, title: 'Dormitory Reservation' },
    { id: 3, title: 'Course Registration' },
    { id: 4, title: 'Job Market Nurses' },
    { id: 5, title: 'Course Schedule Help' },
    { id: 6, title: 'Student Loan Assistance' },
    { id: 7, title: 'Campus Events' },
    { id: 8, title: 'Academic Support' },
    { id: 9, title: 'Campus Map' },
    { id: 10, title: 'Library Hours' },
    // Add more history items
  ];

  return (
    <>
      {/* Overlay for mobile/smaller screens when sidebar is open & collapsed */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-2 z-20 p-2 bg-primary rounded-full text-gray-900 shadow-lg lg:hidden"
        >
          <FiChevronsRight size={20} />
        </button>
      )}

      {/* Sidebar Container */}
      <div
        className={`bg-light-surface dark:bg-dark-surface flex flex-col shadow-md transition-all duration-300 ease-in-out flex-shrink-0 ${isOpen ? 'w-64' : 'w-0 overflow-hidden'}`}
      >
        {/* Wrap content in a div that handles padding and visibility */} 
        <div className={`flex flex-col h-full ${isOpen ? 'p-4' : 'p-0'} transition-opacity duration-100 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>

          {/* Logo and Collapse Button */} 
          <div className="flex justify-between items-center mb-6 flex-shrink-0">
            <span className="font-bold text-xl text-light-text dark:text-dark-text whitespace-nowrap">MyCoach AI</span>
            <button
              onClick={toggleSidebar}
              className="text-light-text dark:text-dark-text hover:text-gray-500 dark:hover:text-gray-400"
            >
              <FiChevronsLeft size={20} />
            </button>
          </div>

          {/* User Profile */} 
          <div className="flex items-center mb-6 flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center mr-3">
              <FiUser size={20} className="text-gray-600 dark:text-gray-300" />
            </div>
            <span className="font-semibold text-light-text dark:text-dark-text whitespace-nowrap">John Doe</span>
          </div>

          {/* Chat History Title */} 
          <h3 className="text-sm font-semibold mb-3 text-light-text dark:text-dark-text flex-shrink-0">Chat History</h3>

          {/* Chat History List - Added overflow-y-auto */} 
          <div className="flex-grow overflow-y-auto mb-4 pr-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
            <ul>
              {chatHistory.map((chat) => (
                <li key={chat.id} className="mb-1.5">
                  <a
                    href="#" // Replace with actual chat link later
                    className="flex items-center p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm text-light-text dark:text-dark-text whitespace-nowrap"
                  >
                    <FiMessageCircle size={16} className="mr-2 flex-shrink-0" />
                    <span className="truncate">{chat.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Theme Toggle */} 
          <div className="mt-auto flex-shrink-0">
            <ThemeToggle />
          </div>
        </div> 
      </div>

      {/* Standalone Toggle Button - Visible only when closed on larger screens */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="hidden lg:block absolute top-4 left-2 z-10 p-2 bg-primary rounded-full text-gray-900 shadow-lg"
          title="Open Sidebar"
        >
          <FiChevronsRight size={20} />
        </button>
      )}
    </>
  );
};

export default Sidebar; 