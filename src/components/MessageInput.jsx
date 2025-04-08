import React, { useState } from 'react';
import { FiPlusCircle, FiRefreshCcw, FiSend } from 'react-icons/fi';

const MessageInput = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() === '') return;
    console.log('Sending message:', message);
    // Add logic to send message here
    setMessage('');
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent newline on Enter
      handleSend();
    }
  };

  return (
    <div className="mt-auto p-4 bg-light-surface dark:bg-dark-surface rounded-lg shadow">
      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-2">
        <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <FiPlusCircle size={20} />
        </button>
        <textarea
          rows="1"
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="flex-1 px-2 py-1 resize-none bg-transparent outline-none text-light-text dark:text-dark-text placeholder-gray-400 dark:placeholder-gray-500 custom-scrollbar"
          style={{ maxHeight: '100px', overflowY: 'auto' }} // Limit height and allow scroll
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