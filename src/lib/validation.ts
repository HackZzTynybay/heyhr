
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): {
  isValid: boolean;
  hasEightChars: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
} => {
  const hasEightChars = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  
  const isValid = hasEightChars && hasUppercase && hasNumber && hasSpecial;
  
  return {
    isValid,
    hasEightChars,
    hasUppercase,
    hasNumber,
    hasSpecial
  };
};

export const validateCompanyForm = (data: any): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  if (!data.companyName.trim()) {
    errors.companyName = "Company name is required";
  }
  
  if (!data.workEmail.trim()) {
    errors.workEmail = "Work email is required";
  } else if (!validateEmail(data.workEmail)) {
    errors.workEmail = "Please enter a valid work email address";
  }
  
  if (!data.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
  }
  
  if (!data.companyId.trim()) {
    errors.companyId = "Company ID is required";
  }
  
  if (!data.employees) {
    errors.employees = "Number of employees is required";
  }
  
  if (!data.fullName.trim()) {
    errors.fullName = "Full name is required";
  }
  
  if (!data.jobTitle.trim()) {
    errors.jobTitle = "Job title is required";
  }
  
  if (!data.termsAgreed) {
    errors.termsAgreed = "You must agree to the Terms of Service and Privacy Policy";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
