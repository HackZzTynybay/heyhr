
import React from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';

const OrganizationLayout: React.FC = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default OrganizationLayout;
