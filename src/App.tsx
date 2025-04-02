import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import NotFound from "./pages/NotFound";

import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import EditEmail from "./pages/EditEmail";
import SetPassword from "./pages/SetPassword";
import SetupDepartments from "./pages/setup/Departments";
import SetupRoles from "./pages/setup/Roles";
import SetupEmployees from "./pages/setup/Employees";
import Dashboard from "./pages/Dashboard";

// Organization pages
import OrganizationLayout from "./pages/organization/OrganizationLayout";
import Departments from "./pages/organization/Departments";
import DepartmentDetails from "./pages/organization/DepartmentDetails";
import Roles from "./pages/organization/Roles";
import RoleDetails from "./pages/organization/RoleDetails";
import OrganizationTree from "./pages/organization/OrganizationTree";
import EmployeesDirectory from "./pages/organization/EmployeesDirectory";
import AddEmployee from "./pages/organization/AddEmployee";

// Other sections
import MyData from "./pages/my-data/MyData";
import MyTeam from "./pages/my-team/MyTeam";
import Attendance from "./pages/attendance/Attendance";
import Payroll from "./pages/payroll/Payroll";
import Reports from "./pages/reports/Reports";
import Assets from "./pages/assets/Assets";
import Settings from "./pages/settings/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/edit-email" element={<EditEmail />} />
            <Route path="/set-password" element={<SetPassword />} />
            <Route path="/setup/departments" element={<SetupDepartments />} />
            <Route path="/setup/roles" element={<SetupRoles />} />
            <Route path="/setup/employees" element={<SetupEmployees />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* My sections */}
            <Route path="/my-data" element={<MyData />} />
            <Route path="/my-team" element={<MyTeam />} />
            
            {/* Organization section */}
            <Route path="/organization" element={<OrganizationLayout />}>
              <Route path="tree" element={<OrganizationTree />} />
              <Route path="departments" element={<Departments />} />
              <Route path="departments/:id" element={<DepartmentDetails />} />
              <Route path="roles" element={<Roles />} />
              <Route path="roles/:id" element={<RoleDetails />} />
              <Route path="employees" element={<EmployeesDirectory />} />
              <Route path="employees/add" element={<AddEmployee />} />
            </Route>
            
            {/* Other main sections */}
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/settings" element={<Settings />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
