
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import OnboardingSidebar from '@/components/OnboardingSidebar';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FormField from '@/components/FormField';
import { Plus } from 'lucide-react';

interface Department {
  id: string;
  name: string;
  email: string;
  head?: string;
}

const SetupDepartments: React.FC = () => {
  const { onboardingData, updateOnboardingData, setOnboardingStep } = useAuth();
  const navigate = useNavigate();
  
  const [departments, setDepartments] = useState<Department[]>(onboardingData.departments || []);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newDepartment, setNewDepartment] = useState({ name: '', email: '', head: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDepartment(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateDepartmentForm = () => {
    const errors: Record<string, string> = {};
    
    if (!newDepartment.name.trim()) {
      errors.name = 'Department name is required';
    }
    
    return { isValid: Object.keys(errors).length === 0, errors };
  };
  
  const handleAddDepartment = () => {
    const validation = validateDepartmentForm();
    
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }
    
    const departmentId = `dept-${Date.now()}`;
    const department = {
      id: departmentId,
      name: newDepartment.name,
      email: newDepartment.email,
      head: newDepartment.head
    };
    
    const updatedDepartments = [...departments, department];
    setDepartments(updatedDepartments);
    updateOnboardingData({ departments: updatedDepartments });
    
    setNewDepartment({ name: '', email: '', head: '' });
    setShowAddDialog(false);
    
    toast({
      title: 'Department added',
      description: `${department.name} department has been added.`
    });
  };
  
  const handleSaveAndNext = () => {
    setOnboardingStep(4);
    navigate('/setup/roles');
  };
  
  const handleSkip = () => {
    setOnboardingStep(4);
    navigate('/setup/roles');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <OnboardingSidebar currentStep="departments" />
      
      <div className="flex-1 p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">Set Up Your Departments</h1>
            <p className="text-gray-600">Create and organize your company's department structure</p>
          </div>
          
          <div className="space-x-3">
            <Button variant="outline" onClick={handleSkip}>Skip</Button>
            <Button onClick={handleSaveAndNext}>Save & Next</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {departments.map(dept => (
            <div key={dept.id} className="border border-gray-200 rounded-lg p-4 bg-white">
              <h3 className="font-medium text-lg">{dept.name}</h3>
              <p className="text-gray-600 text-sm">{dept.email}</p>
            </div>
          ))}
          
          <div 
            className="border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-gray-50"
            onClick={() => setShowAddDialog(true)}
          >
            <div className="text-center">
              <Plus className="mx-auto text-gray-400 mb-2" />
              <span className="text-gray-600">Add Department</span>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Department</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <FormField
              label="Department Name"
              name="name"
              placeholder="Enter department name"
              value={newDepartment.name}
              onChange={handleInputChange}
              error={formErrors.name}
              required
            />
            
            <FormField
              label="Group email"
              name="email"
              type="email"
              placeholder="person@example.com"
              value={newDepartment.email}
              onChange={handleInputChange}
              error={formErrors.email}
            />
            
            <FormField
              label="Department Head"
              name="head"
              placeholder="Search employee"
              value={newDepartment.head}
              onChange={handleInputChange}
              error={formErrors.head}
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddDepartment}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SetupDepartments;
