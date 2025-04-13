import React from 'react';
import PortalLayout from './shared/PortalLayout.jsx';
import roboAgentLogo from '../assets/robo-agent-logo.png';
import { studentResponseGenerator } from '../utils/responseGenerators';

// Student-specific sidebar configuration
const studentSidebarConfig = {
  userName: "John Doe",
  userType: "Student"
};

const StudentPortal = () => {
  return (
    <PortalLayout 
      portalType="student"
      responseGenerator={studentResponseGenerator}
      logoImage={roboAgentLogo}
      sidebarConfig={studentSidebarConfig}
    />
  );
};

export default StudentPortal; 