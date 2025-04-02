
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import OnboardingSidebar from '@/components/OnboardingSidebar';
import { useNavigate } from 'react-router-dom';
import { Upload, UserPlus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FormField from '@/components/FormField';
import { toast } from '@/components/ui/use-toast';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender?: string;
  dateOfBirth?: string;
  joiningDate?: string;
  jobTitle: string;
  department: string;
}

const SetupEmployees: React.FC = () => {
  const { onboardingData, updateOnboardingData, completeOnboarding } = useAuth();
  const navigate = useNavigate();
  
  const [employees, setEmployees] = useState<Employee[]>(onboardingData.employees || []);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id'>>({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    joiningDate: '',
    jobTitle: '',
    department: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  const handleAddEmployee = () => {
    // Simple validation
    if (!newEmployee.firstName || !newEmployee.lastName || !newEmployee.email) {
      setFormErrors({
        ...(newEmployee.firstName ? {} : { firstName: 'First name is required' }),
        ...(newEmployee.lastName ? {} : { lastName: 'Last name is required' }),
        ...(newEmployee.email ? {} : { email: 'Email is required' })
      });
      return;
    }
    
    const employee = {
      id: `emp-${Date.now()}`,
      ...newEmployee
    };
    
    const updatedEmployees = [...employees, employee];
    setEmployees(updatedEmployees);
    updateOnboardingData({ employees: updatedEmployees });
    
    setShowAddDialog(false);
    setNewEmployee({
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      dateOfBirth: '',
      joiningDate: '',
      jobTitle: '',
      department: ''
    });
    
    toast({
      title: 'Employee added',
      description: `${employee.firstName} ${employee.lastName} has been added.`
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setNewEmployee(prev => ({ ...prev, [field]: value }));
    
    // Clear error when selecting
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  const handleSaveAndNext = () => {
    completeOnboarding();
  };
  
  const handleSkip = () => {
    completeOnboarding();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <OnboardingSidebar currentStep="employees" />
      
      <div className="flex-1 p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">Import Employees</h1>
            <p className="text-gray-600">Choose your preferred method to import employees</p>
          </div>
          
          <div className="space-x-3">
            <Button variant="outline" onClick={handleSkip}>Skip</Button>
            <Button onClick={handleSaveAndNext}>Save & Next</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <div className="flex flex-col items-center justify-center">
              <div className="p-4 mb-4">
                <Upload size={32} className="text-gray-400" />
              </div>
              
              <h3 className="font-medium text-lg mb-2">CSV Import</h3>
              <p className="text-gray-600 text-sm text-center mb-4">
                Upload your employee data using our CSV template
              </p>
              
              <div className="w-full p-4 border border-dashed border-gray-300 rounded-md text-center text-gray-500 text-sm mb-4">
                Drag and drop your CSV file<br />
                or click to browse
              </div>
              
              <Button variant="link" className="text-brand-blue">
                Download sample
              </Button>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <div className="flex flex-col items-center justify-center">
              <div className="p-4 mb-4">
                <UserPlus size={32} className="text-gray-400" />
              </div>
              
              <h3 className="font-medium text-lg mb-2">Add Manually</h3>
              <p className="text-gray-600 text-sm text-center mb-8">
                Add employees one by one manually
              </p>
              
              <Button 
                onClick={() => setShowAddDialog(true)}
                className="bg-brand-blue hover:bg-blue-600"
              >
                Add Employee
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Add employee</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <h3 className="font-medium mb-3">Basic Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="First Name"
                name="firstName"
                placeholder="Enter first name"
                value={newEmployee.firstName}
                onChange={handleInputChange}
                error={formErrors.firstName}
                required
              />
              
              <FormField
                label="Last Name"
                name="lastName"
                placeholder="Enter last name"
                value={newEmployee.lastName}
                onChange={handleInputChange}
                error={formErrors.lastName}
                required
              />
            </div>
            
            <FormField
              label="Gender"
              name="gender"
              type="select"
              value={newEmployee.gender}
              onChange={handleInputChange}
              onSelectChange={(value) => handleSelectChange('gender', value)}
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
                { label: 'Other', value: 'other' }
              ]}
              error={formErrors.gender}
            />
            
            <FormField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={newEmployee.dateOfBirth}
              onChange={handleInputChange}
              error={formErrors.dateOfBirth}
            />
            
            <FormField
              label="Official Mail"
              name="email"
              type="email"
              placeholder="Enter official mail"
              value={newEmployee.email}
              onChange={handleInputChange}
              error={formErrors.email}
              required
            />
            
            <h3 className="font-medium mb-3 mt-6">Employment Details</h3>
            
            <FormField
              label="Joining Date"
              name="joiningDate"
              type="date"
              value={newEmployee.joiningDate}
              onChange={handleInputChange}
              error={formErrors.joiningDate}
              required
            />
            
            <FormField
              label="Job Title"
              name="jobTitle"
              placeholder="Enter job title"
              value={newEmployee.jobTitle}
              onChange={handleInputChange}
              error={formErrors.jobTitle}
              required
            />
            
            <FormField
              label="Department"
              name="department"
              type="select"
              value={newEmployee.department}
              onChange={handleInputChange}
              onSelectChange={(value) => handleSelectChange('department', value)}
              options={onboardingData.departments.map(dept => ({
                label: dept.name,
                value: dept.id
              }))}
              error={formErrors.department}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddEmployee}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SetupEmployees;
