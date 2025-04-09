import React, { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import MainContent from './MainContent.jsx';
import roboAgentLogo from '../assets/robo-agent-logo.png'; // Need logo for AI messages

// Placeholder Lorem Ipsum - Moved here
const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // --- Lifted Chat State ---
  const [hasChatStarted, setHasChatStarted] = useState(false);
  const [messages, setMessages] = useState([]); 
  const [nextId, setNextId] = useState(1); 
  const [isAiTyping, setIsAiTyping] = useState(false); 
  // --- End Lifted Chat State ---

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // --- Lifted Chat Functions ---
  const addMessage = (sender, text, icon = null) => {
    const newMessage = { id: nextId, sender, text, icon };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setNextId(prevId => prevId + 1);
  };

  const triggerAiResponse = () => {
    setIsAiTyping(true); 
    setTimeout(() => {
      addMessage('ai', loremIpsum, roboAgentLogo); // Use imported logo
      setIsAiTyping(false);
    }, 1000);
  };

  const handleSendMessage = (text) => {
     if (!text || text.trim() === '') return;
     if (!hasChatStarted) {
        setHasChatStarted(true);
     }
     addMessage('user', text);
     triggerAiResponse();
  };

  const handleNewChat = () => {
      setMessages([]);
      setHasChatStarted(false);
      setIsAiTyping(false);
      // Optionally close sidebar if desired
      // if (isSidebarOpen) { toggleSidebar(); }
  };
  // --- End Lifted Chat Functions ---


  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text overflow-hidden">
      {/* Pass handleNewChat to Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        onNewChat={handleNewChat} 
      />
      {/* Pass chat state and handlers to MainContent */}
      <MainContent 
        isSidebarOpen={isSidebarOpen} 
        messages={messages}
        hasChatStarted={hasChatStarted}
        isAiTyping={isAiTyping}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Layout; 