
import React from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';

const OrganizationLayout: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-blue-600">Organization</h1>
        </div>
        <Outlet />
      </div>
    </MainLayout>
  );
};

export default OrganizationLayout;
