
// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password) => {
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

// Company form validation
export const validateCompanyForm = (data) => {
  const errors = {};
  
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
