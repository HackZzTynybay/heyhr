
import React from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';

const OrganizationLayout: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <Outlet />
      </div>
    </MainLayout>
  );
};

export default OrganizationLayout;
