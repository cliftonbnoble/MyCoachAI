import React from 'react';
import AgentSelector from './AgentSelector.jsx';
import ChatInterface from './ChatInterface.jsx';
import MessageInput from './MessageInput.jsx';

const MainContent = ({ isSidebarOpen }) => {
  return (
    <div className="flex-1 flex flex-col pt-2 px-6 pb-6 bg-light-bg dark:bg-dark-bg overflow-hidden relative">
      <AgentSelector />
      <ChatInterface />
      <MessageInput />
    </div>
  );
};

export default MainContent; 