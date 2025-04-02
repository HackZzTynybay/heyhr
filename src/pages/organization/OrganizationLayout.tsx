
import React from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';

const OrganizationLayout: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-6 w-full max-w-7xl mx-auto">
        <Outlet />
      </div>
    </MainLayout>
  );
};

export default OrganizationLayout;
