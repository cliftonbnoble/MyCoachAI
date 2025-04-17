import React, { useState } from 'react';
// Import agent data from the new constants file
import { studentAgents, staffAgents } from '../constants/agents';
import { cn } from "@/lib/utils"; // Assuming cn is available for combining classes

// // Import agent images from the new assets folder // REMOVED - Handled in constants
// import agent1 from '../assets/agent1.png';
// import agent2 from '../assets/agent2.png';
// import agent3 from '../assets/agent3.png';
// import agent4 from '../assets/agent4.png';
// import agent5 from '../assets/agent5.png';
// import agent6 from '../assets/agent6.png';
// import agent7 from '../assets/agent7.png';
// import agent8 from '../assets/agent8.png';

// Accept selectedAgent state and onAgentSelect handler
const AgentSelector = ({ portalType = 'student', selectedAgent, onAgentSelect }) => {
  // Track hover state for each agent (still useful for hover effects)
  const [hoveredAgentId, setHoveredAgentId] = useState(null);
  
  // // Different agents based on portal type // REMOVED - Using imported data
  // const studentAgents = [
  //   { id: 1, specialty: 'Finance Agent', avatar: agent1 },
  //   { id: 2, specialty: 'Health Agent', avatar: agent2 },
  //   { id: 3, specialty: 'Career Agent', avatar: agent3 },
  //   { id: 4, specialty: 'Campus Agent', avatar: agent4 },
  //   { id: 5, specialty: 'Schedule Agent', avatar: agent5 },
  //   { id: 6, specialty: 'Classes Agent', avatar: agent6 },
  //   { id: 7, specialty: 'Academic Agent', avatar: agent7 },
  //   { id: 8, specialty: 'Admin Agent', avatar: agent8 },
  // ];
  // 
  // const staffAgents = [
  //   { id: 1, specialty: 'Records Agent', avatar: agent1 },
  //   { id: 2, specialty: 'Admissions Agent', avatar: agent2 },
  //   { id: 3, specialty: 'HR Agent', avatar: agent3 },
  //   { id: 4, specialty: 'Budget Agent', avatar: agent4 },
  //   { id: 5, specialty: 'Admin Agent', avatar: agent5 },
  //   { id: 6, specialty: 'Faculty Agent', avatar: agent6 },
  //   { id: 7, specialty: 'IT Agent', avatar: agent7 },
  //   { id: 8, specialty: 'Analytics Agent', avatar: agent8 },
  // ];
  
  // Select the appropriate agents based on portal type (Now uses imported data)
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
            const isSelected = selectedAgent?.id === agent.id; // Check if this agent is selected
            
            return (
              // Use a button for accessibility
              <button 
                key={agent.id} 
                onClick={() => onAgentSelect(agent)} // Call handler on click
                className={cn(
                  "flex-shrink-0 w-20 cursor-pointer group focus:outline-none rounded-lg",
                  "transition-all duration-300 ease-out", // Base transition
                  isSelected ? "scale-105" : "scale-100", // Scale selected
                  isHovered && !isSelected ? "translate-y-[-2px]" : "translate-y-0" // Hover effect if not selected
                )}
                style={{ 
                  height: '100px',
                  position: 'relative',
                  isolation: 'isolate', // Each agent container is isolated
                }}
                onMouseEnter={() => setHoveredAgentId(agent.id)}
                onMouseLeave={() => setHoveredAgentId(null)}
                aria-pressed={isSelected} // Indicate selection state for accessibility
              >
                {/* Centered content wrapper */}
                <div className="flex flex-col items-center text-center">
                  {/* Avatar wrapper with fixed position and dimensions */}
                  <div className={cn(
                       "relative w-16 h-16 mb-2 transition-all duration-300 ease-out",
                       // Remove selection ring, keep focus ring
                       isSelected ? "" : "group-focus:ring-2 group-focus:ring-primary" 
                      )}
                      style={{ zIndex: 2 }}
                    >
                    {/* Glow effect - show ONLY for selected, make it stronger/larger */}
                    {isSelected && (
                      <div 
                        className="absolute -inset-2.5 rounded-full bg-primary/40 blur-lg" // Increased inset, opacity, and blur
                        style={{ zIndex: -1 }}
                      />
                    )}
                    
                    {/* Ping effect - show only for selected */}
                    {isSelected && (
                      <div 
                        className="absolute inset-0 rounded-full animate-ping bg-primary/10"
                        style={{ animationDuration: '1.5s', zIndex: 1 }} 
                      />
                    )}
                    
                    {/* Actual avatar image */}
                    <img
                      src={agent.avatar}
                      alt={agent.specialty}
                      className="absolute inset-0 w-full h-full rounded-full shadow-sm transition-transform duration-300 ease-out"
                      style={{
                        zIndex: 2,
                        transform: (isHovered || isSelected) ? 'scale(1.15) rotate(3deg)' : 'scale(1)', // Scale/rotate on hover or select
                        boxShadow: (isHovered || isSelected) ? '0 4px 8px rgba(250, 204, 21, 0.2)' : '',
                      }}
                    />
                  </div>
                  
                  {/* Name label with fixed position */}
                  <div className="h-8 flex items-center justify-center w-full">
                    <span
                      className={cn(
                        "text-xs whitespace-nowrap transition-all duration-300 ease-out",
                        isSelected ? "font-semibold text-primary scale-110" : "font-medium group-hover:font-semibold group-hover:scale-105" // Style selected/hovered text
                      )}
                    >
                      {agent.specialty}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AgentSelector; 