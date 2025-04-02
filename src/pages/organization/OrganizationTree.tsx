
import React, { useState } from 'react';
import { Filter, Download, Search, Plus, Minus } from 'lucide-react';
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

interface Employee {
  id: string;
  name: string;
  title: string;
  department: string;
  image?: string;
  initials: string;
  directReports: Employee[];
}

const OrganizationTree: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [zoom, setZoom] = useState(100);
  
  // Mock organization data
  const orgStructure: Employee[] = [
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
          directReports: []
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
          directReports: []
        }
      ]
    }
  ];
  
  const renderEmployee = (employee: Employee) => {
    const hasDirectReports = employee.directReports.length > 0;
    
    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center mb-1">
          <Avatar className="h-16 w-16 mb-1">
            {employee.image ? (
              <AvatarImage src={employee.image} alt={employee.name} />
            ) : (
              <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                {employee.initials}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="text-center">
            <p className="font-medium text-sm">{employee.name}</p>
            <p className="text-xs text-gray-600">{employee.title}</p>
            <p className="text-xs text-gray-500">{employee.department}</p>
          </div>
        </div>
        
        {hasDirectReports && (
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
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <h1 className="font-medium">Organization</h1>
          <span>/</span>
          <h1 className="font-medium">Organization Tree</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search employee..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-10 w-48 h-9"
            />
          </div>
          
          <Sheet>
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
            <Download className="h-4 w-4 mr-1" />
            <span>Download</span>
          </Button>
        </div>
      </div>
      
      <Card className="p-6 shadow-sm bg-white min-h-[500px] overflow-x-auto">
        <div className="flex justify-end mb-4 space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setZoom(prev => Math.min(prev + 10, 150))}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setZoom(prev => Math.max(prev - 10, 60))}
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex justify-center min-w-[800px]" style={{ zoom: `${zoom}%` }}>
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
