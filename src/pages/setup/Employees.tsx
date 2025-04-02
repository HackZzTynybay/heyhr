
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import OnboardingSidebar from '@/components/OnboardingSidebar';
import { useNavigate } from 'react-router-dom';
import { Upload, UserPlus, Calendar as CalendarIcon, User, Mail, Briefcase, Building } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FormField from '@/components/FormField';
import { toast } from '@/components/ui/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

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
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [joiningDate, setJoiningDate] = useState<Date | undefined>();
  
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
      ...newEmployee,
      dateOfBirth: dateOfBirth ? format(dateOfBirth, 'yyyy-MM-dd') : '',
      joiningDate: joiningDate ? format(joiningDate, 'yyyy-MM-dd') : ''
    };
    
    const updatedEmployees = [...employees, employee];
    setEmployees(updatedEmployees);
    updateOnboardingData({ employees: updatedEmployees });
    
    setShowAddDialog(false);
    resetForm();
    
    toast({
      title: 'Employee added',
      description: `${employee.firstName} ${employee.lastName} has been added.`
    });
  };
  
  const resetForm = () => {
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
    setDateOfBirth(undefined);
    setJoiningDate(undefined);
    setFormErrors({});
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
  
  const handleDateOfBirthChange = (date: Date | undefined) => {
    setDateOfBirth(date);
    if (date) {
      setNewEmployee(prev => ({ ...prev, dateOfBirth: format(date, 'yyyy-MM-dd') }));
    }
  };
  
  const handleJoiningDateChange = (date: Date | undefined) => {
    setJoiningDate(date);
    if (date) {
      setNewEmployee(prev => ({ ...prev, joiningDate: format(date, 'yyyy-MM-dd') }));
    }
  };
  
  const handleSaveAndNext = () => {
    completeOnboarding();
    navigate('/dashboard');
  };
  
  const handleSkip = () => {
    completeOnboarding();
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <OnboardingSidebar currentStep="employees" />
      
      <div className="flex-1 p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1 text-blue-600">Import Employees</h1>
            <p className="text-gray-600">Choose your preferred method to import employees</p>
          </div>
          
          <div className="space-x-3">
            <Button variant="outline" onClick={handleSkip}>Skip</Button>
            <Button 
              onClick={handleSaveAndNext}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save & Next
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="border border-blue-100 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center justify-center">
              <div className="p-4 bg-blue-50 rounded-full mb-4">
                <Upload size={32} className="text-blue-600" />
              </div>
              
              <h3 className="font-medium text-lg mb-2 text-blue-700">CSV Import</h3>
              <p className="text-gray-600 text-sm text-center mb-4">
                Upload your employee data using our CSV template
              </p>
              
              <div className="w-full p-4 border border-dashed border-blue-200 rounded-md text-center text-gray-500 text-sm mb-4 hover:bg-blue-50 transition-colors cursor-pointer">
                Drag and drop your CSV file<br />
                or click to browse
              </div>
              
              <Button variant="link" className="text-blue-600">
                Download sample
              </Button>
            </div>
          </div>
          
          <div className="border border-blue-100 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center justify-center">
              <div className="p-4 bg-blue-50 rounded-full mb-4">
                <UserPlus size={32} className="text-blue-600" />
              </div>
              
              <h3 className="font-medium text-lg mb-2 text-blue-700">Add Manually</h3>
              <p className="text-gray-600 text-sm text-center mb-8">
                Add employees one by one manually
              </p>
              
              <Button 
                onClick={() => setShowAddDialog(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
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
            <DialogTitle className="text-blue-600">Add employee</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <h3 className="font-medium mb-3 text-blue-700">Basic Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="First Name"
                name="firstName"
                placeholder="Enter first name"
                value={newEmployee.firstName}
                onChange={handleInputChange}
                error={formErrors.firstName}
                required
                icon={<User className="h-4 w-4 text-gray-500" />}
              />
              
              <FormField
                label="Last Name"
                name="lastName"
                placeholder="Enter last name"
                value={newEmployee.lastName}
                onChange={handleInputChange}
                error={formErrors.lastName}
                required
                icon={<User className="h-4 w-4 text-gray-500" />}
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
              icon={<User className="h-4 w-4 text-gray-500" />}
            />
            
            <div className="my-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateOfBirth && "text-muted-foreground border-gray-300"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                    {dateOfBirth ? format(dateOfBirth, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateOfBirth}
                    onSelect={handleDateOfBirthChange}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {formErrors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{formErrors.dateOfBirth}</p>}
            </div>
            
            <FormField
              label="Official Mail"
              name="email"
              type="email"
              placeholder="Enter official mail"
              value={newEmployee.email}
              onChange={handleInputChange}
              error={formErrors.email}
              required
              icon={<Mail className="h-4 w-4 text-gray-500" />}
            />
            
            <h3 className="font-medium mb-3 mt-6 text-blue-700">Employment Details</h3>
            
            <div className="my-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !joiningDate && "text-muted-foreground border-gray-300"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                    {joiningDate ? format(joiningDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={joiningDate}
                    onSelect={handleJoiningDateChange}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {formErrors.joiningDate && <p className="text-red-500 text-xs mt-1">{formErrors.joiningDate}</p>}
            </div>
            
            <FormField
              label="Job Title"
              name="jobTitle"
              placeholder="Enter job title"
              value={newEmployee.jobTitle}
              onChange={handleInputChange}
              error={formErrors.jobTitle}
              required
              icon={<Briefcase className="h-4 w-4 text-gray-500" />}
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
              icon={<Building className="h-4 w-4 text-gray-500" />}
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowAddDialog(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddEmployee}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SetupEmployees;
