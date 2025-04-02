
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import OnboardingLayout from '@/components/OnboardingLayout';
import { useAuth } from '@/context/AuthContext';

const VerifyEmail: React.FC = () => {
  const { verifyEmail, onboardingData } = useAuth();
  
  const email = onboardingData.company.email;
  
  const handleResendEmail = () => {
    // In a real app, this would trigger an API call to resend the verification email
    alert("Verification email resent. Please check your inbox.");
  };
  
  const handleContinue = () => {
    // For MVP purposes, we'll just simulate email verification
    verifyEmail(email);
  };

  return (
    <OnboardingLayout title="Email verification">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Verify your email to continue</h2>
        
        <p className="text-gray-600 mb-6">
          We sent a verification link to <strong>{email}</strong>.<br />
          Check your inbox.
        </p>
        
        <Button 
          onClick={handleContinue}
          className="w-full mb-4 bg-brand-blue hover:bg-blue-600"
        >
          Resend Email
        </Button>
        
        <div className="mt-4">
          <Link 
            to="/edit-email" 
            className="text-brand-blue hover:underline text-sm"
          >
            Edit Email Address
          </Link>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default VerifyEmail;
