import React, { useState } from 'react';

// Import agent images from the new assets folder
import agent1 from '../assets/agent1.png';
import agent2 from '../assets/agent2.png';
import agent3 from '../assets/agent3.png';
import agent4 from '../assets/agent4.png';
import agent5 from '../assets/agent5.png';
import agent6 from '../assets/agent6.png';
import agent7 from '../assets/agent7.png';
import agent8 from '../assets/agent8.png';

const AgentSelector = ({ portalType = 'student' }) => {
  // Track hover state for each agent
  const [hoveredAgentId, setHoveredAgentId] = useState(null);
  
  // Different agents based on portal type
  const studentAgents = [
    { id: 1, specialty: 'Finance Agent', avatar: agent1 },
    { id: 2, specialty: 'Health Agent', avatar: agent2 },
    { id: 3, specialty: 'Career Agent', avatar: agent3 },
    { id: 4, specialty: 'Campus Agent', avatar: agent4 },
    { id: 5, specialty: 'Schedule Agent', avatar: agent5 },
    { id: 6, specialty: 'Classes Agent', avatar: agent6 },
    { id: 7, specialty: 'Academic Agent', avatar: agent7 },
    { id: 8, specialty: 'Admin Agent', avatar: agent8 },
  ];
  
  const staffAgents = [
    { id: 1, specialty: 'Records Agent', avatar: agent1 },
    { id: 2, specialty: 'Admissions Agent', avatar: agent2 },
    { id: 3, specialty: 'HR Agent', avatar: agent3 },
    { id: 4, specialty: 'Budget Agent', avatar: agent4 },
    { id: 5, specialty: 'Admin Agent', avatar: agent5 },
    { id: 6, specialty: 'Faculty Agent', avatar: agent6 },
    { id: 7, specialty: 'IT Agent', avatar: agent7 },
    { id: 8, specialty: 'Analytics Agent', avatar: agent8 },
  ];
  
  // Select the appropriate agents based on portal type
  const agents = portalType === 'student' ? studentAgents : staffAgents;

  return (
    <div className="w-full pb-4">
      {/* Main container with fixed height to prevent layout shifts */}
      <div className="flex justify-center overflow-hidden relative">
        {/* Scroll container - isolated margin to prevent interaction with other elements */}
        <div 
          className="flex items-center space-x-6 overflow-x-auto scrollbar-hide py-4 px-4 custom-scrollbar" 
          style={{ 
            maxWidth: '900px', 
            minHeight: '110px',  // Ensure consistent height
            isolation: 'isolate' // Isolate this container from others
          }}
        >
          {agents.map((agent) => {
            const isHovered = hoveredAgentId === agent.id;
            
            return (
              <div 
                key={agent.id} 
                className="flex-shrink-0 w-20 cursor-pointer"
                style={{ 
                  height: '100px',
                  position: 'relative',
                  isolation: 'isolate', // Each agent container is isolated
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'transform 300ms ease-out'
                }}
                onMouseEnter={() => setHoveredAgentId(agent.id)}
                onMouseLeave={() => setHoveredAgentId(null)}
              >
                {/* Centered content wrapper */}
                <div className="flex flex-col items-center text-center">
                  {/* Avatar wrapper with fixed position and dimensions */}
                  <div className="relative w-16 h-16 mb-2" style={{ zIndex: 2 }}>
                    {/* Glow effect */}
                    {isHovered && (
                      <div 
                        className="absolute -inset-2 rounded-full bg-primary/20 blur-md"
                        style={{ zIndex: -1 }}
                      />
                    )}
                    
                    {/* Ping effect */}
                    {isHovered && (
                      <div 
                        className="absolute inset-0 rounded-full animate-ping bg-primary/10"
                        style={{ animationDuration: '1.5s' }}
                      />
                    )}
                    
                    {/* Actual avatar image */}
                    <img
                      src={agent.avatar}
                      alt={agent.specialty}
                      className="absolute inset-0 w-full h-full rounded-full shadow-sm"
                      style={{
                        zIndex: 2,
                        transform: isHovered ? 'scale(1.15) rotate(3deg)' : 'scale(1)',
                        boxShadow: isHovered ? '0 4px 8px rgba(250, 204, 21, 0.2)' : '',
                        transition: 'transform 300ms ease-out, box-shadow 300ms ease-out'
                      }}
                    />
                  </div>
                  
                  {/* Name label with fixed position */}
                  <div className="h-8 flex items-center justify-center w-full">
                    <span
                      className="text-xs whitespace-nowrap"
                      style={{
                        fontWeight: isHovered ? 600 : 500,
                        color: isHovered ? 'var(--primary)' : '',
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 300ms ease-out, color 300ms ease-out, font-weight 300ms ease-out'
                      }}
                    >
                      {agent.specialty}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AgentSelector; 