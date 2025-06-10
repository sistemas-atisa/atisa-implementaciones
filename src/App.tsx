
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { UserSidebar } from "./components/UserSidebar";
import DirectionImplementations from "./pages/DirectionImplementations";
import MyImplementations from "./pages/MyImplementations";
import ImplementationDetails from "./pages/ImplementationDetails";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [selectedDirection, setSelectedDirection] = useState('administracion');
  const [isAdminView, setIsAdminView] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
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
    // Reset login state when switching to user view
    if (isAdminView) {
      setIsUserLoggedIn(false);
    }
  };

  const handleEmployeeUpdate = (field: keyof typeof employeeData, value: string) => {
    setEmployeeData(prev => ({ ...prev, [field]: value }));
  };

  const handleUserLogin = () => {
    setIsUserLoggedIn(true);
  };

  // Component for blank page when user is not logged in
  const BlankUserPage = () => (
    <div className="flex-1 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-center">
          <img 
            src="https://i.postimg.cc/FFfbvfHy/ATISA-Group-Color-page-0001.png" 
            alt="ATISA Group Logo" 
            className="h-8 md:h-10 object-contain"
          />
        </div>
      </div>
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500 text-lg">Por favor, accede para ver tu contenido</p>
      </div>
    </div>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={
                  isAdminView ? 
                    <Navigate to="/directions/administracion" replace /> : 
                    <Navigate to="/my-implementations" replace />
                } />
                <Route path="/directions/:direction" element={
                  <div className="flex w-full">
                    <AppSidebar 
                      onDirectionSelect={handleDirectionSelect}
                      selectedDirection={selectedDirection}
                      onToggleView={handleToggleView}
                      isAdminView={isAdminView}
                    />
                    <main className="flex-1">
                      <DirectionImplementations />
                    </main>
                  </div>
                } />
                <Route path="/my-implementations" element={
                  <div className="flex w-full">
                    <UserSidebar 
                      employeeData={employeeData}
                      onEmployeeUpdate={handleEmployeeUpdate}
                      onToggleView={handleToggleView}
                      isLoggedIn={isUserLoggedIn}
                      onLogin={handleUserLogin}
                    />
                    <main className="flex-1">
                      {isUserLoggedIn ? <MyImplementations /> : <BlankUserPage />}
                    </main>
                  </div>
                } />
                <Route path="/:direction/:implementationIndex" element={
                  <ImplementationDetails isAdminView={isAdminView} isUserLoggedIn={isUserLoggedIn} />
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
