
import React from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from '@/components/MainLayout.jsx';

const OrganizationLayout = () => {
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
