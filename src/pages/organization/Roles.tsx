
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Plus, MoreVertical, Search, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger
} from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from '@/components/ui/use-toast';

interface Role {
  id: string;
  name: string;
  description?: string;
  employeesCount: number;
  permissionsCount: number | string;
  isDefault?: boolean;
}

const Roles: React.FC = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'default';
  const [searchText, setSearchText] = useState('');
  const [showAddRole, setShowAddRole] = useState(false);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissionTemplate: '',
  });
  
  // Mock roles data
  const [defaultRoles, setDefaultRoles] = useState<Role[]>([
    {
      id: 'role-1',
      name: 'Super Admin',
      employeesCount: 1,
      permissionsCount: 'All permissions',
      isDefault: true
    },
    {
      id: 'role-2',
      name: 'HR Manager',
      employeesCount: 1,
      permissionsCount: 30,
      isDefault: true
    },
    {
      id: 'role-3',
      name: 'Department Manager',
      employeesCount: 4,
      permissionsCount: 12,
      isDefault: true
    },
    {
      id: 'role-4',
      name: 'Employee',
      employeesCount: 1,
      permissionsCount: 10,
      isDefault: true
    },
    {
      id: 'role-5',
      name: 'Executive',
      employeesCount: 1,
      permissionsCount: 'All permissions',
      isDefault: true
    },
    {
      id: 'role-6',
      name: 'Finance Manager',
      employeesCount: 4,
      permissionsCount: 10,
      isDefault: true
    }
  ]);
  
  const [customRoles, setCustomRoles] = useState<Role[]>([
    {
      id: 'role-7',
      name: 'Project Manager',
      description: 'Manages project resources and timelines',
      employeesCount: 5,
      permissionsCount: 24,
      isDefault: false
    }
  ]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRole(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTemplateChange = (value: string) => {
    setNewRole(prev => ({ ...prev, permissionTemplate: value }));
  };
  
  const handleAddRole = () => {
    // In a real app, you would validate and send this to an API
    const newRoleId = `role-${Date.now()}`;
    
    const roleToAdd: Role = {
      id: newRoleId,
      name: newRole.name,
      description: newRole.description,
      employeesCount: 0,
      permissionsCount: 0,
      isDefault: false
    };
    
    setCustomRoles(prev => [...prev, roleToAdd]);
    setNewRole({
      name: '',
      description: '',
      permissionTemplate: '',
    });
    setShowAddRole(false);
    
    toast({
      title: "Role added",
      description: `${roleToAdd.name} has been successfully added.`
    });
  };
  
  const handleDeleteRole = (id: string, isDefault: boolean = false) => {
    if (isDefault) {
      setDefaultRoles(prev => prev.filter(role => role.id !== id));
    } else {
      setCustomRoles(prev => prev.filter(role => role.id !== id));
    }
    
    toast({
      title: "Role deleted",
      description: "The role has been successfully deleted."
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <h1 className="font-medium">Organization</h1>
          <span>/</span>
          <h1 className="font-medium">Roles</h1>
          {activeTab === 'default' && <span>/</span>}
          {activeTab === 'default' && <h1 className="font-medium">Default Roles</h1>}
          {activeTab === 'custom' && <span>/</span>}
          {activeTab === 'custom' && <h1 className="font-medium">Custom Roles</h1>}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search roles..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-10 w-48 h-9"
            />
          </div>
          
          {activeTab === 'custom' && (
            <Dialog open={showAddRole} onOpenChange={setShowAddRole}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Add Role</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Role</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role Name*</label>
                    <Input
                      name="name"
                      value={newRole.name}
                      onChange={handleInputChange}
                      placeholder="Enter role name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                      name="description"
                      value={newRole.description}
                      onChange={handleInputChange}
                      placeholder="Enter description"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="templateChoice"
                          name="permissionType"
                          type="radio"
                          defaultChecked
                          className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="templateChoice" className="font-medium text-gray-700">
                          Existing permission template
                        </label>
                      </div>
                    </div>
                    
                    <select 
                      value={newRole.permissionTemplate}
                      onChange={(e) => handleTemplateChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select</option>
                      {defaultRoles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="customChoice"
                        name="permissionType"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="customChoice" className="font-medium text-gray-700">
                        Choose your own set of permissions
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleAddRole}>Save</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      
      <Tabs defaultValue={activeTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="default" asChild>
            <Link to="/organization/roles?tab=default">Default Roles</Link>
          </TabsTrigger>
          <TabsTrigger value="custom" asChild>
            <Link to="/organization/roles?tab=custom">Custom Roles</Link>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="default" className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No. of Employees
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {defaultRoles.map((role) => (
                  <tr key={role.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {role.name}
                        </div>
                        {role.name === 'Super Admin' && (
                          <Lock className="ml-1 h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-center text-gray-500">
                        {role.employeesCount.toString().padStart(2, '0')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {typeof role.permissionsCount === 'number'
                          ? `${role.permissionsCount} permissions`
                          : role.permissionsCount
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/organization/roles/${role.id}`}>
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/organization/roles/${role.id}?edit=true`}>
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          {role.name !== 'Super Admin' && (
                            <DropdownMenuItem onClick={() => handleDeleteRole(role.id, true)}>
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No. of Employees
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customRoles.map((role) => (
                  <tr key={role.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {role.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-center text-gray-500">
                        {role.employeesCount.toString().padStart(2, '0')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {typeof role.permissionsCount === 'number'
                          ? `${role.permissionsCount} permissions`
                          : role.permissionsCount
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/organization/roles/${role.id}`}>
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/organization/roles/${role.id}?edit=true`}>
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteRole(role.id)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Roles;
