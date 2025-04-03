
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Filter, Search, MapPin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Employee {
  id: string;
  name: string;
  title: string;
  department: string;
  location: string;
  email: string;
  image?: string;
  initials: string;
  status: 'active' | 'inactive' | 'invited';
}

const EmployeesDirectory: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  
  // Mock employees data
  const employees: Employee[] = [
    {
      id: 'emp-1',
      name: 'Sarah Anderson',
      title: 'Senior Product Designer',
      department: 'Engineering',
      location: 'New York',
      email: 'sarah.a@company.com',
      initials: 'SA',
      status: 'active'
    },
    {
      id: 'emp-2',
      name: 'Sarah Anderson',
      title: 'Senior Product Designer',
      department: 'Engineering',
      location: 'Remote',
      email: 'sarah.a@company.com',
      initials: 'SA',
      status: 'inactive'
    },
    {
      id: 'emp-3',
      name: 'Sarah Anderson',
      title: 'Senior Product Designer',
      department: 'Engineering',
      location: 'New York',
      email: 'sarah.a@company.com',
      initials: 'SA',
      status: 'invited'
    }
  ];
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'inactive':
        return 'bg-amber-100 text-amber-700';
      case 'invited':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <h1 className="font-medium">Organization</h1>
          <span>/</span>
          <h1 className="font-medium">Employees Directory</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search employees..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-10 w-48 h-9"
            />
          </div>
          
          <Sheet open={showFilter} onOpenChange={setShowFilter}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter</SheetTitle>
              </SheetHeader>
              <div className="py-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Department</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All departments</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Location</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All locations</SelectItem>
                      <SelectItem value="nyc">New York</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Job Title</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All job titles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All job titles</SelectItem>
                      <SelectItem value="designer">Designer</SelectItem>
                      <SelectItem value="developer">Developer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Employment Type</label>
                  <Select defaultValue="fulltime">
                    <SelectTrigger>
                      <SelectValue placeholder="Full-time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fulltime">Full time</SelectItem>
                      <SelectItem value="parttime">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Status</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="invited">Invited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-6">
                <SheetClose asChild>
                  <Button variant="outline">Reset</Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button>Apply</Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
          
          <Button asChild size="sm" className="flex items-center gap-1">
            <Link to="/organization/employees/add">
              <Plus className="h-4 w-4" />
              <span>Add Employees</span>
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {employees.map((employee) => (
          <div 
            key={employee.id}
            className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex items-center mb-4">
              <Avatar className="h-12 w-12 mr-3">
                {employee.image ? (
                  <AvatarImage src={employee.image} alt={employee.name} />
                ) : (
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {employee.initials}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <h3 className="font-medium">{employee.name}</h3>
                <p className="text-sm text-gray-600">{employee.title}</p>
                <p className="text-xs text-gray-500">{employee.department}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{employee.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span>{employee.email}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(employee.status)}`}>
                {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesDirectory;
