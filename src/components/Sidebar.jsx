import React, { useState, useRef, useEffect } from 'react';
import { FiChevronsLeft, FiChevronsRight, FiUser, FiMessageCircle, FiSettings, FiLogOut, FiPlus, FiSliders, FiUsers } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle.jsx';
import CustomizeProfileModal from './CustomizeProfileModal.jsx';
import { useNavigate } from 'react-router-dom';

/**
 * Sidebar component for both student and staff portals
 */
const Sidebar = ({ 
  isOpen, 
  toggleSidebar, 
  onNewChat, 
  portalType = 'student', 
  userName = 'John Doe',
  userType = 'Student',
  onStudentSearch
}) => {
  // State for profile popup and customize modal
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  
  // Refs for click outside detection
  const popupRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Portal-specific chat history items
  const chatHistory = portalType === 'student' ? [
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
  ] : [
    { id: 1, title: 'Student Records' },
    { id: 2, title: 'Course Management' },
    { id: 3, title: 'Faculty Directory' },
    { id: 4, title: 'Enrollment Statistics' },
    { id: 5, title: 'Academic Calendar' },
    { id: 6, title: 'Department Budgets' },
    { id: 7, title: 'Campus Resources' },
    { id: 8, title: 'Student Services' },
    { id: 9, title: 'IT Support' },
    { id: 10, title: 'Administrative Tasks' },
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
        setIsProfilePopupOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, profileRef]);

  // Open customize modal and close profile popup
  const handleOpenCustomizeModal = () => {
    setIsProfilePopupOpen(false);
    setIsCustomizeModalOpen(true);
  };

  return (
    <>
      {/* Mobile toggle button - shown when sidebar is closed */}
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

          {/* Header with User Profile */}
          <div className="relative flex justify-between items-center mb-6 flex-shrink-0">
            <button
              ref={profileRef}
              onClick={() => setIsProfilePopupOpen(!isProfilePopupOpen)}
              className="flex items-center group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center mr-3 group-hover:ring-2 group-hover:ring-primary group-focus:ring-2 group-focus:ring-primary transition-all">
                <FiUser size={20} className="text-gray-600 dark:text-gray-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-light-text dark:text-dark-text whitespace-nowrap">
                  {userName}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {userType}
                </span>
              </div>
            </button>

            <button
              onClick={toggleSidebar}
              className="text-light-text dark:text-dark-text hover:text-gray-500 dark:hover:text-gray-400 ml-2"
            >
              <FiChevronsLeft size={20} />
            </button>

            {/* Profile Popup Menu */}
            {isProfilePopupOpen && (
              <div
                ref={popupRef}
                className="absolute left-0 top-full mt-2 w-56 rounded-md shadow-lg bg-light-surface dark:bg-dark-surface ring-1 ring-black dark:ring-gray-600 ring-opacity-5 focus:outline-none z-20"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                <div className="py-1" role="none">
                  <button
                    onClick={handleOpenCustomizeModal}
                    className="w-full flex items-center px-4 py-2 text-sm text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-600 text-left"
                    role="menuitem"
                  >
                    <FiSliders className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <span>Customize Profile</span>
                  </button>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-600"
                    role="menuitem"
                  >
                    <FiSettings className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <span>Settings</span>
                  </a>
                  <a
                    href="#"
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

          {/* New Chat Button */}
          <div className="px-4 mb-4 mt-6">
            <button 
              onClick={onNewChat}
              className="flex items-center justify-center w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-light-text dark:text-dark-text rounded-lg transition-colors shadow-sm"
            >
              <FiPlus size={20} className={`text-primary ${!isOpen && 'mx-auto'}`} />
              {isOpen && <span className="ml-3 font-medium">New Chat</span>}
            </button>
          </div>

          {/* Student Search Button - Staff Only */}
          {portalType === 'staff' && (
            <div className="px-4 mb-4">
              <button 
                onClick={onStudentSearch}
                className="flex items-center justify-center w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-light-text dark:text-dark-text rounded-lg transition-colors shadow-sm"
              >
                <FiUsers size={20} className={`text-primary ${!isOpen && 'mx-auto'}`} />
                {isOpen && <span className="ml-3 font-medium">Student Search</span>}
              </button>
            </div>
          )}

          {/* History Header */}
          <h3 className="text-sm font-semibold mb-3 text-light-text dark:text-dark-text flex-shrink-0">
            {portalType === 'student' ? 'Chat History' : 'Staff Resources'}
          </h3>

          {/* Chat History List */} 
          <div className="flex-grow overflow-y-auto mb-4 pr-1 custom-scrollbar">
            <ul>
              {chatHistory.map((chat) => (
                <li key={chat.id} className="mb-1.5">
                  <a
                    href="#"
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
          <div className="mt-auto flex-shrink-0 flex justify-center">
            <div className="w-24">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Standalone Toggle Button - Desktop Only */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="hidden lg:block absolute top-4 left-2 z-10 p-2 bg-primary rounded-full text-gray-900 shadow-lg"
          title="Open Sidebar"
        >
          <FiChevronsRight size={20} />
        </button>
      )}

      {/* Customize Profile Modal */}
      <CustomizeProfileModal 
        isOpen={isCustomizeModalOpen} 
        onOpenChange={setIsCustomizeModalOpen} 
      />
    </>
  );
};

export default Sidebar; 