
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const AddEmployee: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic-details');
  const [showManualDialog, setShowManualDialog] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    employeeNumber: '',
    maritalStatus: '',
    officialEmail: '',
    personalEmail: '',
    phoneNumber: '',
    permanentAddress: '',
    currentAddress: '',
    dateOfJoining: '',
    employmentType: '',
    workMode: '',
    jobTitle: '',
    department: '',
    workerType: '',
    hrRepresentative: '',
    probationPolicy: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setEmployeeData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleContinue = () => {
    setActiveTab('employment-details');
  };
  
  const handleBack = () => {
    setActiveTab('basic-details');
  };
  
  const handleSubmit = () => {
    toast({
      title: "Employee added",
      description: "The employee has been successfully added."
    });
    navigate('/organization/employees');
  };
  
  const handleCancel = () => {
    navigate('/organization/employees');
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <h1 className="font-medium">Organization</h1>
          <span>/</span>
          <h1 className="font-medium">Employees Directory</h1>
        </div>
      </div>
      
      <Dialog open={showManualDialog} onOpenChange={setShowManualDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Add Employees</DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="basic-details" className="relative">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white mr-2">
                    1
                  </div>
                  <span>Basic Details</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="employment-details">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-600 mr-2">
                    2
                  </div>
                  <span>Employment Details</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic-details">
              <div className="space-y-4">
                <h3 className="font-medium mb-2">Employee Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">First Name*</label>
                    <Input
                      name="firstName"
                      value={employeeData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Last Name*</label>
                    <Input
                      name="lastName"
                      value={employeeData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Gender*</label>
                  <Select 
                    value={employeeData.gender} 
                    onValueChange={value => handleSelectChange('gender', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Date of Birth</label>
                  <Input
                    name="dateOfBirth"
                    type="date"
                    value={employeeData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Employee Number</label>
                  <Input
                    name="employeeNumber"
                    value={employeeData.employeeNumber}
                    onChange={handleInputChange}
                    placeholder="Enter employee number"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Marital Status</label>
                  <Select 
                    value={employeeData.maritalStatus} 
                    onValueChange={value => handleSelectChange('maritalStatus', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <h3 className="font-medium mt-6 mb-2">Contact Details</h3>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Official Email*</label>
                  <Input
                    name="officialEmail"
                    type="email"
                    value={employeeData.officialEmail}
                    onChange={handleInputChange}
                    placeholder="Enter official email"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Personal Email</label>
                  <Input
                    name="personalEmail"
                    type="email"
                    value={employeeData.personalEmail}
                    onChange={handleInputChange}
                    placeholder="Enter personal email"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input
                    name="phoneNumber"
                    value={employeeData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Permanent Address</label>
                  <Input
                    name="permanentAddress"
                    value={employeeData.permanentAddress}
                    onChange={handleInputChange}
                    placeholder="Enter permanent address"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Current Address</label>
                  <Input
                    name="currentAddress"
                    value={employeeData.currentAddress}
                    onChange={handleInputChange}
                    placeholder="Enter current address"
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button onClick={handleContinue}>Next</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="employment-details">
              <div className="space-y-4">
                <h3 className="font-medium mb-2">Employment Details</h3>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Date of Joining*</label>
                  <Input
                    name="dateOfJoining"
                    type="date"
                    value={employeeData.dateOfJoining}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Employment Type*</label>
                  <Select 
                    value={employeeData.employmentType} 
                    onValueChange={value => handleSelectChange('employmentType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fulltime">Full-time</SelectItem>
                      <SelectItem value="parttime">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Work Mode</label>
                  <Select 
                    value={employeeData.workMode} 
                    onValueChange={value => handleSelectChange('workMode', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Job Title*</label>
                  <Input
                    name="jobTitle"
                    value={employeeData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="Enter job title"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Department*</label>
                  <Select 
                    value={employeeData.department} 
                    onValueChange={value => handleSelectChange('department', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Worker Type</label>
                  <Select 
                    value={employeeData.workerType} 
                    onValueChange={value => handleSelectChange('workerType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">HR Representative</label>
                  <Select 
                    value={employeeData.hrRepresentative} 
                    onValueChange={value => handleSelectChange('hrRepresentative', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rep1">Select</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Employee Probation Policy</label>
                  <Select 
                    value={employeeData.probationPolicy} 
                    onValueChange={value => handleSelectChange('probationPolicy', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="policy1">Select</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={handleBack}>Back</Button>
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 flex flex-col items-center justify-center"
        >
          <div className="mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <h3 className="text-lg font-medium mb-2">CSV Import</h3>
          <p className="text-gray-600 text-center mb-6">
            Upload your employee data using our CSV template
          </p>
          
          <div className="w-full border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500 mb-4">
            Drag and drop your CSV file<br />
            or click to browse
          </div>
          
          <Button variant="link" className="text-blue-600">
            Download sample
          </Button>
        </div>
        
        <div 
          className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 flex flex-col items-center justify-center"
        >
          <div className="mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              <UserPlus className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <h3 className="text-lg font-medium mb-2">Add Manually</h3>
          <p className="text-gray-600 text-center mb-6">
            Add employees one by one manually
          </p>
          
          <Button 
            onClick={() => setShowManualDialog(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add Employee
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
