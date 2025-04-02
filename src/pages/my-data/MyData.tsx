
import React from 'react';
import MainLayout from '@/components/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, Calendar, MapPin } from 'lucide-react';

const MyData: React.FC = () => {
  // Mock user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dob: 'January 15, 1985',
    address: '123 Main St, New York, NY 10001',
    department: 'Engineering',
    position: 'Senior Developer',
    joiningDate: 'March 10, 2020'
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-blue-600">My Data</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1 shadow-sm border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-blue-600">Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{userData.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <Mail className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <Phone className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{userData.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{userData.dob}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <MapPin className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{userData.address}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-2 shadow-sm border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-blue-600">Employment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Department</p>
                  <p className="font-medium text-blue-700">{userData.department}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Position</p>
                  <p className="font-medium">{userData.position}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Joining Date</p>
                  <p className="font-medium">{userData.joiningDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default MyData;
