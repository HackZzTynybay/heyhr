
import React from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';

const OrganizationLayout: React.FC = () => {
  return (
    <MainLayout>
      <div className="relative flex w-full max-w-7xl mx-auto">
        {/* Main content */}
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
};

export default OrganizationLayout;
