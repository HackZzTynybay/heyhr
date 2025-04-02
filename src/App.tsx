
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/edit-email" element={<EditEmail />} />
            <Route path="/set-password" element={<SetPassword />} />
            <Route path="/setup/departments" element={<SetupDepartments />} />
            <Route path="/setup/roles" element={<SetupRoles />} />
            <Route path="/setup/employees" element={<SetupEmployees />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
