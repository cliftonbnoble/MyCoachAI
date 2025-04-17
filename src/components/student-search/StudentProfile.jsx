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
  FiMapPin,
  FiAlertTriangle,
  FiFileText
} from 'react-icons/fi';
import collegePortrait from '../../assets/college-portrait.jpg';

// Helper function to render a field, similar to previous renderDataField but simplified
const ProfileField = ({ label, value, icon }) => {
  let displayValue = value;
  if (value === null || value === undefined || value === '') {
    displayValue = <span className="text-gray-500 italic">N/A</span>;
  } else if (typeof value === 'boolean') {
    displayValue = value ? 'Yes' : 'No';
  } else if (typeof value === 'string' && value.includes('T00:00:00.000Z')) {
    try {
      displayValue = new Date(value).toLocaleDateString();
    } catch (e) { 
      displayValue = value; // Fallback if date is invalid
    }
  }

  return (
    <div className="flex items-start text-sm mb-2">
      {icon && <div className="mt-0.5 mr-2 flex-shrink-0 w-4 h-4 text-gray-400">{icon}</div>}
      <div className="flex-1 min-w-0">
        <div className="text-xs text-gray-500 dark:text-gray-400 capitalize mb-0.5 truncate">
          {label.replace(/_/g, ' ')}
        </div>
        <div className="font-medium text-gray-900 dark:text-gray-100 break-words">{displayValue}</div>
      </div>
    </div>
  );
};

// Helper component for creating styled boxes
const InfoBox = ({ title, children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 mb-6">
    <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-700/50">
      <h3 className="font-semibold text-base text-gray-800 dark:text-white">{title}</h3>
    </div>
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1">
      {children}
    </div>
  </div>
);

// --- Tab Content Components ---

// Demographic Tab Layout
const DemographicTabContent = ({ data }) => (
  <div>
    <InfoBox title="Student Information">
      <ProfileField label="First Name" value={data.first_name} icon={<FiUser />} />
      <ProfileField label="Last Name" value={data.last_name} icon={<FiUser />} />
      <ProfileField label="Preferred Name" value={data.preferred_name} icon={<FiUser />} />
      <ProfileField label="Nickname" value={data.nickname} icon={<FiUser />} />
      <ProfileField label="Date of Birth" value={data.date_of_birth} icon={<FiCalendar />} />
      <ProfileField label="Place of Birth" value={data.place_of_birth} icon={<FiMapPin />} />
      <ProfileField label="Gender" value={data.gender} />
      <ProfileField label="Ethnicity / Race" value={data.ethnicity_race} />
      <ProfileField label="Marital Status" value={data.marital_status} />
      <ProfileField label="Nationality" value={data.nationality} />
      <ProfileField label="Citizenship" value={data.citizenship} />
      <ProfileField label="Residency Status" value={data.residency_status_in_state_out_of_state_intl} />
      <ProfileField label="Primary Language" value={data.primary_language} />
      <ProfileField label="Secondary Languages" value={data.secondary_languages} />
      <ProfileField label="Spoken Languages" value={data.spoken_languages} />
      <ProfileField label="Military Status" value={data.military_status} />
      <ProfileField label="Veteran Status" value={data.veteran_status} />
    </InfoBox>
    <InfoBox title="Contact Information">
      <ProfileField label="Institutional Email" value={data.email_institutional} icon={<FiMail />} />
      <ProfileField label="Personal Email" value={data.email_personal} icon={<FiMail />} />
      <ProfileField label="Mobile Phone" value={data.phone_number_mobile} icon={<FiPhone />} />
      <ProfileField label="Current Address" value={data.address_current} icon={<FiHome />} />
      <ProfileField label="Preferred Contact Method" value={data.preferred_method_of_contact} />
    </InfoBox>
    <InfoBox title="Emergency Contact">
      <ProfileField label="Name" value={data.emergency_contact_name} icon={<FiUser />} />
      <ProfileField label="Relationship" value={data.emergency_contact_relationship} />
      <ProfileField label="Phone" value={data.emergency_contact_phone} icon={<FiPhone />} />
    </InfoBox>
  </div>
);

// Academic Tab Layout
const AcademicTabContent = ({ data }) => (
  <div>
    <InfoBox title="Enrollment Details">
      <ProfileField label="Program/Major" value={data.program_major} icon={<FiBookOpen />} />
      <ProfileField label="Department" value={data.department} />
      <ProfileField label="Minor" value={data.minor} />
      <ProfileField label="Degree Type" value={data.degree_type} />
      <ProfileField label="Enrollment Status" value={data.enrollment_status} />
      <ProfileField label="Start Date" value={data.start_date} icon={<FiCalendar />} />
      <ProfileField label="Expected Graduation" value={data.expected_graduation_date} icon={<FiCalendar />} />
      <ProfileField label="Graduation Status" value={data.graduation_status} />
      <ProfileField label="Academic Level" value={data.academic_level} />
      <ProfileField label="School/College" value={data.school_college} />
    </InfoBox>
    <InfoBox title="Performance">
      <ProfileField label="Cumulative GPA" value={data.gpa_cumulative} />
      <ProfileField label="Term GPA" value={data.gpa_term} />
      <ProfileField label="Credits Earned" value={data.credit_hours_earned} />
      <ProfileField label="Credits Attempted" value={data.credit_hours_attempted} />
      <ProfileField label="Transfer Credits" value={data.transfer_credits} />
    </InfoBox>
    <InfoBox title="Advising">
      <ProfileField label="Advisor Name" value={data.advisor_name} icon={<FiUser />} />
    </InfoBox>
  </div>
);

// Health Tab Layout
const HealthTabContent = ({ data }) => (
  <div>
    {/* Box 1: Medical Conditions & History */}
    <InfoBox title="Medical Conditions & History">
      <ProfileField label="Emergency Medical Conditions" value={data.emergency_medical_conditions} icon={<FiAlertTriangle />} />
      <ProfileField label="Health Flags (e.g., Asthma)" value={data.health_flag_eg_asthma_epilepsy} />
      <ProfileField label="Allergies" value={data.allergies} />
      <ProfileField label="Food Allergies" value={data.food_allergies} />
      <ProfileField label="Injury Reports" value={data.injury_reports} />
      <ProfileField label="Medical Notes on File" value={data.medical_notes_on_file} icon={<FiFileText />} />
    </InfoBox>
    
    {/* Box 2: Insurance & Providers */}
    <InfoBox title="Insurance & Providers">
      <ProfileField label="Health Insurance Provider" value={data.health_insurance_provider} />
      <ProfileField label="Insurance Expiry" value={data.health_insurance_expiry} icon={<FiCalendar />} />
      <ProfileField label="Primary Care Provider" value={data.primary_care_provider_info} icon={<FiUser />} />
    </InfoBox>

    {/* Box 3: Immunization & Compliance */}
    <InfoBox title="Immunization & Compliance">
      <ProfileField label="Immunization Compliance" value={data.immunization_compliance_status} />
      <ProfileField label="Immunization Records" value={data.immunization_records} icon={<FiFileText />} />
      <ProfileField label="COVID-19 Vaccination" value={data.covid_19_vaccination_status} />
      <ProfileField label="HIPAA Consent Forms" value={data.hipaa_consent_forms} icon={<FiFileText />} />
    </InfoBox>
    
    {/* Box 4: Wellbeing & Lifestyle */}
    <InfoBox title="Wellbeing & Lifestyle">
      <ProfileField label="Emotional Wellbeing Score" value={data.emotional_wellbeing_score} />
      <ProfileField label="Mental Health Self-Assessments" value={data.mental_health_self_assessments} />
      <ProfileField label="Counseling Intake Forms" value={data.counseling_intake_forms} icon={<FiFileText />} />
      <ProfileField label="Psychological Evaluation Results" value={data.psychological_evaluation_results} icon={<FiFileText />} />
      <ProfileField label="Nutrition Plan" value={data.nutrition_plan} />
      <ProfileField label="Physical Activity Level" value={data.physical_activity_level} />
      <ProfileField label="Fitness Center Access" value={data.fitness_center_access} />
      <ProfileField label="Fitness Tracker Integration" value={data.fitness_tracker_integration} />
      <ProfileField label="Weight/BMI Tracking" value={data.weight_bmi_tracking} />
    </InfoBox>
    
    {/* Box 5: Accessibility & Medication */}
    <InfoBox title="Accessibility & Medication">
      <ProfileField label="Disability Accommodations" value={data.disability_accommodations} />
      <ProfileField label="Prescription Medication on File" value={data.prescription_medication_on_file} />
    </InfoBox>
  </div>
);

// Financial Tab Layout
const FinancialTabContent = ({ data }) => (
  <div>
    <InfoBox title="Financial Aid">
      <ProfileField label="Aid Eligibility" value={data.aid_eligibility} />
      <ProfileField label="FAFSA Status" value={data.fafsa_status} />
      <ProfileField label="FAFSA Submission Date" value={data.fafsa_submission_date} icon={<FiCalendar />} />
      <ProfileField label="Financial Aid Status" value={data.financial_aid_status} />
      <ProfileField label="Total Aid Awarded" value={data.total_aid_awarded} icon={<FiDollarSign />} />
      <ProfileField label="Remaining Aid" value={data.remaining_aid} icon={<FiDollarSign />} />
      <ProfileField label="Grant Awards" value={data.grant_awards} icon={<FiDollarSign />} />
      <ProfileField label="Scholarship Awards" value={data.scholarship_awards} icon={<FiDollarSign />} />
      <ProfileField label="Loan Amount" value={data.loan_amount} icon={<FiDollarSign />} />
      <ProfileField label="Financial Aid Advisor" value={data.financial_aid_advisor} icon={<FiUser />} />
      <ProfileField label="Disbursement Dates" value={data.disbursement_dates} icon={<FiCalendar />} />
      <ProfileField label="Financial Hardship Flag" value={data.financial_hardship_flag} />
    </InfoBox>
    <InfoBox title="Account & Tuition">
      <ProfileField label="Tuition Rate" value={data.in_state_out_of_state_tuition_rate} />
      <ProfileField label="Cost of Attendance" value={data.cost_of_attendance} icon={<FiDollarSign />} />
      <ProfileField label="Tuition Balance" value={data.tuition_balance} icon={<FiDollarSign />} />
      <ProfileField label="Outstanding Balance" value={data.outstanding_balance} icon={<FiDollarSign />} />
      <ProfileField label="Fees Paid" value={data.fees_paid} icon={<FiDollarSign />} />
      <ProfileField label="Payment Plan Status" value={data.payment_plan_status} />
      <ProfileField label="Employer Tuition Reimbursement" value={data.employer_tuition_reimbursement_participation} />
      <ProfileField label="Overpayment Flag" value={data.overpayment_flag} />
      <ProfileField label="Refund Status" value={data.refund_status} />
    </InfoBox>
    <InfoBox title="Billing & Payments">
      <ProfileField label="Billing Address" value={data.billing_address} icon={<FiHome />} />
      <ProfileField label="Billing Due Dates" value={data.billing_due_dates} icon={<FiCalendar />} />
      <ProfileField label="Payment Method" value={data.payment_method} />
      <ProfileField label="Payment History" value={data.payment_history} />
    </InfoBox>
    <InfoBox title="Loans">
      <ProfileField label="Loan Type" value={data.loan_type} />
      <ProfileField label="Loan Provider" value={data.loan_provider} />
    </InfoBox>
  </div>
);

// Career Tab Layout
const CareerTabContent = ({ data }) => (
  <div>
    <InfoBox title="Career Planning">
      <ProfileField label="Career Goals" value={data.career_goals} />
      <ProfileField label="Industry of Interest" value={data.industry_of_interest} />
      <ProfileField label="Career Advisor" value={data.career_advisor_assigned} icon={<FiUser />} />
      <ProfileField label="Career Pathway Mapping" value={data.career_pathway_mapping} />
      <ProfileField label="Career Readiness Score" value={data.career_readiness_score} />
      <ProfileField label="Job Preferences" value={data.job_preferences} />
      <ProfileField label="Mentorship Participation" value={data.mentorship_participation} />
      <ProfileField label="Mock Interview Participation" value={data.mock_interview_participation} />
    </InfoBox>
    <InfoBox title="Internship & Job Search">
      <ProfileField label="Employment Status" value={data.employment_status} />
      <ProfileField label="Internship Placements" value={data.internship_placements} />
      <ProfileField label="Internship Applications" value={data.internship_applications} />
      <ProfileField label="Internship Evaluation" value={data.internship_evaluation} />
      <ProfileField label="Job Application History" value={data.job_application_history} />
      <ProfileField label="Employer Feedback" value={data.employer_feedback} />
      <ProfileField label="Resume on File" value={data.resume_on_file} />
      <ProfileField label="Cover Letter on File" value={data.cover_letter_on_file} />
      <ProfileField label="Resume Score" value={data.resume_score} />
      <ProfileField label="Portfolio Link" value={data.portfolio_link} />
      <ProfileField label="LinkedIn Profile" value={data.linkedin_profile} />
      <ProfileField label="Reference Contacts" value={data.reference_contacts} />
    </InfoBox>
  </div>
);

// General Tab Layout - shows very basic info if needed, or a summary
const GeneralTabContent = ({ data }) => (
  <div>
    <InfoBox title="Campus Life & Engagement">
      <ProfileField label="Commuter or Resident" value={data.commuter_or_resident} icon={<FiHome />} />
      <ProfileField label="Club Memberships" value={data.club_memberships} />
      <ProfileField label="Student Organization Participation" value={data.participation_in_student_organizations} />
      <ProfileField label="Leadership Roles" value={data.leadership_roles} />
      <ProfileField label="Meal Plan" value={data.meal_plan} />
    </InfoBox>
    <InfoBox title="System & Preferences">
      <ProfileField label="Username" value={data.username} icon={<FiUser />} />
      <ProfileField label="Login Frequency" value={data.login_frequency} />
      <ProfileField label="ID Card Status" value={data.id_card_status} />
      <ProfileField label="Student Type (Dom/Intl)" value={data.student_type_eg_domestic_international} />
      <ProfileField label="Communication Preferences" value={data.communication_preferences} />
      <ProfileField label="Preferred Learning Style" value={data.preferred_learning_style} />
      <ProfileField label="Learning Accommodations" value={data.learning_accommodations} />
      <ProfileField label="Enrollment Date" value={data.enrollment_date} icon={<FiCalendar />} />
      <ProfileField label="Chatbot Interactions" value={data.chatbot_interactions} />
    </InfoBox>
  </div>
);

// --- Main StudentProfile Component ---

const StudentProfile = ({ student, onClose, apiData }) => {
  const [activeTab, setActiveTab] = useState('demographic');
  const [fadeOut, setFadeOut] = useState(false);
  
  // Ensure we have structured data - important!
  const safeApiData = {
    demographic: apiData?.demographic || {},
    general: apiData?.general || {},
    academic: apiData?.academic || {},
    health: apiData?.health || {},
    financial: apiData?.financial || {},
    career: apiData?.career || {}
  };
  
  // --- >>> Add this console log <<< ---
  console.log("Student Profile API Data:", safeApiData);
  // --- >>> Add this console log <<< ---

  // Tabs configuration (remains the same)
  const tabs = [
    { id: 'demographic', label: 'Demographic', icon: <FiUser size={18} /> },
    { id: 'general', label: 'General', icon: <FiInfo size={18} /> },
    { id: 'academic', label: 'Academic', icon: <FiBookOpen size={18} /> },
    { id: 'health', label: 'Health', icon: <FiActivity size={18} /> },
    { id: 'financial', label: 'Financial', icon: <FiDollarSign size={18} /> },
    { id: 'career', label: 'Career', icon: <FiBriefcase size={18} /> },
    { id: 'ai', label: 'AI Insights', icon: <FiCpu size={18} /> }
  ];

  // Handle close with animation (remains the same)
  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Stop propagation for modal content clicks (remains the same)
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  // Student profile sidebar - Updated to use student_id and check safeApiData
  const StudentProfileSidebar = () => (
    <div className="w-full h-full overflow-hidden">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 flex flex-col items-center h-full border border-gray-200 dark:border-gray-700">
        {/* Image/Initials */}
        <div className="w-32 h-32 mb-4 relative flex-shrink-0">
          <div className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden border-4 border-primary">
            <img 
              src={collegePortrait} 
              alt="Student portrait" 
              className="w-full h-full object-cover object-top scale-[1.15]"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.style.display = 'none';
                const initials = `${student.first_name?.[0] || ''}${student.last_name?.[0] || ''}`;
                e.target.parentNode.innerHTML = `
                  <div class="text-5xl text-gray-400 dark:text-gray-500 font-bold flex items-center justify-center w-full h-full">
                    ${initials || '?'}
                  </div>
                `;
              }}
            />
          </div>
        </div>
        {/* Name and ID */}
        <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white text-center">{student.first_name} {student.last_name}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">ID: {student.student_id}</p> {/* Updated to student_id */}
        
        {/* Quick Info Section */}
        <div className="w-full border-t border-gray-200 dark:border-gray-700 pt-4 mt-2 flex-grow overflow-y-auto custom-scrollbar pr-1">
          <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Quick Info</h4>
          <div className="space-y-2.5">
            <ProfileField label="Email" value={safeApiData.demographic?.email_institutional} icon={<FiMail />} />
            <ProfileField label="Phone" value={safeApiData.demographic?.phone_number_mobile} icon={<FiPhone />} />
            <ProfileField label="Major" value={safeApiData.academic?.program_major} icon={<FiBookOpen />} />
            <ProfileField label="Enrollment" value={safeApiData.academic?.enrollment_status} />
            <ProfileField label="GPA" value={safeApiData.academic?.gpa_cumulative} />
            <ProfileField label="Advisor" value={safeApiData.academic?.advisor_name} icon={<FiUser />} />
            <ProfileField label="Balance" value={safeApiData.financial?.tuition_balance} icon={<FiDollarSign />} />
          </div>
        </div>
      </div>
    </div>
  );

  // Main Tab Content Router
  const MainTabContent = ({ tabId }) => {
    switch (tabId) {
      case 'demographic':
        return <DemographicTabContent data={safeApiData.demographic} />;
      case 'academic':
        return <AcademicTabContent data={safeApiData.academic} />;
      case 'health':
        return <HealthTabContent data={safeApiData.health} />;
      case 'financial':
        return <FinancialTabContent data={safeApiData.financial} />;
      case 'career':
        return <CareerTabContent data={safeApiData.career} />;
      case 'general':
         return <GeneralTabContent data={safeApiData.general} />;
      case 'ai':
        return (
          <div className="flex flex-col items-center justify-center text-center p-12 h-full">
            <FiCpu size={64} className="text-primary mb-6" />
            <h3 className="text-2xl font-bold mb-2">AI Insights Coming Soon</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg">
              We're working on intelligent analysis of student data to provide personalized insights and recommendations.
            </p>
          </div>
        );
      default:
        return <p>Unknown tab selected.</p>;
    }
  };

  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-60 z-[1000] flex items-center justify-center p-4 transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
      onClick={handleClose}
    >
      <div 
        className={`bg-gray-100 dark:bg-gray-900 w-full max-w-7xl rounded-lg shadow-xl flex flex-col overflow-hidden transform transition-all duration-300 ${fadeOut ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
        onClick={handleContentClick}
        style={{ height: 'calc(100vh - 4rem)', maxHeight: '800px' }} // Example height constraint
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{student.first_name} {student.last_name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Student ID: {student.student_id}</p> {/* Updated to student_id */}
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Body Layout (Sidebar + Content) */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Fixed Sidebar */}
          <div className="w-1/4 flex-shrink-0 p-4 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 overflow-y-auto custom-scrollbar">
            <StudentProfileSidebar />
          </div>

          {/* Right Scrollable Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 px-4 py-2 flex justify-center overflow-x-auto custom-scrollbar border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="flex space-x-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-3 py-1.5 rounded-md whitespace-nowrap transition-colors text-sm ${
                      activeTab === tab.id 
                        ? 'bg-primary text-gray-900 font-medium shadow-sm' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="mr-1.5">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
              <MainTabContent tabId={activeTab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile; 