import React from 'react';
import AgentSelector from './AgentSelector.jsx';
import ChatInterface from './ChatInterface.jsx';

// Accept chat state and handlers as props
const MainContent = ({ 
  isSidebarOpen, // Keep this
  messages, 
  hasChatStarted, 
  isAiTyping,
  handleSendMessage 
}) => {
  return (
    <div className="flex-1 flex flex-col pt-2 px-6 pb-6 bg-light-bg dark:bg-dark-bg overflow-hidden relative">
      <AgentSelector />
      {/* Pass chat state and handler down to ChatInterface */}
      <ChatInterface 
        messages={messages}
        hasChatStarted={hasChatStarted}
        isAiTyping={isAiTyping}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default MainContent; 