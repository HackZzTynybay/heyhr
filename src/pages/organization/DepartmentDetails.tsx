
import React, { useState, useEffect } from 'react';
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
  first_name: string;
  last_name: string;
  email: string;
  job_title: string;
}

interface Department {
  id: string;
  name: string;
  code: string;
  email: string;
  lead_id: string;
  lead_name: string;
  subDepartment?: string;
}

const API_URL = "http://localhost:3000/api"; // Update with your actual API URL

const DepartmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const isEditing = searchParams.get('edit') === 'true';
  const navigate = useNavigate();
  
  const [department, setDepartment] = useState<Department>({
    id: id || '',
    name: '',
    code: '',
    lead_id: '',
    lead_name: '',
    email: '',
    subDepartment: ''
  });
  
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchDepartmentData = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        // Fetch department employees
        const response = await fetch(`${API_URL}/departments/${id}/employees`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch department data');
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
          // Set employees
          setEmployees(data.data);
          
          // For demo purposes, we're assuming department details would be fetched from another endpoint
          // In a real app, you would fetch department details from a specific endpoint
          // For now, we'll use mock data based on the ID
          setDepartment({
            id: id,
            name: 'Human Resources', // This would come from the API
            code: 'HR-001',
            lead_id: data.data[0]?.id || '',
            lead_name: data.data[0] ? `${data.data[0].first_name} ${data.data[0].last_name}` : '',
            email: 'hr@company.com'
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load department data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDepartmentData();
  }, [id]);
  
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
  
  const handleSave = async () => {
    try {
      // If we're assigning a lead, make the API call
      if (department.lead_id) {
        const response = await fetch(`${API_URL}/departments/assignLead`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            lead_id: department.lead_id,
            department_id: department.id
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to update department');
        }
      }
      
      toast({
        title: "Department updated",
        description: `${department.name} has been successfully updated.`
      });
      
      navigate('/organization/departments');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update department",
        variant: "destructive"
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading department data...</p>
      </div>
    );
  }
  
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
                          {department.lead_name ? department.lead_name.split(' ').map(part => part[0]).join('') : 'NA'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm text-gray-900">
                        {department.lead_name || 'Not assigned'}
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
                  <Select 
                    value={department.lead_id} 
                    onValueChange={(value) => {
                      const selectedEmployee = employees.find(emp => emp.id === value);
                      setDepartment(prev => ({ 
                        ...prev, 
                        lead_id: value,
                        lead_name: selectedEmployee ? `${selectedEmployee.first_name} ${selectedEmployee.last_name}` : ''
                      }));
                    }}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map(employee => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.first_name} {employee.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  {employees.length > 0 ? (
                    employees.map((employee) => (
                      <div key={employee.id} className="flex items-center gap-3 py-2">
                        <Avatar>
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {`${employee.first_name[0]}${employee.last_name[0]}`}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{employee.first_name} {employee.last_name}</p>
                          <p className="text-xs text-gray-600">{employee.job_title}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No employees in this department</p>
                  )}
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
