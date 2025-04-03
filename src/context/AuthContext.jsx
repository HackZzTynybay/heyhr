
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Provider component
export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('hrms_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [onboardingData, setOnboardingData] = useState(() => {
    const savedData = localStorage.getItem('onboarding_data');
    return savedData ? JSON.parse(savedData) : {
      company: {
        name: '',
        email: '',
        phone: '',
        id: '',
        employees: '',
      },
      user: {
        fullName: '',
        jobTitle: '',
      },
      verificationSent: false,
      emailVerified: false,
      passwordSet: false,
      setupCompleted: false,
    };
  });
  
  // Register a new user
  const registerUser = async (formData) => {
    try {
      // For demo purposes, we'll just save the data to localStorage
      const newOnboardingData = {
        company: {
          name: formData.companyName,
          email: formData.workEmail,
          phone: formData.phoneNumber,
          id: formData.companyId,
          employees: formData.employees,
        },
        user: {
          fullName: formData.fullName,
          jobTitle: formData.jobTitle,
        },
        verificationSent: true,
        emailVerified: false,
        passwordSet: false,
        setupCompleted: false,
      };
      
      setOnboardingData(newOnboardingData);
      localStorage.setItem('onboarding_data', JSON.stringify(newOnboardingData));
      
      // Store a verification token (in a real app, this would be sent to the user's email)
      localStorage.setItem('verificationToken', 'demo-token-123');
      
      toast({
        title: "Registration successful",
        description: "A verification email has been sent to your inbox.",
      });
      
      navigate('/verify-email');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message || "An error occurred during registration.",
      });
    }
  };
  
  // Verify email
  const verifyEmail = async (token) => {
    try {
      // In a real app, this would verify the token with the backend
      if (token === 'demo-token-123' || token === localStorage.getItem('verificationToken')) {
        const updatedData = { ...onboardingData, emailVerified: true };
        setOnboardingData(updatedData);
        localStorage.setItem('onboarding_data', JSON.stringify(updatedData));
        
        toast({
          title: "Email verified",
          description: "Your email has been successfully verified.",
        });
        
        navigate('/set-password');
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Verification failed",
          description: "Invalid or expired verification token.",
        });
        return false;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: error.message || "An error occurred during verification.",
      });
      return false;
    }
  };
  
  // Set password
  const setPassword = async (token, password) => {
    try {
      // In a real app, this would set the password with the backend using the token
      if (token === 'demo-token-123' || token === localStorage.getItem('verificationToken')) {
        const updatedData = { ...onboardingData, passwordSet: true };
        setOnboardingData(updatedData);
        localStorage.setItem('onboarding_data', JSON.stringify(updatedData));
        
        toast({
          title: "Password set",
          description: "Your password has been successfully set.",
        });
        
        navigate('/setup/departments');
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Setting password failed",
          description: "Invalid or expired token.",
        });
        return false;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Setting password failed",
        description: error.message || "An error occurred while setting your password.",
      });
      return false;
    }
  };
  
  // Log in
  const login = async (email, password) => {
    try {
      // For demo purposes, we'll just check if the email exists in the onboarding data
      if (email === onboardingData.company.email) {
        // In a real app, you would verify the password with the backend
        const userData = {
          email,
          name: onboardingData.user.fullName,
          role: onboardingData.user.jobTitle,
          companyName: onboardingData.company.name,
          isLoggedIn: true,
        };
        
        setUser(userData);
        localStorage.setItem('hrms_user', JSON.stringify(userData));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${userData.name}!`,
        });
        
        navigate('/dashboard');
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password.",
        });
        return false;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "An error occurred during login.",
      });
      return false;
    }
  };
  
  // Log out
  const logout = () => {
    setUser(null);
    localStorage.removeItem('hrms_user');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    navigate('/login');
  };
  
  // Provide the context value
  const value = {
    user,
    onboardingData,
    isAuthenticated: !!user,
    registerUser,
    verifyEmail,
    setPassword,
    login,
    logout,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
