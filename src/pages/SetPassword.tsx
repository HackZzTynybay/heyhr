
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import OnboardingLayout from '@/components/OnboardingLayout';
import { useAuth } from '@/context/AuthContext';
import { validatePassword } from '@/lib/validation';
import { Link } from 'react-router-dom';

const SetPassword: React.FC = () => {
  const { onboardingData, setPassword } = useAuth();
  
  const [password, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const email = onboardingData.company.email;
  
  const passwordValidation = validatePassword(password);
  const passwordStrength = 
    !password ? 0 :
    passwordValidation.isValid ? 3 :
    (passwordValidation.hasEightChars && (passwordValidation.hasUppercase || passwordValidation.hasNumber || passwordValidation.hasSpecial)) ? 2 :
    1;
  
  const getStrengthLabel = () => {
    if (!password) return '';
    if (passwordStrength === 1) return 'Weak password';
    if (passwordStrength === 2) return 'Medium password';
    return 'Strong password';
  };
  
  const getStrengthColor = () => {
    if (!password) return '';
    if (passwordStrength === 1) return 'text-red-500';
    if (passwordStrength === 2) return 'text-yellow-500';
    return 'text-green-500';
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordValidation.isValid) {
      setPassword(email, password);
    }
  };

  return (
    <OnboardingLayout title="Password">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-2">Secure Your Account</h2>
        <p className="text-gray-600 mb-6">Set up your password</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                value={password}
                onChange={handleChange}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={toggleShowPassword}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex mb-2">
              <div className={`h-2 rounded-l-full ${passwordStrength >= 1 ? 'bg-green-500' : 'bg-gray-200'} flex-1`}></div>
              <div className={`h-2 ${passwordStrength >= 2 ? 'bg-green-500' : 'bg-gray-200'} flex-1`}></div>
              <div className={`h-2 rounded-r-full ${passwordStrength >= 3 ? 'bg-green-500' : 'bg-gray-200'} flex-1`}></div>
            </div>
            
            <p className={`text-sm ${getStrengthColor()}`}>{getStrengthLabel()}</p>
            
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center">
                {passwordValidation.hasEightChars ? (
                  <Check size={16} className="text-green-500 mr-2" />
                ) : (
                  <AlertCircle size={16} className="text-gray-400 mr-2" />
                )}
                At least 8 characters
              </li>
              <li className="flex items-center">
                {passwordValidation.hasUppercase ? (
                  <Check size={16} className="text-green-500 mr-2" />
                ) : (
                  <AlertCircle size={16} className="text-gray-400 mr-2" />
                )}
                One uppercase letter
              </li>
              <li className="flex items-center">
                {passwordValidation.hasNumber ? (
                  <Check size={16} className="text-green-500 mr-2" />
                ) : (
                  <AlertCircle size={16} className="text-gray-400 mr-2" />
                )}
                One number
              </li>
              <li className="flex items-center">
                {passwordValidation.hasSpecial ? (
                  <Check size={16} className="text-green-500 mr-2" />
                ) : (
                  <AlertCircle size={16} className="text-gray-400 mr-2" />
                )}
                One special character
              </li>
            </ul>
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-brand-blue hover:bg-blue-600"
            disabled={!passwordValidation.isValid}
          >
            Create Password
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

export default SetPassword;
