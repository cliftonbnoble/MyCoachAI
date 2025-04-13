import React, { useState, useEffect } from 'react';
import { FiSearch, FiArrowLeft, FiAlertTriangle } from 'react-icons/fi';
import StudentProfile from './StudentProfile.jsx';

const StudentSearch = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [errorDetails, setErrorDetails] = useState('');
  const [fadeOut, setFadeOut] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [apiData, setApiData] = useState({
    demographic: null,
    general: null,
    academic: null,
    health: null,
    financial: null,
    career: null
  });

  // Handle closing with animation
  const handleClose = () => {
    setFadeOut(true);
    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      onClose();
    }, 300); // Match this with the CSS transition duration
  };

  // Handle student selection
  const handleStudentSelect = (student) => {
    // Filter API data to only include this student's data
    const studentId = student.student_id_number;
    const filteredApiData = {};
    
    // Filter each endpoint's data for just this student
    Object.keys(apiData).forEach(endpoint => {
      if (apiData[endpoint] && Array.isArray(apiData[endpoint])) {
        const studentData = apiData[endpoint].find(item => item.student_id_number === studentId);
        filteredApiData[endpoint] = studentData || null;
      } else {
        filteredApiData[endpoint] = null;
      }
    });
    
    setSelectedStudent({...student, filteredApiData});
  };

  // Handle profile close
  const handleProfileClose = () => {
    setSelectedStudent(null);
  };

  // Fetch student data from the APIs
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const endpoints = {
          general: 'http://18.117.12.198:5001/api/general',
          demographic: 'http://18.117.12.198:5001/api/demographic',
          health: 'http://18.117.12.198:5001/api/health',
          financial: 'http://18.117.12.198:5001/api/financial',
          career: 'http://18.117.12.198:5001/api/career',
          academic: 'http://18.117.12.198:5001/api/academic'
        };

        // Fetch data from all endpoints for student details
        const fetchOptions = {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        };

        // Store API responses
        const responses = {};
        
        // Fetch each API endpoint
        for (const [key, url] of Object.entries(endpoints)) {
          try {
            const response = await fetch(url, fetchOptions);
            if (!response.ok) {
              throw new Error(`Error fetching ${key} data: ${response.status}`);
            }
            const data = await response.json();
            responses[key] = data;
          } catch (error) {
            // Continue with other endpoints if one fails
          }
        }

        // Save all API data for later use in student profiles
        setApiData(responses);

        // Make sure we have the essential demographic data
        if (!responses.demographic || responses.demographic.length === 0) {
          throw new Error('Failed to fetch demographic data');
        }

        const demographicData = responses.demographic;
        const academicData = responses.academic || [];
        
        // Create combined student records
        const combinedData = demographicData.map(demo => {
          // Ensure we use student_id_number for joining
          const joinKey = demo.student_id_number;
          
          // Find matching academic record using student_id_number
          const academic = academicData.find(a => a.student_id_number === joinKey);

          // Create student record using directly observed field names
          return {
            // Display the primary key used for joining
            student_id_number: joinKey || 'N/A', 
            first_name: demo.first_name || 'N/A',
            last_name: demo.last_name || 'N/A',
            // Access program_major directly, handle potential null/empty strings
            program_major: (academic && academic.program_major && academic.program_major.trim() !== '') ? academic.program_major : 'N/A'
          };
        });
        
        setStudents(combinedData);
        setFilteredStudents(combinedData);
        setLoading(false);
      } catch (error) {
        setApiError(true);
        setErrorDetails(error.message || 'Unknown error');
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  // Filter students based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredStudents(students);
    } else {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      const filtered = students.filter(student => 
        (student.student_id_number || '').toLowerCase().includes(lowercaseSearchTerm) ||
        (student.first_name || '').toLowerCase().includes(lowercaseSearchTerm) ||
        (student.last_name || '').toLowerCase().includes(lowercaseSearchTerm) ||
        (student.program_major || '').toLowerCase().includes(lowercaseSearchTerm)
      );
      setFilteredStudents(filtered);
    }
  }, [searchTerm, students]);

  // API Error component
  const ApiErrorMessage = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <FiAlertTriangle size={64} className="text-red-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Unable to Connect to API</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        We're having trouble connecting to the student database. Please try again later or contact IT support.
      </p>
      {errorDetails && (
        <div className="text-sm text-red-500 mb-4 p-2 bg-red-50 dark:bg-red-900/20 rounded">
          Error: {errorDetails}
        </div>
      )}
      <button 
        onClick={handleClose}
        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
      >
        Return to Chat
      </button>
    </div>
  );

  return (
    <div className={`w-full h-full flex flex-col bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text p-4 ${fadeOut ? 'animate-fade-out' : 'animate-fade-in'}`}>
      {/* Header with search and back button */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={handleClose}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
        >
          <FiArrowLeft size={20} className="mr-2" />
          <span>Back to Chat</span>
        </button>
        <h1 className="text-2xl font-bold">Student Search</h1>
        <div className="w-24"></div> {/* Empty div for centering the title */}
      </div>

      {apiError ? (
        <ApiErrorMessage />
      ) : (
        <>
          {/* Search input */}
          <div className="relative w-full max-w-2xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-500 dark:text-gray-400" size={20} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, name, or program..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
          </div>

          {/* Student table */}
          <div className="flex-1 overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-md custom-scrollbar">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Student ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      First Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Last Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Program/Major
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr 
                        key={student.student_id_number || `student-${Math.random()}`}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                        onClick={() => handleStudentSelect(student)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">{student.student_id_number || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.first_name || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.last_name || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.program_major || 'N/A'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                        No students found matching your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      {/* Student Profile Modal */}
      {selectedStudent && (
        <StudentProfile 
          student={selectedStudent}
          onClose={handleProfileClose}
          apiData={selectedStudent.filteredApiData || apiData}
        />
      )}
    </div>
  );
};

export default StudentSearch; 