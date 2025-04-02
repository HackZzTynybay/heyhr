
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  const { currentUser, logoutUser } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">EasyHR Dashboard</h1>
          <Button 
            onClick={logoutUser}
            variant="outline"
          >
            Logout
          </Button>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {currentUser?.userData?.user?.fullName || 'Admin'}</h2>
          <p className="text-gray-600">
            Your organization has been set up successfully! This is a simple dashboard showing your setup information.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-3">Company Information</h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-gray-500">Company Name</dt>
                <dd>{currentUser?.userData?.company?.name || 'Not specified'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Email</dt>
                <dd>{currentUser?.userData?.company?.email || 'Not specified'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Phone</dt>
                <dd>{currentUser?.userData?.company?.phone || 'Not specified'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Company ID</dt>
                <dd>{currentUser?.userData?.company?.identificationNumber || 'Not specified'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Size</dt>
                <dd>{currentUser?.userData?.company?.numberOfEmployees || 'Not specified'}</dd>
              </div>
            </dl>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-3">System Information</h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-gray-500">Departments</dt>
                <dd>{currentUser?.userData?.departments?.length || 0} departments configured</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Roles</dt>
                <dd>{currentUser?.userData?.roles?.length || 0} roles configured</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Employees</dt>
                <dd>{currentUser?.userData?.employees?.length || 0} employees added</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
