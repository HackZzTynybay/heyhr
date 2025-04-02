
import React from 'react';
import MainLayout from '@/components/MainLayout';

const Settings: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Settings</h1>
        <p>This page will contain various application settings and configurations.</p>
      </div>
    </MainLayout>
  );
};

export default Settings;
