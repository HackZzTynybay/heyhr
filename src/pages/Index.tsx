
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isOnboarding, onboardingStep } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      // If user is authenticated, redirect to dashboard
      navigate("/dashboard");
    } else if (isOnboarding) {
      // If user is in onboarding process, redirect to appropriate step
      const onboardingRoutes = [
        "/register",
        "/verify-email",
        "/set-password",
        "/setup/departments",
        "/setup/roles",
        "/setup/employees"
      ];
      
      navigate(onboardingRoutes[onboardingStep] || "/register");
    } else {
      // If user is not authenticated or onboarding, redirect to login page
      navigate("/login");
    }
  }, [navigate, isAuthenticated, isOnboarding, onboardingStep]);

  return null;
};

export default Index;
