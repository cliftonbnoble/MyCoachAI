import React, { useState } from 'react';
import Sidebar from '../Sidebar.jsx';
import ChatInterface from '../ChatInterface.jsx';
import AgentSelector from '../AgentSelector.jsx';
import StudentSearch from '../student-search/StudentSearch.jsx';
import { FiDollarSign, FiBriefcase, FiFileText, FiCalendar, FiUsers, FiBookOpen, FiHelpCircle, FiAlertCircle } from 'react-icons/fi'; // Import icons for notifications
// Import the Gemini API function
import { fetchGeminiResponse } from '../../utils/geminiApi'; 

const PortalLayout = ({ 
  portalType = 'student', // 'student' or 'staff'
  // responseGenerator, // No longer needed for direct Gemini call
  logoImage,
  sidebarConfig = {}
}) => {
  // UI state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showStudentSearch, setShowStudentSearch] = useState(false);
  
  // Chat state
  const [hasChatStarted, setHasChatStarted] = useState(false);
  const [messages, setMessages] = useState([]); 
  const [nextId, setNextId] = useState(1); 
  // isAiTyping state might be replaced by the loading message logic
  // const [isAiTyping, setIsAiTyping] = useState(false);

  // Notification State (Lifted)
  const [notifications, setNotifications] = useState([
    // Reminders (Tasks/Dates)
    { id: 1, category: 'reminder', text: 'Turn in financial aid application by Oct 31st.', icon: FiDollarSign },
    { id: 3, category: 'reminder', text: 'Turn in transcripts by Nov 15th.', icon: FiFileText },
    { id: 4, category: 'reminder', text: 'Schedule meeting with advisor before registration opens.', icon: FiCalendar },

    // Recommendations (AI Suggestions)
    { id: 2, category: 'recommendation', text: 'Finish Resume/CV for job application based on your career goals.', icon: FiBriefcase },
    { id: 5, category: 'recommendation', text: 'Explore the new campus clubs for networking opportunities.', icon: FiUsers },
    { id: 6, category: 'recommendation', text: 'Review study resources for upcoming mid-term exam.', icon: FiBookOpen },

    // Reviews (Follow-ups/Misc)
    { id: 7, category: 'review', text: 'Follow up on library book hold request.', icon: FiHelpCircle },
    { id: 8, category: 'review', text: 'Past due: Submit course feedback survey.', icon: FiAlertCircle }, // Use a different icon maybe
  ]);
  const notificationCount = notifications.length;
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);

  // State for selected agent
  const [selectedAgent, setSelectedAgent] = useState(null); // null = no agent selected

  // Handler for agent selection
  const handleAgentSelect = (agent) => {
    // Only reset chat if a *different* agent is selected
    if (selectedAgent?.id !== agent?.id) {
      setMessages([]);
      setHasChatStarted(false);
      // setIsAiTyping(false);
    }
    setSelectedAgent(agent); 
  };

  // Notification Handlers
  const handleAcceptNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    // Optionally close panel if empty?
    // if (notifications.length === 1) setIsNotificationPanelOpen(false);
  };

  const handleRejectNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    // Optionally close panel if empty?
    // if (notifications.length === 1) setIsNotificationPanelOpen(false);
  };

  // New handler to send notification text to chat
  const handleDiscussNotification = (notificationText) => {
    if (!notificationText) return;
    // Close the notification panel
    setIsNotificationPanelOpen(false);
    // Send the text to the chat interface
    handleSendMessage(notificationText);
    // Remove the notification after discussing it (optional, based on desired behavior)
    // setNotifications(prev => prev.filter(n => n.text !== notificationText)); // Be careful if text isn't unique
  };

  const handleToggleNotificationPanel = () => {
    setIsNotificationPanelOpen(prev => !prev);
  };

  // Sidebar toggle handler
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Message handling - Simplified addMessage, maybe keep original if complex logic exists
  // const addMessage = (sender, text, icon = null, isLoading = false, isError = false) => {
  //   const newMessage = { id: `${sender}-${nextId}`, sender, text, icon, timestamp: new Date(), agentId: selectedAgent?.id, isLoading, isError }; // Add necessary fields
  //   setMessages(prevMessages => [...prevMessages, newMessage]);
  //   setNextId(prevId => prevId + 1);
  // };

  // AI response generator - No longer directly called by handleSendMessage
  // const triggerAiResponse = () => { ... }; // Comment out or remove

  // User message handler - REWRITTEN for Gemini API
  const handleSendMessage = async (text) => {
    if (!text || text.trim() === '' || !selectedAgent) return; // Ensure agent is selected

    const userMessage = {
        id: `user-${nextId}`, 
        sender: 'user',
        text: text.trim(),
        timestamp: new Date(),
        agentId: selectedAgent.id, // Link message to agent
        icon: null, // Or add user avatar logic if available
    };
    
    // Use functional update to ensure we have the latest state
    setMessages(prevMessages => [...prevMessages, userMessage]);
    const currentNextId = nextId + 1;
    setNextId(currentNextId); // Increment ID for next message

    if (!hasChatStarted) {
        setHasChatStarted(true);
    }

    // Add a loading indicator message
    const loadingMessageId = `ai-loading-${currentNextId}`;
    const loadingMessage = {
        id: loadingMessageId,
        sender: 'assistant',
        text: '...', // Simple text indicator
        isLoading: true,
        timestamp: new Date(),
        agentId: selectedAgent.id,
        icon: selectedAgent.avatar, // Use agent avatar
    };
    setMessages(prevMessages => [...prevMessages, loadingMessage]);
    setNextId(currentNextId + 1); // Increment ID again

    // Fetch the actual response from Gemini
    try {
        // Construct a prompt including agent context
        const prompt = `You are the ${selectedAgent.specialty}. Respond to the user accordingly.
User: ${text.trim()}
Assistant:`;
        const aiResponseText = await fetchGeminiResponse(prompt); // Call the API function

        const aiMessage = {
            id: `ai-${currentNextId + 1}`, // Use incremented ID
            sender: 'assistant',
            text: aiResponseText,
            timestamp: new Date(),
            agentId: selectedAgent.id,
            icon: selectedAgent.avatar, // Use agent avatar
        };

        // Replace loading message with the actual response
        setMessages(prevMessages =>
            prevMessages.map(msg =>
                msg.id === loadingMessageId ? aiMessage : msg
            )
        );
        setNextId(currentNextId + 2); // Final ID increment

    } catch (error) {
         console.error("Error in handleSendMessage calling Gemini API:", error);
         const errorMessage = {
             id: `err-${currentNextId + 1}`, // Use incremented ID
             sender: 'assistant',
             text: "Sorry, something went wrong while getting my response.",
             isError: true,
             timestamp: new Date(),
             agentId: selectedAgent.id,
             icon: selectedAgent.avatar, // Use agent avatar
         };
         // Replace loading message with an error message
         setMessages(prevMessages =>
             prevMessages.map(msg =>
                 msg.id === loadingMessageId ? errorMessage : msg
             )
         );
         setNextId(currentNextId + 2); // Final ID increment
    }
  };

  // New chat handler - resets chat and exits student search if active
  const handleNewChat = () => {
      if (showStudentSearch) {
        setShowStudentSearch(false);
      }
      
      setMessages([]);
      setHasChatStarted(false);
      // setIsAiTyping(false);
      setSelectedAgent(null); // Reset selected agent to show default view
  };

  // Student search toggle handler
  const handleToggleStudentSearch = () => {
    setShowStudentSearch(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        onNewChat={handleNewChat}
        portalType={portalType}
        onStudentSearch={handleToggleStudentSearch}
        notifications={notifications}
        onAcceptNotification={handleAcceptNotification}
        onRejectNotification={handleRejectNotification}
        onDiscussNotification={handleDiscussNotification}
        isNotificationPanelOpen={isNotificationPanelOpen}
        onToggleNotificationPanel={handleToggleNotificationPanel}
        {...sidebarConfig}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center h-full">
        {/* Inner container */}
        <div className={`w-full max-w-7xl transition-all duration-300 ease-in-out px-4 sm:px-6 flex flex-col h-full pt-2 pb-2`}>
          {showStudentSearch && portalType === 'staff' ? (
            <StudentSearch onClose={handleToggleStudentSearch} />
          ) : (
            <>
              {/* Agent Selector */}
              <div className={`mb-2 transition-opacity duration-300 ${showStudentSearch ? 'opacity-0' : 'opacity-100'}`}>
                <AgentSelector 
                  portalType={portalType} 
                  selectedAgent={selectedAgent} // Pass down selected agent state
                  onAgentSelect={handleAgentSelect} // Pass down handler
                />
              </div>
              {/* Chat Interface */}
              <ChatInterface 
                messages={messages}
                hasChatStarted={hasChatStarted}
                // isAiTyping={isAiTyping} // Remove if using loading message only
                handleSendMessage={handleSendMessage}
                portalType={portalType}
                logoImage={logoImage} // Maybe remove if agent avatar is used
                notificationCount={notificationCount}
                onToggleNotificationPanel={handleToggleNotificationPanel}
                selectedAgent={selectedAgent}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortalLayout; 