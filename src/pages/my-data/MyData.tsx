
import React from 'react';
import MainLayout from '@/components/MainLayout';

const MyData: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">My Data</h1>
        <p>This page will contain your personal data and information.</p>
      </div>
    </MainLayout>
  );
};

export default MyData;
