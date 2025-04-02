
import React from 'react';
import { useAuth } from '@/context/AuthContext.jsx';
import { CheckCircle, Circle } from 'lucide-react';
import Logo from './Logo.jsx';

const OnboardingSidebar = ({ currentStep }) => {
  const { onboardingStep } = useAuth();
  
  const steps = [
    { id: 'departments', label: 'Departments', number: 3 },
    { id: 'roles', label: 'Roles and Permissions', number: 4 },
    { id: 'employees', label: 'Employees', number: 5 }
  ];
  
  return (
    <div className="w-64 bg-brand-lightBlue border-r border-gray-200 p-8">
      <div className="mb-8">
        <Logo />
      </div>
      <div className="space-y-8">
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = onboardingStep > step.number;
          
          return (
            <div key={step.id} className="flex items-center">
              {isCompleted ? (
                <CheckCircle className="text-brand-blue" size={20} />
              ) : isActive ? (
                <div className="w-5 h-5 rounded-full bg-brand-blue"></div>
              ) : (
                <Circle className="text-gray-400" size={20} />
              )}
              <span className={`ml-3 ${isActive ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OnboardingSidebar;
