import React from 'react';
import { FiEdit, FiBookOpen, FiDollarSign, FiCalendar, FiClipboard, FiHelpCircle, FiUsers, FiFileText, FiDatabase, FiSettings } from 'react-icons/fi';
import roboAgentLogo from '../assets/robo-agent-logo.png';
import MessageInput from './MessageInput.jsx';

const ChatInterface = ({ 
  messages,
  hasChatStarted,
  isAiTyping,
  handleSendMessage,
  portalType = 'student',
  logoImage,
  notificationCount = 0,
  onToggleNotificationPanel
}) => {
  // Get user name based on portal type
  const userName = portalType === 'student' ? "John" : "Jane";

  // Different prompts based on portal type
  const examplePrompts = portalType === 'student' ? [
    { text: "Create flashcards for my Biology exam", icon: FiBookOpen },
    { text: "Help me budget for next semester", icon: FiDollarSign },
    { text: "Explain the concept of photosynthesis", icon: FiHelpCircle },
    { text: "Draft an email to my professor", icon: FiEdit },
    { text: "Summarize this lecture transcript", icon: FiClipboard },
    { text: "When is the deadline to drop a class?", icon: FiCalendar },
  ] : [
    { text: "Draft an email to a student's parents", icon: FiEdit },
    { text: "Generate a report on class attendance", icon: FiFileText },
    { text: "Review department budget forecast", icon: FiDollarSign },
    { text: "Prepare meeting notes for faculty meeting", icon: FiClipboard },
    { text: "Query student enrollment statistics", icon: FiDatabase },
    { text: "Configure course schedule for next term", icon: FiSettings },
  ];

  const handleExamplePrompt = (promptText) => {
    handleSendMessage(promptText);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden w-full">
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-500 ease-in-out p-4 ${hasChatStarted ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <div className="mb-8">
            <button 
              onClick={onToggleNotificationPanel}
              disabled={notificationCount === 0}
              className={`relative inline-block mx-auto rounded-lg focus:outline-none ${notificationCount > 0 ? 'cursor-pointer focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-light-surface dark:focus:ring-offset-dark-bg' : 'cursor-default'}`}
              aria-label={notificationCount > 0 ? `Open Notifications (${notificationCount})` : 'No new notifications'}
            >
              <img
                src={roboAgentLogo}
                alt="MyCoach Logo"
                className="w-24 h-24 mb-6 rounded-lg shadow-md bg-gray-200 dark:bg-gray-700 p-2"
              />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white ring-2 ring-light-surface dark:ring-dark-bg">
                  {notificationCount}
                </span>
              )}
            </button>
            <h1 className="text-2xl font-semibold mb-1 text-light-text dark:text-dark-text">
              Welcome Back, {userName}!
            </h1>
            <h2 className="text-xl text-gray-600 dark:text-gray-400">
              {portalType === 'student' 
                ? "How can I assist with your studies today?" 
                : "How can I assist with your administrative tasks today?"}
            </h2>
          </div>
          <div className="w-full px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleExamplePrompt(prompt.text)}
                  className="flex items-center text-left p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600/50 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all text-sm text-light-text dark:text-dark-text"
                >
                  <prompt.icon className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                  <span className="leading-tight">{prompt.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`flex-1 overflow-y-auto p-3 bg-light-surface dark:bg-dark-surface rounded-lg shadow custom-scrollbar flex flex-col transition-opacity duration-500 ease-in-out ${hasChatStarted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <div className="space-y-4 w-full">
            {hasChatStarted && (
              <div className="flex items-center mb-4">
                <span className="font-semibold text-lg text-light-text dark:text-dark-text mr-2">
                  {portalType === 'student' ? 'MyCoach' : 'StaffAssist'}
                </span>
                <img src={logoImage} alt="AI Logo" className="w-9 h-9" />
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'ai' && message.icon && (
                  <img src={message.icon} alt="AI Agent" className="w-8 h-8 rounded-full" />
                )}
                <div
                  className={`max-w-lg p-3 shadow-sm whitespace-pre-wrap ${message.sender === 'user'
                    ? 'bg-primary text-gray-900 rounded-t-lg rounded-bl-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-light-text dark:text-dark-text rounded-t-lg rounded-br-lg'
                  }`}
                >
                  {message.text}
                </div>
                {message.sender === 'user' && <div className="w-8"></div>}
              </div>
            ))}
            {isAiTyping && (
              <div className="flex items-end gap-2 justify-start">
                <img src={roboAgentLogo} alt="AI Agent" className="w-8 h-8 rounded-full" />
                <div className="max-w-lg p-3 shadow-sm rounded-t-lg rounded-br-lg bg-gray-200 dark:bg-gray-700">
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-0"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <MessageInput onSendMessage={handleSendMessage} portalType={portalType} />
    </div>
  );
};

export default ChatInterface;