
// Email validation
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Password validation
export const validatePassword = (password) => {
  const hasEightChars = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const isValid = hasEightChars && hasUppercase && hasNumber && hasSpecial;
  
  return {
    isValid,
    hasEightChars,
    hasUppercase,
    hasNumber,
    hasSpecial
  };
};

// Phone validation
export const validatePhone = (phone) => {
  // Basic phone validation, can be enhanced for specific country formats
  const regex = /^\+?[0-9]{10,15}$/;
  return regex.test(phone);
};

// Form validation for company registration
export const validateCompanyForm = (formData) => {
  const errors = {};
  let isValid = true;
  
  // Company Name
  if (!formData.companyName.trim()) {
    errors.companyName = 'Company name is required';
    isValid = false;
  }
  
  // Work Email
  if (!formData.workEmail.trim()) {
    errors.workEmail = 'Work email is required';
    isValid = false;
  } else if (!validateEmail(formData.workEmail)) {
    errors.workEmail = 'Please enter a valid email address';
    isValid = false;
  }
  
  // Phone Number
  if (!formData.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required';
    isValid = false;
  } else if (!validatePhone(formData.phoneNumber)) {
    errors.phoneNumber = 'Please enter a valid phone number';
    isValid = false;
  }
  
  // Company ID
  if (!formData.companyId.trim()) {
    errors.companyId = 'Company ID is required';
    isValid = false;
  }
  
  // Number of Employees
  if (!formData.employees) {
    errors.employees = 'Please select number of employees';
    isValid = false;
  }
  
  // Full Name
  if (!formData.fullName.trim()) {
    errors.fullName = 'Full name is required';
    isValid = false;
  }
  
  // Job Title
  if (!formData.jobTitle.trim()) {
    errors.jobTitle = 'Job title is required';
    isValid = false;
  }
  
  // Terms Agreement
  if (!formData.termsAgreed) {
    errors.termsAgreed = 'You must agree to the Terms of Service and Privacy Policy';
    isValid = false;
  }
  
  return {
    isValid,
    errors
  };
};

// Login form validation
export const validateLoginForm = (email, password) => {
  const errors = {};
  let isValid = true;
  
  if (!email.trim()) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }
  
  if (!password.trim()) {
    errors.password = 'Password is required';
    isValid = false;
  }
  
  return {
    isValid,
    errors
  };
};
