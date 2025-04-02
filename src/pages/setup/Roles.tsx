
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import OnboardingSidebar from '@/components/OnboardingSidebar';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, Lock, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FormField from '@/components/FormField';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface PermissionCategory {
  id: string;
  name: string;
  permissions: Permission[];
}

interface Permission {
  id: string;
  name: string;
}

interface Role {
  id?: string;
  name: string;
  description: string;
  permissions: string[];
  isDefault?: boolean;
  permissionsCount?: number;
}

const SetupRoles: React.FC = () => {
  const { onboardingData, updateOnboardingData, setOnboardingStep } = useAuth();
  const navigate = useNavigate();
  
  const [roles, setRoles] = useState<Role[]>(onboardingData.roles || []);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newRole, setNewRole] = useState<Role>({ name: '', description: '', permissions: [] });
  const [permissionMethod, setPermissionMethod] = useState<'template' | 'custom'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Mock permission categories for demonstration
  const permissionCategories: PermissionCategory[] = [
    {
      id: 'emp-management',
      name: 'Employee Management',
      permissions: [
        { id: 'view-employees', name: 'View employee directory' },
        { id: 'edit-employees', name: 'Edit employee details' },
        { id: 'add-employees', name: 'Add new employees' },
        { id: 'delete-employees', name: 'Delete/archive employees' }
      ]
    },
    {
      id: 'leave-attendance',
      name: 'Leave & Attendance',
      permissions: [
        { id: 'view-leave', name: 'View leave calendar' },
        { id: 'approve-leave', name: 'Approve/reject leave requests' },
        { id: 'create-leave-policy', name: 'Create leave policies (casual/sick/maternity)' },
        { id: 'view-attendance', name: 'View attendance logs' }
      ]
    }
  ];
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRole(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value);
    
    // Find the template role
    const templateRole = roles.find(role => role.name === value);
    if (templateRole) {
      setNewRole(prev => ({
        ...prev,
        permissions: templateRole.permissions || []
      }));
    }
  };
  
  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setNewRole(prev => {
      if (checked) {
        return { ...prev, permissions: [...prev.permissions, permissionId] };
      } else {
        return { ...prev, permissions: prev.permissions.filter(id => id !== permissionId) };
      }
    });
  };
  
  const validateRoleForm = () => {
    const errors: Record<string, string> = {};
    
    if (!newRole.name.trim()) {
      errors.name = 'Role name is required';
    }
    
    if (permissionMethod === 'template' && !selectedTemplate) {
      errors.template = 'Please select a permission template';
    }
    
    return { isValid: Object.keys(errors).length === 0, errors };
  };
  
  const handleAddRole = () => {
    const validation = validateRoleForm();
    
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }
    
    const roleId = `role-${Date.now()}`;
    const permissionsCount = newRole.permissions.length;
    
    const role = {
      id: roleId,
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions,
      permissionsCount
    };
    
    const updatedRoles = [...roles, role];
    setRoles(updatedRoles);
    updateOnboardingData({ roles: updatedRoles });
    
    setNewRole({ name: '', description: '', permissions: [] });
    setShowAddDialog(false);
    setSelectedTemplate('');
    
    toast({
      title: 'Role added',
      description: `${role.name} role has been added.`
    });
  };
  
  const handleSaveAndNext = () => {
    setOnboardingStep(5);
    navigate('/setup/employees');
  };
  
  const handleSkip = () => {
    setOnboardingStep(5);
    navigate('/setup/employees');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <OnboardingSidebar currentStep="roles" />
      
      <div className="flex-1 p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">Set Up User Roles & Permissions</h1>
            <p className="text-gray-600">Configure roles and assign permissions to control access levels.</p>
          </div>
          
          <div className="space-x-3">
            <Button variant="outline" onClick={handleSkip}>Skip</Button>
            <Button onClick={handleSaveAndNext}>Save & Next</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {roles.map(role => (
            <div key={role.id || role.name} className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-lg">
                    {role.name}
                    {role.name === 'Super Admin' && <Lock size={16} className="inline ml-1" />}
                  </h3>
                  <p className="text-gray-600 text-sm">{role.description}</p>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-sm text-brand-blue hover:underline cursor-pointer">
                  {role.permissions.includes('all') 
                    ? 'All permissions assigned' 
                    : `${role.permissionsCount} permissions assigned`}
                </span>
              </div>
            </div>
          ))}
          
          <div 
            className="border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-gray-50"
            onClick={() => setShowAddDialog(true)}
          >
            <div className="text-center">
              <Plus className="mx-auto text-gray-400 mb-2" />
              <span className="text-gray-600">Role</span>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Add Role</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <FormField
              label="Role Name"
              name="name"
              placeholder="Enter role name"
              value={newRole.name}
              onChange={handleInputChange}
              error={formErrors.name}
              required
            />
            
            <FormField
              label="Description"
              name="description"
              placeholder="Enter description"
              value={newRole.description}
              onChange={handleInputChange}
              error={formErrors.description}
            />
            
            <div className="mt-6">
              <RadioGroup value={permissionMethod} onValueChange={(value) => setPermissionMethod(value as 'template' | 'custom')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="template" id="template" />
                  <Label htmlFor="template">Existing permission template</Label>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom">Choose your own set of permissions</Label>
                </div>
              </RadioGroup>
              
              {permissionMethod === 'template' && (
                <div className="mt-4">
                  <Label htmlFor="templateSelect">Existing permission template</Label>
                  <div className="relative mt-1">
                    <select 
                      id="templateSelect"
                      value={selectedTemplate} 
                      onChange={(e) => handleTemplateChange(e.target.value)} 
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      {roles.filter(r => r.isDefault).map(role => (
                        <option key={role.name} value={role.name}>{role.name}</option>
                      ))}
                    </select>
                  </div>
                  {formErrors.template && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.template}</p>
                  )}
                </div>
              )}
              
              {permissionMethod === 'custom' && (
                <div className="mt-4">
                  <h3 className="font-medium mb-3">Permissions</h3>
                  
                  {permissionCategories.map(category => (
                    <div key={category.id} className="mb-4 border border-gray-200 rounded-md overflow-hidden">
                      <div 
                        className="bg-gray-50 p-3 flex items-center justify-between cursor-pointer"
                        onClick={() => toggleCategory(category.id)}
                      >
                        <div className="flex items-center">
                          <h4 className="font-medium">{category.name}</h4>
                          {expandedCategories[category.id] ? (
                            <ChevronUp size={16} className="ml-2" />
                          ) : (
                            <ChevronDown size={16} className="ml-2" />
                          )}
                        </div>
                      </div>
                      
                      {expandedCategories[category.id] && (
                        <div className="p-3">
                          {category.permissions.map(permission => (
                            <div key={permission.id} className="flex items-center space-x-2 py-1">
                              <Checkbox 
                                id={permission.id}
                                checked={newRole.permissions.includes(permission.id)}
                                onCheckedChange={(checked) => 
                                  handlePermissionChange(permission.id, checked as boolean)
                                }
                              />
                              <label htmlFor={permission.id} className="text-sm">
                                {permission.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddRole}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SetupRoles;
