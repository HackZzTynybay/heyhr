import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: any;
  registerUser: (userData: any) => void;
  verifyEmail: (email: string) => void;
  updateEmail: (oldEmail: string, newEmail: string) => void;
  setPassword: (email: string, password: string) => void;
  completeOnboarding: () => void;
  loginUser: (email: string, password: string) => void;
  logoutUser: () => void;
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  isOnboarding: boolean;
  onboardingData: any;
  updateOnboardingData: (data: any) => void;
}

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
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check localStorage on initial load
  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
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

  const registerUser = (userData: any) => {
    // For MVP, store in localStorage
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
    navigate("/verify-email");
  };

  const verifyEmail = (email: string) => {
    const onboarding = localStorage.getItem("onboardingInProgress");
    if (onboarding) {
      localStorage.setItem("onboardingInProgress", JSON.stringify({ 
        ...JSON.parse(onboarding), 
        step: 2, 
        emailVerified: true 
      }));
      setOnboardingStep(2);
      navigate("/set-password");
    }
  };

  const updateEmail = (oldEmail: string, newEmail: string) => {
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

  const setPassword = (email: string, password: string) => {
    const onboarding = localStorage.getItem("onboardingInProgress");
    if (onboarding) {
      localStorage.setItem("onboardingInProgress", JSON.stringify({ 
        ...JSON.parse(onboarding), 
        step: 3,
        passwordSet: true
      }));
      setOnboardingStep(3);

      // Store password securely (for MVP just in localStorage)
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push({
        email,
        password,
        userData: onboardingData
      });
      localStorage.setItem("users", JSON.stringify(users));
      
      navigate("/setup/departments");
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

  const loginUser = (email: string, password: string) => {
    // For MVP, check localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify({
        email: user.email,
        userData: user.userData,
      }));
      setCurrentUser({
        email: user.email,
        userData: user.userData,
      });
      setIsAuthenticated(true);
      navigate("/dashboard");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
    }
  };

  const logoutUser = () => {
    // Clear all authentication and onboarding data
    localStorage.removeItem("currentUser");
    localStorage.removeItem("onboardingInProgress");
    localStorage.removeItem("onboardingData");
    
    // Reset all state variables
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsOnboarding(false);
    setOnboardingStep(0);
    setOnboardingData(defaultOnboardingData);
    
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
