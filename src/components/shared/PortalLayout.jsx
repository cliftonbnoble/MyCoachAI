import React, { useState } from 'react';
import Sidebar from '../Sidebar.jsx';
import ChatInterface from '../ChatInterface.jsx';
import AgentSelector from '../AgentSelector.jsx';
import StudentSearch from '../student-search/StudentSearch.jsx';
import { FiDollarSign, FiBriefcase, FiFileText } from 'react-icons/fi'; // Import icons for notifications

const PortalLayout = ({ 
  portalType = 'student', // 'student' or 'staff'
  responseGenerator, 
  logoImage,
  sidebarConfig = {}
}) => {
  // UI state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showStudentSearch, setShowStudentSearch] = useState(false);
  
  // Chat state
  const [hasChatStarted, setHasChatStarted] = useState(false);
  const [messages, setMessages] = useState([]); 
  const [nextId, setNextId] = useState(1); 
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Notification State (Lifted)
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Turn in financial aid application by Oct 31st.', icon: FiDollarSign },
    { id: 2, text: 'Finish Resume/CV for job application.', icon: FiBriefcase },
    { id: 3, text: 'Turn in transcripts by Nov 15th.', icon: FiFileText },
  ]);
  const notificationCount = notifications.length;
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);

  // Notification Handlers
  const handleAcceptNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleRejectNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleToggleNotificationPanel = () => {
    setIsNotificationPanelOpen(prev => !prev);
  };

  // Sidebar toggle handler
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Message handling
  const addMessage = (sender, text, icon = null) => {
    const newMessage = { id: nextId, sender, text, icon };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setNextId(prevId => prevId + 1);
  };

  // AI response generator
  const triggerAiResponse = () => {
    setIsAiTyping(true); 
    responseGenerator()
      .then(responseText => {
        addMessage('ai', responseText, logoImage);
        setIsAiTyping(false);
      })
      .catch(() => {
        addMessage('ai', 'Sorry, I encountered an error processing your request.', logoImage);
        setIsAiTyping(false);
      });
  };

  // User message handler
  const handleSendMessage = (text) => {
     if (!text || text.trim() === '') return;
     if (!hasChatStarted) {
        setHasChatStarted(true);
     }
     addMessage('user', text);
     triggerAiResponse();
  };

  // New chat handler - resets chat and exits student search if active
  const handleNewChat = () => {
      if (showStudentSearch) {
        setShowStudentSearch(false);
      }
      
      setMessages([]);
      setHasChatStarted(false);
      setIsAiTyping(false);
  };

  // Student search toggle handler
  const handleToggleStudentSearch = () => {
    setShowStudentSearch(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        onNewChat={handleNewChat}
        portalType={portalType}
        onStudentSearch={handleToggleStudentSearch}
        notifications={notifications}
        onAcceptNotification={handleAcceptNotification}
        onRejectNotification={handleRejectNotification}
        isNotificationPanelOpen={isNotificationPanelOpen}
        onToggleNotificationPanel={handleToggleNotificationPanel}
        {...sidebarConfig}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center h-full">
        {/* Inner container */}
        <div className={`w-full max-w-7xl transition-all duration-300 ease-in-out px-4 sm:px-6 flex flex-col h-full pt-2 pb-2`}>
          {showStudentSearch && portalType === 'staff' ? (
            <StudentSearch onClose={handleToggleStudentSearch} />
          ) : (
            <>
              {/* Agent Selector */}
              <div className={`mb-2 transition-opacity duration-300 ${showStudentSearch ? 'opacity-0' : 'opacity-100'}`}>
                <AgentSelector portalType={portalType} />
              </div>
              {/* Chat Interface */}
              <ChatInterface 
                messages={messages}
                hasChatStarted={hasChatStarted}
                isAiTyping={isAiTyping}
                handleSendMessage={handleSendMessage}
                portalType={portalType}
                logoImage={logoImage}
                notificationCount={notificationCount}
                onToggleNotificationPanel={handleToggleNotificationPanel}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortalLayout; 