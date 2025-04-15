import React, { useState, useRef, useEffect } from 'react';
import { FiChevronsLeft, FiChevronsRight, FiUser, FiMessageCircle, FiSettings, FiLogOut, FiPlus, FiSliders, FiUsers, FiTarget, FiBell, FiDollarSign, FiBriefcase, FiFileText, FiCheck, FiX, FiMessageSquare } from 'react-icons/fi';
import { FcComments } from 'react-icons/fc';
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
  onStudentSearch,
  notifications = [],
  onAcceptNotification,
  onRejectNotification,
  isNotificationPanelOpen,
  onToggleNotificationPanel,
  onDiscussNotification
}) => {
  // State for profile popup and customize modal
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  const [isPurposeBuilderModalOpen, setIsPurposeBuilderModalOpen] = useState(false);
  
  // Notification state removed - use props instead
  const hasUnreadNotifications = notifications.length > 0;
  
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

  // Open purpose builder modal and close profile popup
  const handleOpenPurposeBuilderModal = () => {
    setIsProfilePopupOpen(false);
    setIsPurposeBuilderModalOpen(true);
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

          {/* Header with User Profile & Notifications */}
          <div className="relative flex justify-between items-center mb-6 flex-shrink-0">
            {/* Profile Button */}
            <button
              ref={profileRef}
              onClick={() => setIsProfilePopupOpen(!isProfilePopupOpen)}
              className="flex items-center group focus:outline-none flex-grow mr-2 overflow-hidden p-1"
            >
              {/* User Icon */}
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center mr-3 flex-shrink-0 group-hover:ring-2 group-hover:ring-primary group-focus:ring-2 group-focus:ring-primary transition-all">
                <FiUser size={20} className="text-gray-600 dark:text-gray-300" />
              </div>
              {/* User Name & Type (truncated) */}
              <div className="flex flex-col overflow-hidden">
                <span className="font-semibold text-light-text dark:text-dark-text whitespace-nowrap truncate">
                  {userName}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {userType}
                </span>
              </div>
            </button>

            {/* Notification Bell Button */}
            <button 
              onClick={onToggleNotificationPanel}
              className="relative p-2 rounded-full text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-surface dark:focus:ring-offset-dark-surface focus:ring-primary mr-2 transition-transform duration-200 ease-in-out hover:scale-110"
              aria-label="Notifications"
            >
              <FiBell size={22} className="text-primary" />
              {hasUnreadNotifications && (
                <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-light-surface dark:ring-dark-surface" />
              )}
            </button>

            {/* Sidebar Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="text-light-text dark:text-dark-text hover:text-gray-500 dark:hover:text-gray-400 flex-shrink-0"
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
                  {/* Purpose Builder - Student Only */}
                  {portalType === 'student' && (
                    <button
                      onClick={handleOpenPurposeBuilderModal}
                      className="w-full flex items-center px-4 py-2 text-sm text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-600 text-left"
                      role="menuitem"
                    >
                      <FiTarget className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span>Purpose Builder</span>
                    </button>
                  )}
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

      {/* Persistent Notification Bell when closed and has notifications */}
      {!isOpen && hasUnreadNotifications && (
        <button
          onClick={onToggleNotificationPanel}
          className="fixed top-16 left-2 z-10 p-2 bg-light-surface dark:bg-dark-surface rounded-full text-primary shadow-lg transition-transform duration-200 ease-in-out hover:scale-110" 
          title="Notifications" 
          aria-label="Notifications"
        >
          <FiBell size={22} />
          <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800" /> 
        </button>
      )}

      {/* Customize Profile Modal */}
      {isCustomizeModalOpen && (
        <CustomizeProfileModal 
          isOpen={isCustomizeModalOpen} 
          onClose={() => setIsCustomizeModalOpen(false)} 
        />
      )}

      {/* Purpose Builder Modal */}
      <PurposeBuilderModal 
        isOpen={isPurposeBuilderModalOpen} 
        onClose={() => setIsPurposeBuilderModalOpen(false)} 
      />

      {/* Notification Panel Modal */}
      {isNotificationPanelOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          {/* Increased width: max-w-4xl */}
          <div className="bg-light-surface dark:bg-dark-surface rounded-lg shadow-xl w-full max-w-4xl p-6 transform transition-all opacity-100 scale-100 flex flex-col max-h-[80vh]">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
              <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text">Notifications Center</h2>
              <button 
                onClick={onToggleNotificationPanel}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* 3-Column Layout for Notifications */}
            <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
              {notifications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Column 1: Reminders */}
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 text-orange-700 dark:text-orange-300 border-b border-orange-200 dark:border-orange-700 pb-2">Reminders</h3>
                    <ul className="space-y-3">
                      {notifications.filter(n => n.category === 'reminder').map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} onDiscuss={onDiscussNotification} onAccept={onAcceptNotification} onReject={onRejectNotification} />
                      ))}
                      {notifications.filter(n => n.category === 'reminder').length === 0 && (
                        <p className="text-sm text-center text-orange-600 dark:text-orange-400 py-4 italic">No reminders.</p>
                      )}
                    </ul>
                  </div>

                  {/* Column 2: Recommendations */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 text-blue-700 dark:text-blue-300 border-b border-blue-200 dark:border-blue-700 pb-2">Recommendations</h3>
                    <ul className="space-y-3">
                      {notifications.filter(n => n.category === 'recommendation').map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} onDiscuss={onDiscussNotification} onAccept={onAcceptNotification} onReject={onRejectNotification} />
                      ))}
                      {notifications.filter(n => n.category === 'recommendation').length === 0 && (
                        <p className="text-sm text-center text-blue-600 dark:text-blue-400 py-4 italic">No recommendations.</p>
                      )}
                    </ul>
                  </div>

                  {/* Column 3: Reviews */}
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 text-purple-700 dark:text-purple-300 border-b border-purple-200 dark:border-purple-700 pb-2">Review</h3>
                    <ul className="space-y-3">
                      {notifications.filter(n => n.category === 'review').map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} onDiscuss={onDiscussNotification} onAccept={onAcceptNotification} onReject={onRejectNotification} />
                      ))}
                      {notifications.filter(n => n.category === 'review').length === 0 && (
                        <p className="text-sm text-center text-purple-600 dark:text-purple-400 py-4 italic">Nothing to review.</p>
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-base text-center text-light-text-secondary dark:text-dark-text-secondary py-10">
                  Your notification center is empty.
                </p>
              )}
            </div>
            {/* Optional: Add Footer Actions? */}
          </div>
        </div>
      )}
    </>
  );
};

// --- NotificationItem Component (Extracted for clarity) ---
const NotificationItem = ({ notification, onDiscuss, onAccept, onReject }) => {
  const IconComponent = notification.icon;
  // Define base colors per category - can be expanded
  const categoryColors = {
    reminder: 'text-orange-600 dark:text-orange-400',
    recommendation: 'text-blue-600 dark:text-blue-400',
    review: 'text-purple-600 dark:text-purple-400',
  };
  const iconColor = categoryColors[notification.category] || 'text-gray-500 dark:text-gray-400';

  return (
    <li className="flex items-start justify-between p-3 rounded-md bg-light-surface dark:bg-dark-surface/70 border border-gray-200 dark:border-gray-600 shadow-sm">
      <div className="flex items-start flex-grow mr-2">
        <div className={`flex-shrink-0 w-6 h-6 mt-0.5 mr-3 flex items-center justify-center ${iconColor}`}>
          {IconComponent ? <IconComponent size={18} /> : <FiBell size={18} />}{/* Fallback icon */}
        </div>
        <span className="text-sm text-light-text dark:text-dark-text">
          {notification.text}
        </span>
      </div>
      <div className="flex flex-shrink-0 space-x-1.5 mt-0.5">
        {/* Discuss Button */}
        <button 
          onClick={() => onDiscuss(notification.text)}
          className="p-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Discuss in Chat"
          title="Discuss in Chat"
        >
          <FcComments size={18} /> 
        </button>
        {/* Accept Button */}
        <button 
          onClick={() => onAccept(notification.id)}
          className="p-1 rounded-full text-green-500 hover:bg-green-100 dark:hover:bg-green-900/50 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Accept"
          title="Accept"
        >
          <FiCheck size={18} />
        </button>
        {/* Reject Button */}
        <button 
          onClick={() => onReject(notification.id)}
          className="p-1 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Reject"
          title="Reject"
        >
          <FiX size={18} />
        </button>
      </div>
    </li>
  );
};

// --- PurposeBuilderModal Component Definition ---
const PurposeBuilderModal = ({ isOpen, onClose }) => {
  const [year, setYear] = useState('');
  const [major, setMajor] = useState('');
  const [goals, setGoals] = useState('');
  const [interests, setInterests] = useState('');
  const [challenges, setChallenges] = useState('');
  const [areasOfFocus, setAreasOfFocus] = useState({
    academic: false,
    career: false,
    personal: false,
    financial: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setAreasOfFocus(prev => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    // Placeholder for save logic
    console.log({ year, major, goals, interests, challenges, areasOfFocus });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-light-surface dark:bg-dark-surface rounded-lg shadow-xl w-full max-w-3xl p-8 transform transition-all scale-100 opacity-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
          <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text">Purpose Builder</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form Content - Scrollable */}
        <div className="flex-grow overflow-y-auto custom-scrollbar px-8 space-y-8 mb-6">
          {/* Year and Major */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-1">
              <label htmlFor="year" className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">Year</label>
              <div className="relative">
                <select 
                  id="year" 
                  value={year} 
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text focus:outline-none focus:border-primary appearance-none"
                >
                  <option value="" disabled>Select your year</option>
                  <option value="freshman">Freshman</option>
                  <option value="sophomore">Sophomore</option>
                  <option value="junior">Junior</option>
                  <option value="senior">Senior</option>
                  <option value="graduate">Graduate</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </div>
              </div>
            </div>
            <div className="p-1">
              <label htmlFor="major" className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">Major</label>
              <div className="relative">
                <select 
                  id="major" 
                  value={major} 
                  onChange={(e) => setMajor(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text focus:outline-none focus:border-primary appearance-none"
                >
                  <option value="" disabled>Select your major</option>
                  <option value="computer_science">Computer Science</option>
                  <option value="business">Business</option>
                  <option value="psychology">Psychology</option>
                  <option value="biology">Biology</option>
                  <option value="engineering">Engineering</option>
                  <option value="undecided">Undecided</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Text Areas */}
          <div className="p-1">
            <label htmlFor="goals" className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">What are your main goals for this academic year?</label>
            <textarea 
              id="goals" 
              rows="3" 
              value={goals} 
              onChange={(e) => setGoals(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text focus:outline-none focus:border-primary"
              placeholder="e.g., achieve a 3.5 GPA, find an internship, join a student club..."
            />
          </div>
          <div className="p-1">
            <label htmlFor="interests" className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">What topics or activities are you passionate about?</label>
            <textarea 
              id="interests" 
              rows="3" 
              value={interests} 
              onChange={(e) => setInterests(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text focus:outline-none focus:border-primary"
              placeholder="e.g., programming, volunteering, creative writing, sports..."
            />
          </div>
          <div className="p-1">
            <label htmlFor="challenges" className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">What challenges do you anticipate or currently face?</label>
            <textarea 
              id="challenges" 
              rows="3" 
              value={challenges} 
              onChange={(e) => setChallenges(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text focus:outline-none focus:border-primary"
              placeholder="e.g., time management, difficult coursework, financial concerns..."
            />
          </div>

          {/* Areas of Focus */}
          <div className="p-1">
            <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-3">Select your primary areas of focus:</label>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(areasOfFocus).map((area) => (
                <label key={area} className="flex items-center space-x-2 cursor-pointer p-1">
                  <input 
                    type="checkbox" 
                    name={area} 
                    checked={areasOfFocus[area]} 
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                  />
                  <span className="text-sm text-light-text dark:text-dark-text capitalize">{area}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end space-x-3 border-t border-gray-200 dark:border-gray-700 pt-4">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-light-text dark:text-dark-text rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-offset-dark-surface transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-gray-900 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-dark-surface transition-colors"
          >
            Save Purpose
          </button>
        </div>
      </div>
    </div>
  );
};
// --- End PurposeBuilderModal Definition ---

export default Sidebar; 