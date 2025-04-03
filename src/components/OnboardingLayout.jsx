
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import logo from '../assets/logo.svg';

const OnboardingLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="HRMS Logo" className="h-8" />
            <h1 className="text-xl font-semibold ml-2">HR Management System</h1>
          </div>
          <div>
            <a href="mailto:support@hrms.com" className="text-blue-600 hover:text-blue-800 text-sm">
              Need help?
            </a>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-8">
          <div className="mb-8">
            <div className="flex space-x-3 mb-6">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                1
              </div>
              <div className={`bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center font-semibold ${title === "Verify Email" || title === "Password" ? "bg-blue-600 text-white" : ""}`}>
                2
              </div>
              <div className={`bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center font-semibold ${title === "Password" ? "bg-blue-600 text-white" : ""}`}>
                3
              </div>
            </div>
            
            <div className="flex space-x-3 text-xs text-gray-500">
              <div className="w-8 text-center">Account</div>
              <div className="w-8 text-center">Verify</div>
              <div className="w-8 text-center">Setup</div>
            </div>
          </div>
          
          {children}
        </div>
      </main>
      
      <footer className="bg-white py-4 text-center text-gray-500 text-sm">
        <div className="container mx-auto">
          &copy; {new Date().getFullYear()} HR Management System. All rights reserved.
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default OnboardingLayout;
