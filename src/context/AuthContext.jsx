
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

// API URL
const API_URL = "http://localhost:3000/api";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState({
    company: {
      name: '',
      email: '',
      phone: '',
      identificationNumber: '',
      employees: '',
    },
    user: {
      fullName: '',
      jobTitle: '',
    }
  });

  // Check if user is authenticated on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Validate token and get user data
      fetchUserPermissions(token)
        .then(data => {
          setUser(data);
          setIsAuthenticated(true);
          setIsOnboarding(false);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setIsOnboarding(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      const onboardingDataStored = localStorage.getItem('onboardingData');
      
      if (onboardingDataStored) {
        setOnboardingData(JSON.parse(onboardingDataStored));
        setIsOnboarding(true);
        
        const step = Number(localStorage.getItem('onboardingStep') || '0');
        setOnboardingStep(step);
      }
      
      setIsLoading(false);
    }
  }, []);
  
  const fetchUserPermissions = async (token) => {
    try {
      const response = await fetch(`${API_URL}/permissions/permissionDetails`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user permissions');
      }
      
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('Error fetching user permissions:', error);
      throw error;
    }
  };
  
  const registerUser = async (formData) => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          job_title: formData.jobTitle,
          email: formData.workEmail,
          company_name: formData.companyName,
          company_identification_number: formData.companyId,
          phone_number: formData.phoneNumber,
          work_email: formData.workEmail,
          num_employees: formData.employees
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      // Store verification token for demo purposes
      localStorage.setItem('verificationToken', data.verificationToken);
      
      // Save onboarding data
      const onboardingDataToStore = {
        company: {
          name: formData.companyName,
          email: formData.workEmail,
          phone: formData.phoneNumber,
          identificationNumber: formData.companyId,
          employees: formData.employees,
        },
        user: {
          fullName: formData.fullName,
          jobTitle: formData.jobTitle,
        }
      };
      
      setOnboardingData(onboardingDataToStore);
      localStorage.setItem('onboardingData', JSON.stringify(onboardingDataToStore));
      
      // Set onboarding state
      setIsOnboarding(true);
      setOnboardingStep(1);
      localStorage.setItem('onboardingStep', '1');
      
      // Redirect to verify email page
      navigate('/verify-email');
      
      toast({
        title: "Registration successful",
        description: "Please check your email to verify your account."
      });
      
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const verifyEmail = async (token) => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`${API_URL}/auth/verify/${token}`, {
        method: 'GET'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Email verification failed');
      }
      
      // Set JWT token
      localStorage.setItem('token', data.token);
      
      // Remove verification token after use
      localStorage.removeItem('verificationToken');
      
      // Update onboarding step
      setOnboardingStep(2);
      localStorage.setItem('onboardingStep', '2');
      
      // Redirect to set password page
      navigate('/set-password');
      
      toast({
        title: "Email verified",
        description: "Your email has been verified successfully."
      });
      
    } catch (error) {
      toast({
        title: "Verification failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const setPassword = async (token, password) => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`${API_URL}/auth/change-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Password setup failed');
      }
      
      // Update onboarding step
      setOnboardingStep(3);
      localStorage.setItem('onboardingStep', '3');
      
      // Redirect to departments setup
      navigate('/setup/departments');
      
      toast({
        title: "Password created",
        description: "Your password has been set successfully."
      });
      
    } catch (error) {
      toast({
        title: "Password setup failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const loginUser = async (email, password) => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Set token and update auth state
      localStorage.setItem('token', data.token);
      
      // Fetch user data (permissions, roles, etc.)
      const userData = await fetchUserPermissions(data.token);
      setUser(userData);
      
      // Update authentication state
      setIsAuthenticated(true);
      setIsOnboarding(false);
      
      // Clean up onboarding data if exists
      localStorage.removeItem('onboardingData');
      localStorage.removeItem('onboardingStep');
      
      // Redirect to dashboard
      navigate('/dashboard');
      
      toast({
        title: "Login successful",
        description: "Welcome back!"
      });
      
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateEmail = (currentEmail, newEmail) => {
    // In a real app, this would call the API to update the email
    const updatedData = { ...onboardingData };
    updatedData.company.email = newEmail;
    
    setOnboardingData(updatedData);
    localStorage.setItem('onboardingData', JSON.stringify(updatedData));
    
    toast({
      title: "Email updated",
      description: `Your email has been updated to ${newEmail}`
    });
    
    navigate('/verify-email');
  };
  
  const logoutUser = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
  };

  const value = {
    isAuthenticated,
    isLoading,
    isOnboarding,
    onboardingStep,
    onboardingData,
    user,
    registerUser,
    verifyEmail,
    setPassword,
    loginUser,
    updateEmail,
    logoutUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
