
import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Employee {
  id: string;
  name: string;
  title: string;
  initials: string;
}

const RoleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const isEditing = searchParams.get('edit') === 'true';
  const navigate = useNavigate();
  
  // Mock data for the role
  const [role, setRole] = useState({
    id: id || 'role-1',
    name: 'HR Manager',
    description: 'An HR Manager has access to manage all employee information except financial information.',
    permissionMethod: 'template',
    permissionTemplate: 'HR Manager'
  });
  
  const employees: Employee[] = [
    { id: 'emp-1', name: 'Jerome Bell', title: 'Tech Lead', initials: 'JB' }
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRole(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePermissionMethodChange = (value: string) => {
    setRole(prev => ({ ...prev, permissionMethod: value }));
  };
  
  const handleTemplateChange = (value: string) => {
    setRole(prev => ({ ...prev, permissionTemplate: value }));
  };
  
  const handleCancel = () => {
    navigate('/organization/roles');
  };
  
  const handleSave = () => {
    // In a real app, you would send this to an API
    toast({
      title: "Role updated",
      description: `${role.name} has been successfully updated.`
    });
    navigate('/organization/roles');
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <h1 className="font-medium">Organization</h1>
          <span>/</span>
          <h1 className="font-medium">Roles</h1>
          <span>/</span>
          <h1 className="font-medium">Default Roles</h1>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex">
          <div className="w-1/2 border-r border-gray-200 p-6">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No. of Employees
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {role.name}
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="text-sm text-gray-500 text-center">
                      01
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="w-1/2 p-6">
            <Tabs defaultValue="summary">
              <TabsList className="mb-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="employees">Employees</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role Name*</label>
                  <Input
                    name="name"
                    value={role.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    name="description"
                    value={role.description}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  />
                </div>
                
                <RadioGroup 
                  value={role.permissionMethod} 
                  onValueChange={handlePermissionMethodChange}
                  disabled={!isEditing}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="template" id="template" />
                    <Label htmlFor="template">Existing permission template</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="custom" />
                    <Label htmlFor="custom">Choose your own set of permissions</Label>
                  </div>
                </RadioGroup>
                
                {role.permissionMethod === 'template' && (
                  <div className="space-y-2 mt-2">
                    <label className="text-sm font-medium">Existing permission template</label>
                    <Select 
                      value={role.permissionTemplate} 
                      onValueChange={handleTemplateChange}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HR Manager">HR Manager</SelectItem>
                        <SelectItem value="Department Manager">Department Manager</SelectItem>
                        <SelectItem value="Employee">Employee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="employees">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {employees.map((employee) => (
                    <div key={employee.id} className="flex items-center gap-3 py-2">
                      <Avatar>
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {employee.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-xs text-gray-600">{employee.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 p-6 border-t border-gray-200">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleDetails;
