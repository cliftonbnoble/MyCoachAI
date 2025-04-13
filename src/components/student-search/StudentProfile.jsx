import React, { useState } from 'react';
import { 
  FiX, 
  FiUser, 
  FiInfo, 
  FiBookOpen, 
  FiActivity, 
  FiDollarSign, 
  FiBriefcase, 
  FiCpu,
  FiCalendar,
  FiMail,
  FiPhone,
  FiHome,
  FiMapPin
} from 'react-icons/fi';
import collegePortrait from '../../assets/college-portrait.jpg';

const StudentProfile = ({ student, onClose, apiData }) => {
  const [activeTab, setActiveTab] = useState('demographic');
  const [fadeOut, setFadeOut] = useState(false);
  
  // Ensure we have structured data
  const safeApiData = {
    demographic: apiData?.demographic || {},
    general: apiData?.general || {},
    academic: apiData?.academic || {},
    health: apiData?.health || {},
    financial: apiData?.financial || {},
    career: apiData?.career || {}
  };
  
  // Tabs configuration with icons and labels
  const tabs = [
    { id: 'demographic', label: 'Demographic', icon: <FiUser size={18} /> },
    { id: 'general', label: 'General', icon: <FiInfo size={18} /> },
    { id: 'academic', label: 'Academic', icon: <FiBookOpen size={18} /> },
    { id: 'health', label: 'Health', icon: <FiActivity size={18} /> },
    { id: 'financial', label: 'Financial', icon: <FiDollarSign size={18} /> },
    { id: 'career', label: 'Career', icon: <FiBriefcase size={18} /> },
    { id: 'ai', label: 'AI Insights', icon: <FiCpu size={18} /> }
  ];

  // Handle close with animation
  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Stop propagation for modal content clicks
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  // Get icon for field type
  const getFieldIcon = (key) => {
    const iconMap = {
      email: <FiMail className="text-gray-400" size={16} />,
      phone: <FiPhone className="text-gray-400" size={16} />,
      address: <FiHome className="text-gray-400" size={16} />,
      city: <FiMapPin className="text-gray-400" size={16} />,
      birthday: <FiCalendar className="text-gray-400" size={16} />,
      date: <FiCalendar className="text-gray-400" size={16} />
    };
    
    // Look for keywords in the field name
    for (const [keyword, icon] of Object.entries(iconMap)) {
      if (key.toLowerCase().includes(keyword)) {
        return icon;
      }
    }
    
    return null;
  };

  // Format object data for display
  const formatData = (obj, tabId) => {
    if (!obj || Object.keys(obj).length === 0) {
      return (
        <div className="text-center p-8">
          <p className="text-gray-500 italic">No data available</p>
        </div>
      );
    }

    // Group related fields together when possible
    const relatedGroups = {};
    let remainingFields = [];

    Object.entries(obj).forEach(([key, value]) => {
      // Skip the student_id_number as it's already displayed at the top
      if (key === 'student_id_number') return;
      
      // Try to categorize fields
      const categoryMatch = key.match(/^([a-z]+)_.*$/);
      if (categoryMatch) {
        const category = categoryMatch[1];
        if (!relatedGroups[category]) {
          relatedGroups[category] = [];
        }
        relatedGroups[category].push([key, value]);
      } else {
        remainingFields.push([key, value]);
      }
    });

    // Prepare data cards
    const dataCards = [];
    
    // Add categorized groups first
    Object.entries(relatedGroups).forEach(([category, fields]) => {
      if (fields.length > 0) {
        dataCards.push(
          <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-700">
              <h3 className="font-medium text-gray-700 dark:text-white capitalize">{category} Information</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {fields.map(([key, value]) => renderDataField(key, value))}
              </div>
            </div>
          </div>
        );
      }
    });
    
    // Add remaining fields
    if (remainingFields.length > 0) {
      dataCards.push(
        <div key="other" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-700">
            <h3 className="font-medium text-gray-700 dark:text-white">{tabId.charAt(0).toUpperCase() + tabId.slice(1)} Details</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {remainingFields.map(([key, value]) => renderDataField(key, value))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-5">
        {dataCards}
      </div>
    );
  };

  // Render individual data field
  const renderDataField = (key, value) => {
    let displayValue = value;
    
    // Format the value based on type
    if (value === null || value === undefined) {
      displayValue = 'N/A';
    } else if (typeof value === 'boolean') {
      displayValue = value ? 'Yes' : 'No';
    } else if (value instanceof Date) {
      displayValue = value.toLocaleDateString();
    } else if (typeof value === 'string' && value.includes('T00:00:00.000Z')) {
      // Format ISO date strings
      displayValue = new Date(value).toLocaleDateString();
    }
    
    const fieldIcon = getFieldIcon(key);
    
    return (
      <div key={key} className="flex items-start">
        {fieldIcon && <div className="mt-0.5 mr-2">{fieldIcon}</div>}
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 capitalize mb-0.5">
            {key.replace(/_/g, ' ')}
          </div>
          <div className="font-medium text-gray-900 dark:text-gray-100">{displayValue}</div>
        </div>
      </div>
    );
  };

  // Student profile sidebar - reused across tabs
  const StudentProfileSidebar = () => (
    <div className="w-full h-full overflow-hidden">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 flex flex-col items-center">
        <div className="w-40 h-40 mb-4 relative">
          <div className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden border-4 border-primary">
            <img 
              src={collegePortrait} 
              alt="Student portrait" 
              className="w-full h-full object-cover object-top scale-[1.15]"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = `
                  <div class="text-6xl text-gray-400 dark:text-gray-500 font-bold">
                    ${student.first_name?.[0] || ''}${student.last_name?.[0] || ''}
                  </div>
                `;
              }}
            />
          </div>
        </div>
        <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{student.first_name} {student.last_name}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">ID: {student.student_id_number}</p>
        
        <div className="w-full border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
          <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Quick Info</h4>
          <div className="space-y-3">
            {safeApiData.demographic && safeApiData.demographic.email && (
              <div className="flex items-center text-sm">
                <FiMail className="text-gray-400 mr-2" />
                <span className="text-gray-900 dark:text-white">{safeApiData.demographic.email}</span>
              </div>
            )}
            {safeApiData.demographic && safeApiData.demographic.phone && (
              <div className="flex items-center text-sm">
                <FiPhone className="text-gray-400 mr-2" />
                <span className="text-gray-900 dark:text-white">{safeApiData.demographic.phone}</span>
              </div>
            )}
            {safeApiData.academic && safeApiData.academic.program_major && (
              <div className="flex items-center text-sm">
                <FiBookOpen className="text-gray-400 mr-2" />
                <span className="text-gray-900 dark:text-white">{safeApiData.academic.program_major}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Tab content components
  const TabContent = ({ tabId }) => {
    // AI Insights tab has a unique layout
    if (tabId === 'ai') {
      return (
        <div className="flex flex-col items-center justify-center text-center p-12">
          <FiCpu size={64} className="text-primary mb-6" />
          <h3 className="text-2xl font-bold mb-2">AI Insights Coming Soon</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg">
            We're working on intelligent analysis of student data to provide personalized insights and recommendations.
          </p>
        </div>
      );
    }
    
    // All other tabs share the same layout
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left sidebar with student profile */}
        <div className="col-span-1">
          <StudentProfileSidebar />
        </div>
        
        {/* Main content area */}
        <div className="col-span-3">
          {formatData(safeApiData[tabId], tabId)}
        </div>
      </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-[1000] flex items-center justify-center p-4 animate-fade-in"
      onClick={handleClose}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div 
        className="bg-gray-100 dark:bg-gray-900 w-full max-w-7xl h-5/6 rounded-lg shadow-xl flex flex-col overflow-hidden"
        onClick={handleContentClick}
        style={{ maxHeight: '90vh' }}
      >
        {/* Header with student name, ID and close button */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{student.first_name} {student.last_name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Student ID: {student.student_id_number}</p>
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Tabs - Centered */}
        <div className="bg-white dark:bg-gray-800 px-6 py-2 flex justify-center overflow-x-auto custom-scrollbar border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-primary text-gray-900 font-medium' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <TabContent tabId={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default StudentProfile; 