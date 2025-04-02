
import React from 'react';
import MainLayout from '@/components/MainLayout';

const Assets: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Assets</h1>
        <p>This page will display company assets and inventory information.</p>
      </div>
    </MainLayout>
  );
};

export default Assets;
