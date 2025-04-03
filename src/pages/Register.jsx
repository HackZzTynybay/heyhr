
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import { Button } from '@/components/ui/button.jsx';
import FormField from '@/components/FormField.jsx';
import OnboardingLayout from '@/components/OnboardingLayout.jsx';
import { validateCompanyForm } from '@/lib/validation.js';
import { useAuth } from '@/context/AuthContext.jsx';

const Register = () => {
  const { registerUser } = useAuth();
  
  const [formData, setFormData] = useState({
    companyName: '',
    workEmail: '',
    phoneNumber: '',
    companyId: '',
    employees: '',
    fullName: '',
    jobTitle: '',
    termsAgreed: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      employees: value
    });
    
    // Clear error for this field
    if (errors.employees) {
      setErrors({ ...errors, employees: '' });
    }
  };
  
  const handleCheckboxChange = () => {
    setFormData({
      ...formData,
      termsAgreed: !formData.termsAgreed
    });
    
    // Clear error for this field
    if (errors.termsAgreed) {
      setErrors({ ...errors, termsAgreed: '' });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateCompanyForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      await registerUser(formData);
    } catch (error) {
      // Error handling is done in the registerUser function
    } finally {
      setIsLoading(false);
    }
  };
  
  const employeeOptions = [
    { label: '1-10', value: '1-10' },
    { label: '11-50', value: '11-50' },
    { label: '51-200', value: '51-200' },
    { label: '201-500', value: '201-500' },
    { label: '501-1000', value: '501-1000' },
    { label: '1000+', value: '1000+' }
  ];

  return (
    <OnboardingLayout title="Sign Up">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-1">Get Started</h2>
        <p className="text-gray-600 mb-6">Set up your HRMS administrator account</p>
        
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-medium mb-4">Company Information</h3>
          
          <FormField
            label="Company Name"
            name="companyName"
            placeholder="Enter your company name"
            value={formData.companyName}
            onChange={handleChange}
            error={errors.companyName}
            required
          />
          
          <FormField
            label="Work Email"
            name="workEmail"
            type="email"
            placeholder="your.name@company.com"
            value={formData.workEmail}
            onChange={handleChange}
            error={errors.workEmail}
            required
          />
          
          <FormField
            label="Phone Number"
            name="phoneNumber"
            placeholder="+91 9876543210"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={errors.phoneNumber}
            required
          />
          
          <FormField
            label="Company Identification Number"
            name="companyId"
            placeholder="L12345MH2023PLC000789"
            value={formData.companyId}
            onChange={handleChange}
            error={errors.companyId}
            required
          />
          
          <FormField
            label="Number of Employees"
            name="employees"
            type="select"
            value={formData.employees}
            onChange={handleChange}
            onSelectChange={handleSelectChange}
            options={employeeOptions}
            error={errors.employees}
            required
          />
          
          <h3 className="text-lg font-medium mt-8 mb-4">Your Information</h3>
          
          <FormField
            label="Full Name"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            required
          />
          
          <FormField
            label="Your Job Title"
            name="jobTitle"
            placeholder="Enter your job title"
            value={formData.jobTitle}
            onChange={handleChange}
            error={errors.jobTitle}
            required
          />
          
          <div className="flex items-start mb-6 mt-4">
            <Checkbox 
              id="terms" 
              checked={formData.termsAgreed}
              onCheckedChange={handleCheckboxChange}
              className="mt-0.5"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I agree to the <Link to="/terms" className="text-brand-blue hover:underline">Terms of Service</Link> and{' '}
              <Link to="/privacy" className="text-brand-blue hover:underline">Privacy Policy</Link>
            </label>
          </div>
          {errors.termsAgreed && <p className="text-red-500 text-sm mb-4 -mt-4">{errors.termsAgreed}</p>}
          
          <Button 
            type="submit" 
            className="w-full bg-brand-blue hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
          
          <div className="text-center mt-4 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-blue hover:underline">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </OnboardingLayout>
  );
};

export default Register;
