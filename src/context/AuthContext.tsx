
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: any;
  registerUser: (userData: any) => void;
  verifyEmail: (token: string) => void;
  updateEmail: (oldEmail: string, newEmail: string) => void;
  setPassword: (token: string, password: string) => void;
  completeOnboarding: () => void;
  loginUser: (email: string, password: string) => void;
  logoutUser: () => void;
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  isOnboarding: boolean;
  onboardingData: any;
  updateOnboardingData: (data: any) => void;
}

// API base URL
const API_URL = "http://localhost:3000/api"; // Update with your actual API URL

const defaultOnboardingData = {
  company: {
    name: "",
    email: "",
    phone: "",
    identificationNumber: "",
    numberOfEmployees: "",
  },
  user: {
    fullName: "",
    jobTitle: "",
  },
  departments: [],
  roles: [
    {
      name: "Super Admin",
      description: "A super admin has all permissions across the system.",
      permissions: ["all"],
      isDefault: true
    },
    {
      name: "HR Manager",
      description: "An HR Manager has access to manage all employee information except financial information.",
      permissions: ["hr", "employees"],
      isDefault: true,
      permissionsCount: 30
    },
    {
      name: "Department Manager",
      description: "A Department Manager has permissions to approves team leave/attendance, views team reports.",
      permissions: ["department", "attendance", "leave"],
      isDefault: true,
      permissionsCount: 12
    },
    {
      name: "Employee",
      description: "An Employee has the basic access to personal data, leave requests, and company policy viewing.",
      permissions: ["self", "leave-request"],
      isDefault: true,
      permissionsCount: 10
    },
    {
      name: "Executive",
      description: "An Executive has permissions to company-wide data access, financial oversight, and policy approvals.",
      permissions: ["all", "finance"],
      isDefault: true
    },
    {
      name: "Finance Manager",
      description: "An Finance Manger can process payroll, tracks budgets, approves expenses.",
      permissions: ["finance", "expenses", "payroll"],
      isDefault: true,
      permissionsCount: 10
    },
  ],
  employees: []
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [onboardingData, setOnboardingData] = useState(defaultOnboardingData);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const user = localStorage.getItem("currentUser");
    
    if (storedToken && user) {
      setToken(storedToken);
      setCurrentUser(JSON.parse(user));
      setIsAuthenticated(true);
    }
    
    // Check if there's onboarding in progress
    const onboarding = localStorage.getItem("onboardingInProgress");
    if (onboarding) {
      setIsOnboarding(true);
      setOnboardingStep(JSON.parse(onboarding).step);
      
      const savedData = localStorage.getItem("onboardingData");
      if (savedData) {
        setOnboardingData({...defaultOnboardingData, ...JSON.parse(savedData)});
      }
    }
  }, []);

  const registerUser = async (userData: any) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: userData.fullName,
          job_title: userData.jobTitle,
          email: userData.workEmail,
          company_name: userData.companyName,
          company_identification_number: userData.companyId,
          phone_number: userData.phoneNumber,
          work_email: userData.workEmail,
          num_employees: parseInt(userData.employees)
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      // Store verification token in localStorage for demo purposes
      // In a real app, this would be sent to the user's email
      localStorage.setItem("verificationToken", data.verificationToken);
      
      const newOnboardingData = {
        ...onboardingData,
        company: {
          name: userData.companyName,
          email: userData.workEmail,
          phone: userData.phoneNumber,
          identificationNumber: userData.companyId,
          numberOfEmployees: userData.employees,
        },
        user: {
          fullName: userData.fullName,
          jobTitle: userData.jobTitle,
        }
      };
      
      setOnboardingData(newOnboardingData);
      localStorage.setItem("onboardingData", JSON.stringify(newOnboardingData));
      localStorage.setItem("onboardingInProgress", JSON.stringify({ step: 1, email: userData.workEmail }));
      setIsOnboarding(true);
      setOnboardingStep(1);
      
      toast({
        title: "Registration successful",
        description: "Please check your email for verification."
      });
      
      navigate("/verify-email");
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/verify/${token}`, {
        method: 'GET'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Email verification failed');
      }
      
      // Store the JWT token
      localStorage.setItem("token", data.token);
      setToken(data.token);
      
      const onboarding = localStorage.getItem("onboardingInProgress");
      if (onboarding) {
        localStorage.setItem("onboardingInProgress", JSON.stringify({ 
          ...JSON.parse(onboarding), 
          step: 2, 
          emailVerified: true,
          token: data.token
        }));
        setOnboardingStep(2);
        
        toast({
          title: "Email verified",
          description: "You can now set your password."
        });
        
        navigate("/set-password");
      }
    } catch (error: any) {
      toast({
        title: "Verification failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const updateEmail = (oldEmail: string, newEmail: string) => {
    // For MVP, just update the email in the local storage
    const updatedOnboardingData = { ...onboardingData };
    updatedOnboardingData.company.email = newEmail;
    
    setOnboardingData(updatedOnboardingData);
    localStorage.setItem("onboardingData", JSON.stringify(updatedOnboardingData));
    
    const onboarding = localStorage.getItem("onboardingInProgress");
    if (onboarding) {
      localStorage.setItem("onboardingInProgress", JSON.stringify({ 
        ...JSON.parse(onboarding), 
        email: newEmail 
      }));
    }
    
    navigate("/verify-email");
    toast({
      title: "Email updated",
      description: "Your email has been updated successfully. Please verify the new email.",
    });
  };

  const setPassword = async (token: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/change-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Password update failed');
      }
      
      const onboarding = localStorage.getItem("onboardingInProgress");
      if (onboarding) {
        localStorage.setItem("onboardingInProgress", JSON.stringify({ 
          ...JSON.parse(onboarding), 
          step: 3,
          passwordSet: true
        }));
        setOnboardingStep(3);
        
        toast({
          title: "Password set",
          description: "Your password has been set successfully."
        });
        
        navigate("/setup/departments");
      }
    } catch (error: any) {
      toast({
        title: "Password update failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const completeOnboarding = () => {
    // Create user account
    const onboarding = JSON.parse(localStorage.getItem("onboardingInProgress") || "{}");
    const userData = JSON.parse(localStorage.getItem("onboardingData") || "{}");
    
    const user = {
      email: onboarding.email,
      userData: userData,
      onboardingCompleted: true
    };
    
    // Save the user as current logged in user
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    // Clear onboarding data
    localStorage.removeItem("onboardingInProgress");
    localStorage.removeItem("onboardingData");
    setIsOnboarding(false);
    setOnboardingStep(0);
    
    // Navigate to dashboard
    navigate("/dashboard");
    toast({
      title: "Setup completed!",
      description: "Your account has been created successfully.",
    });
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Store the token in localStorage
      localStorage.setItem("token", data.token);
      setToken(data.token);
      
      // Fetch user data with the token
      const userResponse = await fetch(`${API_URL}/permissions/permissionDetails`, {
        headers: {
          'Authorization': `Bearer ${data.token}`
        }
      });
      
      const userData = await userResponse.json();
      
      if (!userResponse.ok) {
        throw new Error(userData.message || 'Failed to fetch user data');
      }
      
      const user = {
        id: userData.message.userId,
        email: userData.message.email,
        roleId: userData.message.roleId,
        roleName: userData.message.roleName,
        companyId: userData.message.companyId
      };
      
      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      toast({
        title: "Login successful",
        description: "Welcome back!"
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const logoutUser = () => {
    // Clear all authentication and onboarding data
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    localStorage.removeItem("onboardingInProgress");
    localStorage.removeItem("onboardingData");
    
    // Reset all state variables
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsOnboarding(false);
    setOnboardingStep(0);
    setOnboardingData(defaultOnboardingData);
    setToken(null);
    
    // Navigate to login page
    navigate("/login");
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
  };

  const updateOnboardingData = (data: any) => {
    const updatedData = { ...onboardingData, ...data };
    setOnboardingData(updatedData);
    localStorage.setItem("onboardingData", JSON.stringify(updatedData));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        registerUser,
        verifyEmail,
        updateEmail,
        setPassword,
        completeOnboarding,
        loginUser,
        logoutUser,
        onboardingStep,
        setOnboardingStep,
        isOnboarding,
        onboardingData,
        updateOnboardingData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
