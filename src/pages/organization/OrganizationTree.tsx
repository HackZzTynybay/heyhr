
import React, { useState } from 'react';
import { Filter, Download, Search, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Employee {
  id: string;
  name: string;
  title: string;
  department: string;
  image?: string;
  initials: string;
  directReports: Employee[];
  collapsed?: boolean;
}

const OrganizationTree: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [zoom, setZoom] = useState(100);
  
  // Mock organization data
  const [orgStructure, setOrgStructure] = useState<Employee[]>([
    {
      id: '1',
      name: 'John Doe',
      title: 'CEO',
      department: 'Head Administrator',
      initials: 'JD',
      directReports: [
        {
          id: '2',
          name: 'Darrell Steward',
          title: 'Tech Lead',
          department: 'Engineering',
          initials: 'DS',
          directReports: [
            {
              id: '5',
              name: 'Cameron Williamson',
              title: 'Frontend Developer',
              department: 'Engineering',
              initials: 'CW',
              directReports: []
            },
            {
              id: '6',
              name: 'Leslie Alexander',
              title: 'Backend Developer',
              department: 'Engineering',
              initials: 'LA',
              directReports: []
            }
          ]
        },
        {
          id: '3',
          name: 'Jerome Bell',
          title: 'Tech Lead',
          department: 'Engineering',
          initials: 'JB',
          directReports: []
        },
        {
          id: '4',
          name: 'Wade Warren',
          title: 'Design Manager',
          department: 'Design',
          initials: 'WW',
          directReports: [
            {
              id: '7',
              name: 'Esther Howard',
              title: 'UI Designer',
              department: 'Design',
              initials: 'EH',
              directReports: []
            }
          ]
        }
      ]
    }
  ]);
  
  const toggleCollapsed = (id: string) => {
    const toggleNode = (employees: Employee[]): Employee[] => {
      return employees.map(emp => {
        if (emp.id === id) {
          return { ...emp, collapsed: !emp.collapsed };
        }
        if (emp.directReports.length > 0) {
          return { ...emp, directReports: toggleNode(emp.directReports) };
        }
        return emp;
      });
    };
    
    setOrgStructure(toggleNode(orgStructure));
  };
  
  const renderEmployee = (employee: Employee) => {
    const hasDirectReports = employee.directReports.length > 0;
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="flex flex-col items-center mb-1 relative">
            <div className="relative">
              <Avatar className="h-16 w-16 mb-1 border-2 border-blue-100 bg-white">
                {employee.image ? (
                  <AvatarImage src={employee.image} alt={employee.name} />
                ) : (
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                    {employee.initials}
                  </AvatarFallback>
                )}
              </Avatar>
              {hasDirectReports && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute -bottom-1 -right-1 rounded-full h-6 w-6 p-0 border border-gray-200 bg-white"
                  onClick={() => toggleCollapsed(employee.id)}
                >
                  {employee.collapsed ? 
                    <ChevronDown className="h-3 w-3" /> : 
                    <ChevronUp className="h-3 w-3" />
                  }
                </Button>
              )}
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <div className="text-center cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-md">
                  <p className="font-medium text-sm">{employee.name}</p>
                  <p className="text-xs text-gray-600">{employee.title}</p>
                  <p className="text-xs text-gray-500">{employee.department}</p>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <div className="flex items-start p-4">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {employee.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{employee.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{employee.title}</p>
                    <p className="text-xs text-gray-500">{employee.department}</p>
                    
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs h-7">
                        Message
                      </Button>
                      <Button size="sm" className="text-xs h-7">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {hasDirectReports && !employee.collapsed && (
          <>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="relative flex">
              <div className="absolute top-0 left-1/2 w-px h-6 -translate-x-1/2 bg-gray-300"></div>
              <div className="flex gap-16 pt-6">
                {employee.directReports.map((report) => (
                  <div key={report.id} className="relative">
                    <div className="absolute top-0 left-1/2 w-px h-6 -translate-x-1/2 bg-gray-300"></div>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gray-300"></div>
                    {renderEmployee(report)}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search employee..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
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
                      <SelectItem value="sales">Sales</SelectItem>
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
                      <SelectItem value="sf">San Francisco</SelectItem>
                      <SelectItem value="la">Los Angeles</SelectItem>
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
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="lead">Lead</SelectItem>
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
                      <SelectItem value="fulltime">Full-time</SelectItem>
                      <SelectItem value="parttime">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
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
          
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1 sm:mr-0" />
            <span className="hidden sm:inline ml-1">Download</span>
          </Button>

          <div className="flex items-center border rounded-md">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setZoom(prev => Math.max(prev - 10, 60))}
              className="px-2"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-xs px-1">{zoom}%</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setZoom(prev => Math.min(prev + 10, 150))}
              className="px-2"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <Card className="p-4 sm:p-6 shadow-sm bg-white min-h-[500px] overflow-x-auto">
        <div className="flex justify-center min-w-[800px] pt-4" style={{ zoom: `${zoom}%` }}>
          {orgStructure.map(employee => (
            <div key={employee.id} className="pt-6">
              {renderEmployee(employee)}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default OrganizationTree;
