import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { BsPinAngleFill, BsDot, BsCalendarDate } from 'react-icons/bs'; // Import icons
import roboAgentLogo from '../assets/robo-agent-logo.png'; // Import the image

const ChatInterface = () => {
  // Placeholder messages
  const messages = [
    {
      id: 1,
      sender: 'user',
      text: "What's the general timeline for applying for financial aid for the upcoming academic year, and what documents do I typically need?",
    },
    {
      id: 2,
      sender: 'ai',
      icon: roboAgentLogo, // Use the imported variable for the icon source
      content: [
        { type: 'intro', text: "Great question! Here's a general timeline and document list for undergraduate financial aid in the US:" },
        { type: 'title', text: 'Timeline:' },
        { type: 'bullet-date', text: 'October 1st: FAFSA (Free Application for Federal Student Aid) opens.' },
        { type: 'bullet-date', text: 'Early Action/Decision Deadlines: Often November 1st/15th. Check specific college deadlines, as CSS Profile might be due too.' },
        { type: 'bullet-date', text: 'Regular Decision Priority Deadlines: Typically January 1st to March 1st. Submit FAFSA and CSS Profile (if required) by these dates for maximum consideration.' },
        { type: 'bullet', text: "State Deadlines: Vary significantly. Check your state's specific deadline." },
        { type: 'bullet-date', text: 'April-May: Receive financial aid award letters from colleges.' },
        { type: 'bullet-date', text: 'May 1st: National College Decision Day - accept an offer.' },
        { type: 'title', text: 'Common Documents:' },
        { type: 'bullet', text: "Social Security Number (yours and parents', if dependent)" },
        { type: 'bullet', text: "Driver's license number (if you have one)" },
        { type: 'bullet', text: 'Alien Registration Number (if not a U.S. citizen)' },
        { type: 'bullet', text: "Federal tax returns (yours and parents'), W-2s, and other records of money earned from the prior-prior tax year (e.g., for 2024-25 aid, use 2022 taxes)." },
        { type: 'bullet', text: 'Records of untaxed income (child support, interest income)' },
        { type: 'bullet', text: 'Bank statements and records of investments (if applicable)' },
        { type: 'bullet', text: "List of colleges you're interested in." },
        { type: 'outro', text: "Remember to check each college's specific requirements and deadlines, as they can vary!" },
      ]
    },
  ];

  const initialPromptVisible = false; // We have initial messages, so don't show the prompt

  const renderAiMessageContent = (content) => {
    return content.map((item, index) => {
      switch (item.type) {
        case 'intro':
          return <p key={index} className="mb-2">{item.text}</p>;
        case 'title':
          return (
            <div key={index} className="flex items-center gap-2 mt-3 mb-1">
              <BsPinAngleFill className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="font-semibold text-light-text dark:text-dark-text">{item.text}</span>
            </div>
          );
        case 'bullet':
          return (
            <div key={index} className="flex items-start gap-1 ml-2">
              <BsDot className="w-5 h-5 text-primary flex-shrink-0 mt-[1px]" />
              <span>{item.text}</span>
            </div>
          );
        case 'bullet-date':
          return (
            <div key={index} className="flex items-start gap-1 ml-2">
              <BsCalendarDate className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-[3px]" />
              <span>{item.text}</span>
            </div>
          );
        case 'outro':
            return <p key={index} className="mt-3 text-sm italic">{item.text}</p>;
        default:
          return <p key={index}>{item.text}</p>;
      }
    });
  };

  return (
    <div className="flex-1 overflow-y-auto mb-4 p-4 bg-light-surface dark:bg-dark-surface rounded-lg shadow flex flex-col custom-scrollbar">
      {initialPromptVisible && (
        <div className="flex flex-col items-center justify-center text-center flex-grow">
          <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center text-white">
             <div className="w-12 h-12 rounded-full bg-white opacity-50"></div>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-light-text dark:text-dark-text">Need help planning the perfect event?</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Get expert tips on budgeting, guest management, and themes to make your event unforgettable!</p>
        </div>
      )}

      {!initialPromptVisible && (
        <div className="space-y-4">
          <div className="flex items-center mb-4">
              <span className="font-semibold text-lg text-light-text dark:text-dark-text mr-2">MyCoach</span>
              <img src={roboAgentLogo} alt="MyCoach Logo" className="w-9 h-9" />
          </div>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'ai' && message.icon && (
                <img src={message.icon} alt="AI Agent" className="w-8 h-8 rounded-full" />
              )}
              <div
                 className={`max-w-lg p-3 shadow-sm ${message.sender === 'user'
                    ? 'bg-primary text-gray-900 rounded-t-lg rounded-bl-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-light-text dark:text-dark-text rounded-t-lg rounded-br-lg'
                 }`
                 }
              >
                {message.sender === 'ai' ? renderAiMessageContent(message.content) : message.text}
              </div>
              {message.sender === 'user' && <div className="w-8"></div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatInterface; 