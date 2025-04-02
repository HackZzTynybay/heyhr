
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FormField from '@/components/FormField';
import OnboardingLayout from '@/components/OnboardingLayout';
import { useAuth } from '@/context/AuthContext';

const Login: React.FC = () => {
  const { loginUser } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    loginUser(formData.email, formData.password);
  };

  return (
    <OnboardingLayout title="Login">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Log in to EasyHR</h2>
        
        <form onSubmit={handleSubmit}>
          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="your.name@company.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          
          <FormField
            label="Password"
            name="password"
            type="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
          
          <div className="mb-6">
            <Link to="/forgot-password" className="text-sm text-brand-blue hover:underline">
              Forgot password?
            </Link>
          </div>
          
          <Button type="submit" className="w-full bg-brand-blue hover:bg-blue-600">
            Log in
          </Button>
          
          <div className="text-center mt-4 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-brand-blue hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </OnboardingLayout>
  );
};

export default Login;
