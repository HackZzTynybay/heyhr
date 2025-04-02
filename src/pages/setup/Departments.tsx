
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import OnboardingSidebar from '@/components/OnboardingSidebar';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FormField from '@/components/FormField';
import { Plus, Users, Building, Mail } from 'lucide-react';

interface Department {
  id: string;
  name: string;
  email: string;
  lead_id?: string;
}

const API_URL = "http://localhost:3000/api"; // Update with your actual API URL

const SetupDepartments: React.FC = () => {
  const { onboardingData, updateOnboardingData, setOnboardingStep } = useAuth();
  const navigate = useNavigate();
  
  const [departments, setDepartments] = useState<Department[]>(onboardingData.departments || []);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newDepartment, setNewDepartment] = useState({ name: '', email: '', lead_id: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setIsLoading(true);
        
        const token = localStorage.getItem('token');
        
        if (!token) {
          // If no token, just use the local data
          return;
        }
        
        const response = await fetch(`${API_URL}/departments/getdepartments`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
          setDepartments(data.data);
          updateOnboardingData({ departments: data.data });
        }
      } catch (error) {
        // Just continue with local data
        console.error('Error fetching departments:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDepartments();
  }, [updateOnboardingData]);
  
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
  
  const handleAddDepartment = async () => {
    const validation = validateDepartmentForm();
    
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      
      // Make API request to create department
      const response = await fetch(`${API_URL}/departments/createdepartments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          department_name: newDepartment.name,
          group_email: newDepartment.email,
          lead_id: newDepartment.lead_id || null
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to create department');
      }
      
      const data = await response.json();
      
      // Add the new department to state
      const newDept = {
        id: data.department.id,
        name: data.department.name,
        email: data.department.email,
        lead_id: data.department.lead_id
      };
      
      const updatedDepartments = [...departments, newDept];
      setDepartments(updatedDepartments);
      updateOnboardingData({ departments: updatedDepartments });
      
      setNewDepartment({ name: '', email: '', lead_id: '' });
      setShowAddDialog(false);
      
      toast({
        title: 'Department added',
        description: `${newDept.name} department has been added.`
      });
    } catch (error) {
      // If API call fails, just add to local state for demo purposes
      const departmentId = `dept-${Date.now()}`;
      const department = {
        id: departmentId,
        name: newDepartment.name,
        email: newDepartment.email,
        lead_id: newDepartment.lead_id
      };
      
      const updatedDepartments = [...departments, department];
      setDepartments(updatedDepartments);
      updateOnboardingData({ departments: updatedDepartments });
      
      setNewDepartment({ name: '', email: '', lead_id: '' });
      setShowAddDialog(false);
      
      toast({
        title: 'Department added (offline mode)',
        description: `${department.name} department has been added locally.`
      });
    } finally {
      setIsLoading(false);
    }
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
    <div className="flex min-h-screen bg-gray-50">
      <OnboardingSidebar currentStep="departments" />
      
      <div className="flex-1 p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1 text-blue-600">Set Up Your Departments</h1>
            <p className="text-gray-600">Create and organize your company's department structure</p>
          </div>
          
          <div className="space-x-3">
            <Button variant="outline" onClick={handleSkip}>Skip</Button>
            <Button 
              onClick={handleSaveAndNext}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              Save & Next
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-5">
          {departments.map(dept => (
            <div key={dept.id} className="border border-blue-100 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-md">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg text-blue-700">{dept.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <Mail className="h-3.5 w-3.5 mr-1" />
                    <span>{dept.email || 'No email set'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div 
            className="border border-dashed border-blue-200 rounded-lg p-5 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors"
            onClick={() => setShowAddDialog(true)}
          >
            <div className="text-center">
              <div className="bg-blue-50 rounded-full p-3 mx-auto mb-3 w-fit">
                <Plus className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-blue-600 font-medium">Add Department</span>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md" onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle className="text-blue-600">Add Department</DialogTitle>
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
              icon={<Building className="h-4 w-4 text-gray-500" />}
            />
            
            <FormField
              label="Group email"
              name="email"
              type="email"
              placeholder="department@example.com"
              value={newDepartment.email}
              onChange={handleInputChange}
              error={formErrors.email}
              icon={<Mail className="h-4 w-4 text-gray-500" />}
            />
            
            <FormField
              label="Department Head"
              name="lead_id"
              placeholder="Search employee"
              value={newDepartment.lead_id}
              onChange={handleInputChange}
              error={formErrors.lead_id}
              icon={<Users className="h-4 w-4 text-gray-500" />}
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleAddDepartment}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SetupDepartments;
