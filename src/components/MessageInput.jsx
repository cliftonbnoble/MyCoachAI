import React, { useState } from 'react';
import { FiPlusCircle, FiRefreshCcw, FiSend } from 'react-icons/fi';

const MessageInput = ({ onSendMessage, portalType = 'student' }) => {
  const [message, setMessage] = useState('');

  // Different placeholder text based on portal type
  const placeholderText = portalType === 'student' 
    ? "Ask me anything about your classes, assignments, or campus life..." 
    : "Ask me anything about student records, administrative tasks, or resources...";

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage === '') return;
    onSendMessage(trimmedMessage);
    setMessage('');
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mt-auto px-3 py-3 bg-light-surface dark:bg-dark-surface rounded-lg shadow w-full">
      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-2">
        <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <FiPlusCircle size={20} />
        </button>
        <textarea
          rows="1"
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholderText}
          className="flex-1 px-2 py-1 resize-none bg-transparent outline-none text-light-text dark:text-dark-text placeholder-gray-400 dark:placeholder-gray-500 custom-scrollbar"
          style={{ maxHeight: '100px', overflowY: 'auto' }}
        />
        <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mr-2">
          <FiRefreshCcw size={18} />
        </button>
        <button
          onClick={handleSend}
          className="bg-primary p-2 rounded-lg text-gray-900 hover:bg-yellow-500 disabled:opacity-50"
          disabled={!message.trim()}
        >
          <FiSend size={18} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput; 