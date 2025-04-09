import React, { useState, useEffect } from 'react';
import { FiEdit, FiBookOpen, FiDollarSign, FiCalendar, FiClipboard, FiHelpCircle } from 'react-icons/fi';
import roboAgentLogo from '../assets/robo-agent-logo.png';
import MessageInput from './MessageInput.jsx';

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

const ChatInterface = () => {
  const [hasChatStarted, setHasChatStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const userName = "John";

  const examplePrompts = [
    { text: "Create flashcards for my Biology exam", icon: FiBookOpen },
    { text: "Help me budget for next semester", icon: FiDollarSign },
    { text: "Explain the concept of photosynthesis", icon: FiHelpCircle },
    { text: "Draft an email to my professor", icon: FiEdit },
    { text: "Summarize this lecture transcript", icon: FiClipboard },
    { text: "When is the deadline to drop a class?", icon: FiCalendar },
  ];

  const addMessage = (sender, text, icon = null) => {
    const newMessage = { id: nextId, sender, text, icon };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setNextId(prevId => prevId + 1);
  };

  const triggerAiResponse = () => {
    setIsAiTyping(true);
    setTimeout(() => {
      addMessage('ai', loremIpsum, roboAgentLogo);
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

  const handleExamplePrompt = (promptText) => {
    handleSendMessage(promptText);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-500 ease-in-out p-4 ${hasChatStarted ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <div className="mb-8">
            <img
              src={roboAgentLogo}
              alt="MyCoach Logo"
              className="w-16 h-16 mb-6 rounded-lg shadow-md bg-gray-200 dark:bg-gray-700 p-2 mx-auto"
            />
            <h1 className="text-2xl font-semibold mb-1 text-light-text dark:text-dark-text">
              Welcome Back, {userName}!
            </h1>
            <h2 className="text-xl text-gray-600 dark:text-gray-400">
              How can I assist you today?
            </h2>
          </div>
          <div className="w-full max-w-2xl px-4">
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
          className={`flex-1 overflow-y-auto mb-0 p-4 bg-light-surface dark:bg-dark-surface rounded-lg shadow custom-scrollbar flex flex-col transition-opacity duration-500 ease-in-out ${hasChatStarted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <div className="space-y-4">
            {hasChatStarted && (
              <div className="flex items-center mb-4">
                <span className="font-semibold text-lg text-light-text dark:text-dark-text mr-2">MyCoach</span>
                <img src={roboAgentLogo} alt="MyCoach Logo" className="w-9 h-9" />
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

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;