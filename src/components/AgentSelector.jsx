import React from 'react';

// Import agent images from the new assets folder
import agent1 from '../assets/agent1.png';
import agent2 from '../assets/agent2.png';
import agent3 from '../assets/agent3.png';
import agent4 from '../assets/agent4.png';
import agent5 from '../assets/agent5.png';
import agent6 from '../assets/agent6.png';
import agent7 from '../assets/agent7.png';
import agent8 from '../assets/agent8.png';

const AgentSelector = () => {
  // Updated placeholder data using imported images
  const agents = [
    { id: 1, specialty: 'Finance Agent', avatar: agent1 },
    { id: 2, specialty: 'Health Agent', avatar: agent2 },
    { id: 3, specialty: 'Career Agent', avatar: agent3 },
    { id: 4, specialty: 'Campus Agent', avatar: agent4 },
    { id: 5, specialty: 'Schedule Agent', avatar: agent5 },
    { id: 6, specialty: 'Classes Agent', avatar: agent6 },
    { id: 7, specialty: 'Academic Agent', avatar: agent7 },
    { id: 8, specialty: 'Admin Agent', avatar: agent8 },
  ];

  return (
    // Restore the original horizontal scrolling flex container
    <div className="flex items-center space-x-4 overflow-x-auto scrollbar-hide py-2 mb-2">
      <span className="text-sm font-semibold text-light-text dark:text-dark-text whitespace-nowrap flex-shrink-0 pl-1">Our Agents:</span>
      {agents.map(agent => (
         // Restore the original agent item structure and styling
        <div key={agent.id} className="group flex flex-col items-center text-center flex-shrink-0 w-18 cursor-pointer">
          <img
            src={agent.avatar} // Use the imported dynamic path
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