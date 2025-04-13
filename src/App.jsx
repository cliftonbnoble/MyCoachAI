import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import StudentPortal from './components/StudentPortal.jsx';
import StaffPortal from './components/StaffPortal.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student" element={<StudentPortal />} />
        <Route path="/staff" element={<StaffPortal />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App; 