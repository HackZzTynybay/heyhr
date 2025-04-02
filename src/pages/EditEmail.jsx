
import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import FormField from '@/components/FormField.jsx';
import OnboardingLayout from '@/components/OnboardingLayout.jsx';
import { useAuth } from '@/context/AuthContext.jsx';
import { validateEmail } from '@/lib/validation.js';

const EditEmail = () => {
  const { onboardingData, updateEmail } = useAuth();
  
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');
  
  const currentEmail = onboardingData.company.email;
  
  const handleChange = (e) => {
    setNewEmail(e.target.value);
    setError('');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newEmail) {
      setError('Please enter a new email address');
      return;
    }
    
    if (!validateEmail(newEmail)) {
      setError('Please enter a valid email address');
      return;
    }
    
    updateEmail(currentEmail, newEmail);
  };
  
  const handleCancel = () => {
    window.history.back();
  };

  return (
    <OnboardingLayout title="Edit email address">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-2">Update your email address</h2>
        <p className="text-gray-600 mb-6">Please enter your new email address below</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current email
            </label>
            <div className="p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
              {currentEmail}
            </div>
          </div>
          
          <FormField
            label="New email address"
            name="newEmail"
            type="email"
            placeholder="Enter your new email address"
            value={newEmail}
            onChange={handleChange}
            error={error}
            required
          />
          
          <Button 
            type="submit"
            className="w-full mt-2 mb-3 bg-brand-blue hover:bg-blue-600"
          >
            Save Changes
          </Button>
          
          <Button 
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </form>
      </div>
    </OnboardingLayout>
  );
};

export default EditEmail;
