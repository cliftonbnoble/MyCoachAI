import React from 'react';

// Updated agent data using local images from public/images/
// Make sure you have images named agent1.png through agent8.png in the public/images/ folder
const agents = [
  { id: 1, specialty: 'Finance Agent', avatar: '/images/agent1.png' },
  { id: 2, specialty: 'Health Agent', avatar: '/images/agent2.png' },
  { id: 3, specialty: 'Career Agent', avatar: '/images/agent3.png' },
  { id: 4, specialty: 'Campus Agent', avatar: '/images/agent4.png' },
  { id: 5, specialty: 'Schedule Agent', avatar: '/images/agent5.png' },
  { id: 6, specialty: 'Classes Agent', avatar: '/images/agent6.png' },
  { id: 7, specialty: 'Academic Agent', avatar: '/images/agent7.png' },
  { id: 8, specialty: 'Admin Agent', avatar: '/images/agent8.png' },
];

const AgentSelector = () => {
  return (
    <div className="flex items-center space-x-4 overflow-x-auto scrollbar-hide py-2 mb-2">
      <span className="text-sm font-semibold text-light-text dark:text-dark-text whitespace-nowrap flex-shrink-0 pl-1">Our Agents:</span>
      {agents.map(agent => (
        <div key={agent.id} className="group flex flex-col items-center text-center flex-shrink-0 w-18 cursor-pointer">
          <img
            src={agent.avatar}
            alt={agent.specialty}
            className="w-14 h-14 rounded-full mb-1 shadow-sm group-hover:shadow-md transition-all duration-200 ease-in-out group-hover:scale-105"
          />
          <span
            className="text-[10px] text-light-text dark:text-dark-text mt-0.5 transition-transform duration-200 ease-in-out group-hover:scale-105 whitespace-nowrap"
          >
            {agent.specialty}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AgentSelector; 