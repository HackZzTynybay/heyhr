
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, MoreVertical, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';

interface Department {
  id: string;
  name: string;
  code: string;
  head: {
    name: string;
    image?: string;
    initials: string;
  };
  email: string;
  employeesCount: number;
}

const Departments: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [showAddDepartment, setShowAddDepartment] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    code: '',
    head: '',
    email: '',
  });
  
  // Mock departments data
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: 'dept-1',
      name: 'Human Resources',
      code: 'HR-001',
      head: {
        name: 'Cody Fisher',
        initials: 'CF'
      },
      email: 'hr@company.com',
      employeesCount: 15
    },
    {
      id: 'dept-2',
      name: 'Engineering',
      code: 'ER-001',
      head: {
        name: 'Michael Chen',
        initials: 'MC'
      },
      email: 'engineering@company.com',
      employeesCount: 45
    },
    {
      id: 'dept-3',
      name: 'Finance',
      code: 'FA-001',
      head: {
        name: 'Robert Wilson',
        initials: 'RW'
      },
      email: 'finance@company.com',
      employeesCount: 12
    }
  ]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDepartment(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddDepartment = () => {
    // In a real app, you would validate and send this to an API
    const newDeptId = `dept-${Date.now()}`;
    
    const departmentToAdd: Department = {
      id: newDeptId,
      name: newDepartment.name,
      code: newDepartment.code,
      head: {
        name: newDepartment.head,
        initials: newDepartment.head.split(' ').map(part => part[0]).join('')
      },
      email: newDepartment.email,
      employeesCount: 0
    };
    
    setDepartments(prev => [...prev, departmentToAdd]);
    setNewDepartment({
      name: '',
      code: '',
      head: '',
      email: '',
    });
    setShowAddDepartment(false);
    
    toast({
      title: "Department added",
      description: `${departmentToAdd.name} has been successfully added.`
    });
  };
  
  const handleDeleteDepartment = (id: string) => {
    setDepartments(prev => prev.filter(dept => dept.id !== id));
    
    toast({
      title: "Department deleted",
      description: "The department has been successfully deleted."
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <h1 className="font-medium">Organization</h1>
          <span>/</span>
          <h1 className="font-medium">Departments</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search departments..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-10 w-48 h-9"
            />
          </div>
          
          <Dialog open={showAddDepartment} onOpenChange={setShowAddDepartment}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Add Department</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Department</DialogTitle>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department Name*</label>
                  <Input
                    name="name"
                    value={newDepartment.name}
                    onChange={handleInputChange}
                    placeholder="Enter department name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Group email</label>
                  <Input
                    name="email"
                    type="email"
                    value={newDepartment.email}
                    onChange={handleInputChange}
                    placeholder="person@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department Head</label>
                  <Input
                    name="head"
                    value={newDepartment.head}
                    onChange={handleInputChange}
                    placeholder="Search employee"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department Code</label>
                  <Input
                    name="code"
                    value={newDepartment.code}
                    onChange={handleInputChange}
                    placeholder="e.g., HR-001"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleAddDepartment}>Save</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Head of Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Group Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No. of Employees
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {departments.map((department) => (
              <tr key={department.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {department.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {department.code}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      {department.head.image ? (
                        <AvatarImage src={department.head.image} alt={department.head.name} />
                      ) : (
                        <AvatarFallback className="bg-gray-100 text-gray-600">
                          {department.head.initials}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="text-sm font-medium text-gray-900">
                      {department.head.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {department.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {department.employeesCount}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/organization/departments/${department.id}`}>
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/organization/departments/${department.id}?edit=true`}>
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteDepartment(department.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Departments;
