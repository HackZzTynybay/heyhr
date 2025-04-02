
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Link, useSearchParams } from 'react-router-dom';
import OnboardingLayout from '@/components/OnboardingLayout.jsx';
import { useAuth } from '@/context/AuthContext.jsx';
import { toast } from '@/components/ui/use-toast.js';

const VerifyEmail = () => {
  const { verifyEmail, onboardingData } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const email = onboardingData.company.email;
  
  useEffect(() => {
    // If token is in URL, verify email automatically
    if (token) {
      verifyEmail(token);
    }
  }, [token, verifyEmail]);
  
  const handleResendEmail = () => {
    // In a real app, this would trigger an API call to resend the verification email
    toast({
      title: "Verification email resent",
      description: "Please check your inbox."
    });
  };
  
  const handleContinue = () => {
    // For demo purposes only - in a real app, we would never expose the token in the UI
    // The token would be sent via email with a link that includes the token
    const demoToken = localStorage.getItem("verificationToken");
    if (demoToken) {
      verifyEmail(demoToken);
    } else {
      toast({
        title: "No verification token found",
        description: "Please register first or check your email.",
        variant: "destructive"
      });
    }
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
          onClick={handleResendEmail}
          variant="outline"
          className="w-full mb-4"
        >
          Resend Email
        </Button>
        
        <Button 
          onClick={handleContinue}
          className="w-full mb-4 bg-brand-blue hover:bg-blue-600"
        >
          Next
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
