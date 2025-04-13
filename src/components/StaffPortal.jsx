import React from 'react';
import PortalLayout from './shared/PortalLayout.jsx';
import roboAgentLogo from '../assets/robo-agent-logo.png';
import { staffResponseGenerator } from '../utils/responseGenerators';

// Staff-specific sidebar configuration
const staffSidebarConfig = {
  userName: "Jane Smith",
  userType: "Staff"
};

const StaffPortal = () => {
  return (
    <PortalLayout 
      portalType="staff"
      responseGenerator={staffResponseGenerator}
      logoImage={roboAgentLogo}
      sidebarConfig={staffSidebarConfig}
    />
  );
};

export default StaffPortal; 