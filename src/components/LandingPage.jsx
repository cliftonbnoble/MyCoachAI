import React from 'react';
import { Link } from 'react-router-dom';
import roboAgentLogo from '../assets/robo-agent-logo.png';
// Removed largeRoboLogo, added imageHero with correct .jpg extension
import imageHero from '../assets/image-hero.jpg'; 
import { FiArrowRight, FiCheckCircle, FiZap, FiClock, FiUsers } from 'react-icons/fi'; // Adding relevant icons

const LandingPage = () => {

  // Simplified benefit statements inspired by popcorn.space
  const keyBenefits = [
    { icon: FiZap, text: "Instant AI Assistance" },
    { icon: FiClock, text: "24/7 Academic Support" },
    { icon: FiUsers, text: "Tools for Students & Staff" },
  ];

  return (
    // Main container: Clean white background
    <div className="flex flex-col min-h-screen bg-white text-gray-800">

      {/* Hero Section - Background Image Added */}
      <header className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-center lg:text-left overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <img 
            src={imageHero} 
            alt="Abstract background image representing AI and academics" 
            className="absolute inset-0 w-full h-full object-cover opacity-80" // High opacity
          />
          {/* Overlay for text contrast */}
          <div className="absolute inset-0 bg-black/20"></div> 
        </div>

        {/* Text Content Container - Adjusted for large screens */}
        <div className="max-w-3xl lg:max-w-xl mx-auto lg:mx-0 lg:pl-8 relative z-10">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 drop-shadow-lg">
            Your AI Coach for Academic Success
          </h1>
          {/* Sub-headline */} 
          <p className="text-lg sm:text-xl text-gray-100 mb-10 drop-shadow-md">
            MyCoach AI provides personalized guidance and support for students and staff. Access your portal to get started.
          </p>
          
          {/* Call to Action Buttons - Adjusted alignment for large screens */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/student"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-yellow-400 text-lg font-semibold text-gray-900 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out group"
            >
              Student Portal
              <FiArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/staff"
              // Use a slightly lighter background for contrast if needed, or keep dark
              className="inline-flex items-center justify-center px-8 py-3 bg-gray-800 hover:bg-gray-700 text-lg font-semibold text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border border-gray-600 hover:border-gray-500"
            >
              Staff Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Key Benefits Section */} 
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {keyBenefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center">
                <benefit.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-800">{benefit.text}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">MyCoach AI: Simple, Smart Support</h2>
          <p className="text-xl text-gray-600 mb-12">
            Streamline your academic tasks and get the help you need, exactly when you need it. MyCoach is designed for the demands of university life.
          </p>

          {/* Simplified How it Works / Core Value Points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-2 text-gray-800">1. Access Your Portal</h3>
              <p className="text-gray-600">Log in easily as a student or staff member.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-2 text-gray-800">2. Choose Your Agent</h3>
              <p className="text-gray-600">Select the AI specialized for your task.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-2 text-gray-800">3. Start Interacting</h3>
              <p className="text-gray-600">Get answers, summaries, plans, and more.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section - Cleaned up */}
      <footer className="py-8 px-4 border-t border-gray-200 mt-auto bg-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img src={roboAgentLogo} alt="MyCoach Logo" className="w-8 h-8 mr-2" />
            <span className="font-semibold text-gray-800">MyCoach AI</span>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MyCoach AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 