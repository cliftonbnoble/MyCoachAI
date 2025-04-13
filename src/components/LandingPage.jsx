import React from 'react';
import { Link } from 'react-router-dom';
import roboAgentLogo from '../assets/robo-agent-logo.png';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const LandingPage = () => {
  const features = [
    "AI-powered academic guidance",
    "Study plan optimization",
    "Document summarization",
    "Course selection assistance",
    "Career path recommendations",
    "24/7 learning support"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-light-bg to-light-surface dark:from-gray-900 dark:to-gray-800 text-light-text dark:text-dark-text">
      {/* Hero Section with Background Logo */}
      <header className="pt-10 px-4 sm:px-6 lg:px-8 mb-16 md:mb-24 relative overflow-hidden">
        {/* Large background logo */}
        <div className="absolute right-0 top-0 w-full h-full flex justify-end items-center opacity-5 dark:opacity-10 pointer-events-none overflow-hidden">
          <img 
            src={roboAgentLogo} 
            alt="" 
            className="w-[120%] max-w-none absolute -right-[10%] top-1/2 transform -translate-y-1/2"
            aria-hidden="true"
            style={{ minWidth: '800px' }}
          />
        </div>
        
        {/* Gradient overlay to enhance text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-light-bg dark:from-gray-900 via-light-bg/90 dark:via-gray-900/90 to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Left side text */}
            <div className="lg:w-1/2 pt-10">
              <h2 className="text-xl font-medium text-primary mb-4">MyCoach AI</h2>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-tight">
                <span className="block">Academic AI</span>
                <span className="block mt-1">at its finest.</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-xl">
                Supercharge your academic journey with personalized AI Agents. Get guidance, resources, reminders, and support 
                whenever you need it.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <Link
                  to="/student"
                  className="px-8 py-4 bg-primary hover:bg-yellow-400 text-lg font-semibold text-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-center gap-2 group"
                >
                  Student Portal
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/staff"
                  className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 text-lg font-semibold text-gray-800 dark:text-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out text-center"
                >
                  Staff Portal
                </Link>
              </div>
            </div>
            
            {/* Right side animated effect replacing the image box */}
            <div className="lg:w-1/2 flex justify-center mb-10 lg:mb-0 mt-16 lg:mt-0">
              <div className="relative w-64 h-64">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-full animate-spin-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Lorem ipsum dolor sit amet</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="mt-1 text-primary w-5 h-5 flex-shrink-0" />
                  <p className="font-medium">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your education?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              to="/student"
              className="px-8 py-4 bg-primary hover:bg-yellow-400 text-lg font-semibold text-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-center gap-2 group"
            >
              Get Started Now
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img src={roboAgentLogo} alt="MyCoach Logo" className="w-8 h-8 mr-2" />
            <span className="font-semibold">MyCoach AI</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} MyCoach AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 