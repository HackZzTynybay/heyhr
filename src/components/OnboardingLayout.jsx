
import React from 'react';
import Logo from './Logo';

const OnboardingLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 text-gray-700 font-medium">
        {title && <h1>{title}</h1>}
      </div>
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
          <div className="bg-brand-lightBlue p-4">
            <Logo />
          </div>
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
