
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
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Employee {
  id: string;
  name: string;
  title: string;
  initials: string;
}

const DepartmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const isEditing = searchParams.get('edit') === 'true';
  const navigate = useNavigate();
  
  // Mock data for the department
  const [department, setDepartment] = useState({
    id: id || 'dept-1',
    name: 'Human Resources',
    code: 'HR-001',
    head: 'Cody Fisher',
    email: 'hr@company.com',
    subDepartment: ''
  });
  
  const employees: Employee[] = [
    { id: 'emp-1', name: 'Jerome Bell', title: 'Tech Lead', initials: 'JB' },
    { id: 'emp-2', name: 'Jerome Bell', title: 'Tech Lead', initials: 'JB' },
    { id: 'emp-3', name: 'Jerome Bell', title: 'Tech Lead', initials: 'JB' },
    { id: 'emp-4', name: 'Jerome Bell', title: 'Tech Lead', initials: 'JB' }
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDepartment(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubDepartmentChange = (value: string) => {
    setDepartment(prev => ({ ...prev, subDepartment: value }));
  };
  
  const handleCancel = () => {
    navigate('/organization/departments');
  };
  
  const handleSave = () => {
    // In a real app, you would send this to an API
    toast({
      title: "Department updated",
      description: `${department.name} has been successfully updated.`
    });
    navigate('/organization/departments');
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <h1 className="font-medium">Organization</h1>
          <span>/</span>
          <h1 className="font-medium">Departments</h1>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex">
          <div className="w-1/2 border-r border-gray-200 p-6">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department Code
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Head of Department
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {department.name}
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {department.code}
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                          {department.head.split(' ').map(part => part[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm text-gray-900">
                        {department.head}
                      </div>
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
                  <label className="text-sm font-medium">Department Name*</label>
                  <Input
                    name="name"
                    value={department.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Group email</label>
                  <Input
                    name="email"
                    type="email"
                    value={department.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department Head</label>
                  <Input
                    name="head"
                    value={department.head}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department Code</label>
                  <Input
                    name="code"
                    value={department.code}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sub-Department</label>
                  <Select 
                    value={department.subDepartment} 
                    onValueChange={handleSubDepartmentChange}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fe-dev">Front-End Development</SelectItem>
                      <SelectItem value="be-dev">Back-End Development</SelectItem>
                      <SelectItem value="add-new">
                        <div className="flex items-center text-blue-600">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 mr-1" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="2" 
                              d="M12 4v16m8-8H4" 
                            />
                          </svg>
                          <span>Add new</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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

export default DepartmentDetails;
