
import React from 'react';
import MainLayout from '@/components/MainLayout.jsx';
import {
  CheckCircle,
  Clock,
  DollarSign,
  Plus,
  Users,
  X,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx';

const Dashboard = () => {
  // Mock data for the dashboard
  const stats = [
    { 
      title: 'Total Employees',
      value: '245',
      icon: <Users className="h-5 w-5 text-blue-600" />
    },
    { 
      title: 'New Hires',
      value: '02',
      icon: <Users className="h-5 w-5 text-blue-600" />
    },
    { 
      title: 'Leave Approvals',
      value: '01',
      icon: <Clock className="h-5 w-5 text-blue-600" />
    },
    { 
      title: 'Reimbursement',
      value: '03',
      icon: <DollarSign className="h-5 w-5 text-blue-600" />
    }
  ];

  const approvals = [
    {
      id: 1,
      name: 'Michael Stark',
      role: 'Casual leave - Mar 19',
      initials: 'MS',
      status: 'pending'
    },
    {
      id: 2,
      name: 'Michael Stark',
      role: 'Reimbursement',
      initials: 'MS',
      amount: '$600',
      status: 'pending'
    },
    {
      id: 3,
      name: 'Michael Stark',
      role: 'Reimbursement',
      initials: 'MS',
      amount: '$450',
      status: 'pending'
    },
    {
      id: 4,
      name: 'Michael Stark',
      role: 'Reimbursement',
      initials: 'MS',
      amount: '$900',
      status: 'pending'
    }
  ];

  const quickLinks = [
    { title: 'View Employee Directory', url: '/organization/employees' },
    { title: 'Apply for Leave', url: '/my-data/leave' },
    { title: 'Upcoming Holidays', url: '/my-data/holidays' },
    { title: 'Submit Reimbursement', url: '/my-data/reimbursement' }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-blue-600">Dashboard</h1>
          <Button variant="outline" size="sm" className="flex items-center gap-2 border-blue-200 text-blue-600">
            <Plus className="h-4 w-4" />
            <span>Widget</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-sm border-blue-100">
              <CardContent className="pt-6">
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                    <p className="text-3xl font-semibold text-blue-700">{stat.value}</p>
                  </div>
                  <div className="mt-1">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-sm border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-blue-600">Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {approvals.map((approval) => (
                  <div key={approval.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-blue-100 text-blue-600">{approval.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{approval.name}</p>
                        <div className="flex items-center">
                          <span className="text-xs text-blue-500">{approval.role}</span>
                          {approval.amount && (
                            <span className="text-xs text-gray-600 ml-2"> • Amount: {approval.amount}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                      <button className="p-1 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors">
                        <Check className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-blue-600">Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-blue-50 transition-colors border border-blue-100"
                  >
                    <div className="p-1 rounded bg-blue-50">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 text-blue-600" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M13 7l5 5m0 0l-5 5m5-5H6" 
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-blue-700">{link.title}</span>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
