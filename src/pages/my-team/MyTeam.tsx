
import React from 'react';
import MainLayout from '@/components/MainLayout';

const MyTeam: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">My Team</h1>
        <p>This page will display your team members and related information.</p>
      </div>
    </MainLayout>
  );
};

export default MyTeam;
