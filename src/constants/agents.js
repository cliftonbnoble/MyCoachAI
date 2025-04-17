import {
  FiBookOpen, FiDollarSign, FiHelpCircle, FiEdit, FiClipboard, FiCalendar, FiBriefcase,
  FiUsers, FiFileText, FiDatabase, FiSettings, FiHeart, FiMap, FiActivity, FiPhone, FiShield
} from 'react-icons/fi';

// Import agent images
import agent1 from '../assets/agent1.png';
import agent2 from '../assets/agent2.png';
import agent3 from '../assets/agent3.png';
import agent4 from '../assets/agent4.png';
import agent5 from '../assets/agent5.png';
import agent6 from '../assets/agent6.png';
import agent7 from '../assets/agent7.png';
import agent8 from '../assets/agent8.png';

export const studentAgents = [
  { 
    id: 's1', 
    specialty: 'Finance Agent', 
    avatar: agent1,
    prompts: [
      { text: "Explain my tuition bill", icon: FiDollarSign },
      { text: "How do I apply for FAFSA?", icon: FiFileText },
      { text: "Find scholarships I qualify for", icon: FiDollarSign },
      { text: "Create a budget for living expenses", icon: FiClipboard },
      { text: "What are student loan repayment options?", icon: FiHelpCircle },
      { text: "When is the financial aid deadline?", icon: FiCalendar },
    ]
  },
  { 
    id: 's2', 
    specialty: 'Health Agent', 
    avatar: agent2,
    prompts: [
      { text: "Find campus mental health resources", icon: FiHeart },
      { text: "Where is the student health center?", icon: FiMap },
      { text: "Explain the student health insurance plan", icon: FiShield },
      { text: "Get tips for managing stress", icon: FiHelpCircle },
      { text: "Book a counseling appointment", icon: FiCalendar },
      { text: "What are the campus gym hours?", icon: FiActivity },
    ]
  },
  { 
    id: 's3', 
    specialty: 'Career Agent', 
    avatar: agent3,
    prompts: [
      { text: "Review my resume", icon: FiEdit },
      { text: "Find internships in my major", icon: FiBriefcase },
      { text: "Prepare for a job interview", icon: FiHelpCircle },
      { text: "Draft a cover letter template", icon: FiClipboard },
      { text: "Explore career paths for my major", icon: FiUsers },
      { text: "When is the next career fair?", icon: FiCalendar },
    ]
  },
  { 
    id: 's4', 
    specialty: 'Campus Agent', 
    avatar: agent4,
    prompts: [
      { text: "Where is the library?", icon: FiMap },
      { text: "What clubs can I join?", icon: FiUsers },
      { text: "Find campus dining options", icon: FiMap },
      { text: "When are the dorm quiet hours?", icon: FiCalendar },
      { text: "How do I report a maintenance issue?", icon: FiPhone },
      { text: "What events are happening this week?", icon: FiCalendar },
    ]
   },
  { 
    id: 's5', 
    specialty: 'Schedule Agent', 
    avatar: agent5,
    prompts: [
        { text: "Help me build my class schedule", icon: FiEdit },
        { text: "When does course registration open?", icon: FiCalendar },
        { text: "Find available sections for MATH 101", icon: FiClipboard },
        { text: "Explain prerequisites for CS 201", icon: FiHelpCircle },
        { text: "Add a reminder for my registration time", icon: FiCalendar },
        { text: "How do I drop a class?", icon: FiHelpCircle },
    ]
   },
  { 
    id: 's6', 
    specialty: 'Classes Agent', 
    avatar: agent6,
    prompts: [
        { text: "Summarize my lecture notes on [Topic]", icon: FiClipboard },
        { text: "Create flashcards for my Biology exam", icon: FiBookOpen },
        { text: "Explain the concept of [Concept]", icon: FiHelpCircle },
        { text: "Help me draft an email to my professor", icon: FiEdit },
        { text: "Find study groups for [Course]", icon: FiUsers },
        { text: "What are the professor's office hours?", icon: FiCalendar },
    ]
  },
  { 
    id: 's7', 
    specialty: 'Academic Agent', 
    avatar: agent7,
    prompts: [
        { text: "What are the requirements for my major?", icon: FiBookOpen },
        { text: "Check my degree progress report", icon: FiFileText },
        { text: "Explain the academic probation policy", icon: FiHelpCircle },
        { text: "Find tutoring services for chemistry", icon: FiUsers },
        { text: "Help me choose a minor", icon: FiEdit },
        { text: "When is the deadline to declare a major?", icon: FiCalendar },
    ]
   },
  { 
    id: 's8', 
    specialty: 'Admin Agent', 
    avatar: agent8,
    prompts: [
        { text: "How do I get an official transcript?", icon: FiFileText },
        { text: "Update my contact information", icon: FiEdit },
        { text: "Where do I pay my tuition?", icon: FiDollarSign },
        { text: "Request a replacement student ID card", icon: FiClipboard },
        { text: "Check the status of my application", icon: FiHelpCircle },
        { text: "Find the academic calendar", icon: FiCalendar },
    ]
  },
];

export const staffAgents = [
  { 
    id: 'f1', 
    specialty: 'Records Agent', 
    avatar: agent1,
    prompts: [
      { text: "Lookup student transcript for ID [ID]", icon: FiFileText },
      { text: "Verify enrollment status for [Student Name]", icon: FiClipboard },
      { text: "Generate a list of students on probation", icon: FiFileText },
      { text: "Find courses taught by [Professor Name]", icon: FiBookOpen },
      { text: "Check degree requirements for [Major]", icon: FiBookOpen },
      { text: "Process a grade change request form", icon: FiEdit },
    ]
  },
  { 
    id: 'f2', 
    specialty: 'Admissions Agent', 
    avatar: agent2,
    prompts: [
      { text: "Review application status for [Applicant Name]", icon: FiFileText },
      { text: "Generate report on application demographics", icon: FiDatabase },
      { text: "Draft acceptance letter template", icon: FiEdit },
      { text: "Find feeder high schools by region", icon: FiMap },
      { text: "Check prerequisites for transfer credits", icon: FiBookOpen },
      { text: "Summarize admission requirements", icon: FiClipboard },
    ]
  },
  { 
    id: 'f3', 
    specialty: 'HR Agent', 
    avatar: agent3,
    prompts: [
      { text: "Find the employee handbook", icon: FiFileText },
      { text: "Generate a list of staff anniversaries", icon: FiCalendar },
      { text: "Draft a job posting for [Role]", icon: FiEdit },
      { text: "Explain the benefits enrollment process", icon: FiHelpCircle },
      { text: "Lookup department contact list", icon: FiUsers },
      { text: "Process a time-off request", icon: FiClipboard },
    ]
  },
  { 
    id: 'f4', 
    specialty: 'Budget Agent', 
    avatar: agent4,
    prompts: [
      { text: "Generate departmental budget report", icon: FiFileText },
      { text: "Compare expenses year-over-year", icon: FiDatabase },
      { text: "Draft a budget proposal justification", icon: FiEdit },
      { text: "Find vendor payment status", icon: FiDollarSign },
      { text: "Explain the purchase order process", icon: FiHelpCircle },
      { text: "Forecast remaining funds for Q4", icon: FiCalendar },
    ]
  },
   { 
    id: 'f5', 
    specialty: 'Admin Agent', 
    avatar: agent5,
    prompts: [
        { text: "Draft an email to student parents", icon: FiEdit },
        { text: "Prepare meeting notes for faculty meeting", icon: FiClipboard },
        { text: "Find contact info for [Department Head]", icon: FiPhone },
        { text: "Summarize the new campus policy", icon: FiFileText },
        { text: "Schedule a committee meeting", icon: FiCalendar },
        { text: "Order office supplies", icon: FiSettings },
    ]
  },
  { 
    id: 'f6', 
    specialty: 'Faculty Agent', 
    avatar: agent6,
    prompts: [
        { text: "Generate class roster for [Course Code]", icon: FiFileText },
        { text: "Draft syllabus template", icon: FiEdit },
        { text: "Find resources for [Teaching Method]", icon: FiBookOpen },
        { text: "Submit final grades", icon: FiClipboard },
        { text: "Check classroom technology availability", icon: FiSettings },
        { text: "Lookup faculty development workshops", icon: FiCalendar },
    ]
  },
  { 
    id: 'f7', 
    specialty: 'IT Agent', 
    avatar: agent7,
    prompts: [
        { text: "Troubleshoot network connectivity issue", icon: FiHelpCircle },
        { text: "Generate software license usage report", icon: FiFileText },
        { text: "Draft instructions for password reset", icon: FiEdit },
        { text: "Check server status", icon: FiDatabase },
        { text: "Order new hardware for [User]", icon: FiSettings },
        { text: "Explain cybersecurity best practices", icon: FiShield },
    ]
  },
  { 
    id: 'f8', 
    specialty: 'Analytics Agent', 
    avatar: agent8,
    prompts: [
        { text: "Generate enrollment statistics report", icon: FiDatabase },
        { text: "Analyze student success metrics by major", icon: FiFileText },
        { text: "Visualize course demand trends", icon: FiClipboard },
        { text: "Compare retention rates year-over-year", icon: FiDatabase },
        { text: "Draft summary of key institutional metrics", icon: FiEdit },
        { text: "Identify factors correlating with GPA", icon: FiHelpCircle },
    ]
  },
];

// Default prompts if no agent is selected
export const defaultStudentPrompts = [
    { text: "Create flashcards for my Biology exam", icon: FiBookOpen },
    { text: "Help me budget for next semester", icon: FiDollarSign },
    { text: "Explain the concept of photosynthesis", icon: FiHelpCircle },
    { text: "Draft an email to my professor", icon: FiEdit },
    { text: "Summarize this lecture transcript", icon: FiClipboard },
    { text: "When is the deadline to drop a class?", icon: FiCalendar },
];

export const defaultStaffPrompts = [
    { text: "Draft an email to a student's parents", icon: FiEdit },
    { text: "Generate a report on class attendance", icon: FiFileText },
    { text: "Review department budget forecast", icon: FiDollarSign },
    { text: "Prepare meeting notes for faculty meeting", icon: FiClipboard },
    { text: "Query student enrollment statistics", icon: FiDatabase },
    { text: "Configure course schedule for next term", icon: FiSettings },
]; 