
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { UserSidebar } from "./components/UserSidebar";
import DirectionImplementations from "./pages/DirectionImplementations";
import ImplementationDetails from "./pages/ImplementationDetails";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [selectedDirection, setSelectedDirection] = useState('administracion');
  const [isAdminView, setIsAdminView] = useState(true);
  const [employeeData, setEmployeeData] = useState({
    nombre: 'Oscar Arredondo',
    numeroEmpleado: '793',
    direccion: 'Tecnología y Sistemas'
  });

  const handleDirectionSelect = (directionId: string) => {
    setSelectedDirection(directionId);
  };

  const handleToggleView = () => {
    setIsAdminView(!isAdminView);
  };

  const handleEmployeeUpdate = (field: keyof typeof employeeData, value: string) => {
    setEmployeeData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <BrowserRouter>
              {isAdminView ? (
                <AppSidebar 
                  onDirectionSelect={handleDirectionSelect}
                  selectedDirection={selectedDirection}
                  onToggleView={handleToggleView}
                />
              ) : (
                <UserSidebar 
                  employeeData={employeeData}
                  onEmployeeUpdate={handleEmployeeUpdate}
                  onToggleView={handleToggleView}
                />
              )}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Navigate to="/directions/administracion" replace />} />
                  <Route path="/directions/:direction" element={<DirectionImplementations />} />
                  <Route path="/:direction/:implementationIndex" element={<ImplementationDetails />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </BrowserRouter>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
