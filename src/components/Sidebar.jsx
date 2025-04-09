import React, { useState, useRef, useEffect } from 'react';
import { FiSun, FiMoon, FiChevronsLeft, FiChevronsRight, FiUser, FiMessageCircle, FiSettings, FiLogOut, FiPlus, FiSliders } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle.jsx';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);
  const profileRef = useRef(null);

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

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsPopupOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, profileRef]);

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

          {/* --- Modified Header Area --- */}
          <div className="relative flex justify-between items-center mb-6 flex-shrink-0">
            {/* Profile Button */} 
            <button
              ref={profileRef}
              onClick={() => setIsPopupOpen(!isPopupOpen)}
              className="flex items-center group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center mr-3 group-hover:ring-2 group-hover:ring-primary group-focus:ring-2 group-focus:ring-primary transition-all">
                <FiUser size={20} className="text-gray-600 dark:text-gray-300" />
              </div>
              <span className="font-semibold text-light-text dark:text-dark-text whitespace-nowrap">John Doe</span>
            </button>

            {/* Collapse Button */} 
            <button
              onClick={toggleSidebar}
              className="text-light-text dark:text-dark-text hover:text-gray-500 dark:hover:text-gray-400 ml-2"
            >
              <FiChevronsLeft size={20} />
            </button>

            {/* Profile Popup Menu */} 
            {isPopupOpen && (
              <div
                ref={popupRef}
                className="absolute left-0 top-full mt-2 w-56 rounded-md shadow-lg bg-light-surface dark:bg-dark-surface ring-1 ring-black dark:ring-gray-600 ring-opacity-5 focus:outline-none z-20"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                <div className="py-1" role="none">
                  {/* Added Customize Profile Item */}
                  <a
                    href="#" // Replace with actual link
                    className="flex items-center px-4 py-2 text-sm text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-600"
                    role="menuitem"
                  >
                    <FiSliders className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <span>Customize Profile</span>
                  </a>
                  <a
                    href="#" // Replace with actual link
                    className="flex items-center px-4 py-2 text-sm text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-600"
                    role="menuitem"
                  >
                    <FiSettings className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <span>Settings</span>
                  </a>
                  <a
                    href="#" // Replace with actual link
                    className="flex items-center px-4 py-2 text-sm text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-600"
                    role="menuitem"
                  >
                    <FiLogOut className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <span>Log out</span>
                  </a>
                </div>
              </div>
            )}
          </div>
          {/* --- End Modified Header Area --- */}

          {/* --- New Chat Button --- */}
          <button className="flex items-center w-full p-2 mb-4 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <FiPlus size={22} className="mr-3 text-primary" />
            <span className="font-medium text-light-text dark:text-dark-text">New Chat</span>
          </button>
          {/* --- End New Chat Button --- */}

          {/* Chat History Title */} 
          <h3 className="text-sm font-semibold mb-3 text-light-text dark:text-dark-text flex-shrink-0">Chat History</h3>

          {/* Chat History List - Replace specific scrollbar classes with the custom one */}
          <div className="flex-grow overflow-y-auto mb-4 pr-1 custom-scrollbar">
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

          {/* Theme Toggle - Wrapped to control width */}
          <div className="mt-auto flex-shrink-0 flex justify-center">
            {/* Adjust width (e.g., w-20, w-24) as needed */}
            {/* Increased width slightly for pill shape */}
            <div className="w-24">
              <ThemeToggle />
            </div>
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