import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, User } from 'lucide-react';
import { AppSidebar } from '@/components/AppSidebar';
import { UserSidebar } from '@/components/UserSidebar';
import ProjectHeader from '@/components/ProjectHeader';
import UserProjectHeader from '@/components/UserProjectHeader';
import AdminProjectHeader from '@/components/AdminProjectHeader';
import M6Table from '@/components/M6Table';
import UserM6Table from '@/components/UserM6Table';
import AdminM6Table from '@/components/AdminM6Table';
import CostSummary from '@/components/CostSummary';
import CommentsSection from '@/components/CommentsSection';
import SixMsAnalysis from '@/components/SixMsAnalysis';
import { SectionData, ProjectHeaderData } from '@/types/project';
import { implementacionesData } from '@/data/implementaciones';

interface ImplementationDetailsProps {
  isAdminView: boolean;
  isUserLoggedIn: boolean;
  onToggleView: () => void;
  employeeData: {
    nombre: string;
    numeroEmpleado: string;
    direccion: string;
  };
  onEmployeeUpdate: (field: keyof any, value: string) => void;
  onUserLogin: () => void;
  isAdminAuthenticated: boolean;
}

const ImplementationDetails: React.FC<ImplementationDetailsProps> = ({ 
  isAdminView,
  isUserLoggedIn,
  onToggleView,
  employeeData,
  onEmployeeUpdate,
  onUserLogin,
  isAdminAuthenticated
}) => {
  const { direction, implementationIndex } = useParams<{ direction: string; implementationIndex: string }>();
  const navigate = useNavigate();
  const [expandedTable, setExpandedTable] = useState<'implementacion' | 'operacion' | null>(null);
  
  // Debug logging
  console.log('🔍 ImplementationDetails Debug:');
  console.log('- isAdminView:', isAdminView);
  console.log('- isAdminAuthenticated:', isAdminAuthenticated);
  console.log('- direction:', direction);
  console.log('- implementationIndex:', implementationIndex);
  console.log('- Current URL:', window.location.pathname);
  
  // Store the EXACT values that appear in the table inputs (without conversions)
  const [tiempoImplementacionTable, setTiempoImplementacionTable] = useState(0);
  const [tiempoOperacionTable, setTiempoOperacionTable] = useState(0);
  const [montoTotalImplementacion, setMontoTotalImplementacion] = useState(0);
  const [montoTotalOperacion, setMontoTotalOperacion] = useState(0);
  
  // Add state for tracking time units for each table
  const [implementacionTimeUnit, setImplementacionTimeUnit] = useState<string>('días');
  const [operacionTimeUnit, setOperacionTimeUnit] = useState<string>('días');

  // Access control: Check if user can access this implementation
  useEffect(() => {
    // If in admin view but not authenticated, redirect
    if (isAdminView && !isAdminAuthenticated) {
      console.log('❌ Admin view requested but not authenticated, redirecting to user view');
      navigate('/my-implementations');
      return;
    }

    // If user view but not logged in, redirect to my-implementations
    if (!isAdminView && !isUserLoggedIn) {
      console.log('❌ User not logged in, redirecting to my-implementations');
      navigate('/my-implementations');
      return;
    }

    // For user view: allow access to any implementation when accessed from /my-implementations
    // The key insight is that users should be able to view their assigned implementations
    // regardless of which direction they're technically under
    console.log('✅ Access granted for user view');
  }, [isAdminView, isAdminAuthenticated, isUserLoggedIn, navigate]);

  // Load data when direction or implementation index changes
  useEffect(() => {
    if (direction && implementationIndex) {
      const implementations = implementacionesData[direction as keyof typeof implementacionesData];
      const index = parseInt(implementationIndex);
      
      if (implementations && implementations[index]) {
        const currentImpl = implementations[index];
        setHeaderData(currentImpl.header);
        setImplementacion(currentImpl.implementacion);
        setOperacion(currentImpl.operacion);
      }
    }
  }, [direction, implementationIndex]);

  // Calculate totals automatically
  useEffect(() => {
    const calcMontoImpl = Object.values(implementacion).reduce((sum, item) => sum + (item.monto || 0), 0);
    const calcMontoOp = Object.values(operacion).reduce((sum, item) => sum + (item.monto || 0), 0);
    
    setMontoTotalImplementacion(calcMontoImpl);
    setMontoTotalOperacion(calcMontoOp);
  }, [implementacion, operacion]);

  const updateHeaderData = (field: keyof ProjectHeaderData, value: string) => {
    // Only allow updates in user view
    if (!isAdminView) {
      setHeaderData(prev => ({ ...prev, [field]: value }));
    }
  };

  const updateImplementacion = (category: keyof SectionData, field: keyof SectionData[keyof SectionData], value: string | number) => {
    // Only allow updates in user view
    if (!isAdminView) {
      setImplementacion(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [field]: value
        }
      }));
    }
  };

  const updateOperacion = (category: keyof SectionData, field: keyof SectionData[keyof SectionData], value: string | number) => {
    // Only allow updates in user view
    if (!isAdminView) {
      setOperacion(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [field]: value
        }
      }));
    }
  };

  const handleToggleView = () => {
    console.log('🔄 Toggling view from:', isAdminView ? 'Admin' : 'User');
    onToggleView();
  };

  const handleExpandTable = (tableType: 'implementacion' | 'operacion') => {
    setExpandedTable(expandedTable === tableType ? null : tableType);
  };

  // Remove the restrictive access control that was causing the redirect loop
  // Users should be able to access their implementations regardless of direction

  console.log('🎨 Rendering components:');
  console.log('- Header component:', isAdminView ? 'AdminProjectHeader' : 'UserProjectHeader');
  console.log('- Table component:', isAdminView ? 'AdminM6Table' : 'UserM6Table');

  return (
    <div className="flex w-full min-h-screen">
      {isAdminView ? (
        <AppSidebar 
          onDirectionSelect={() => {}}
          selectedDirection={direction || ''}
          onToggleView={handleToggleView}
          isAdminView={isAdminView}
        />
      ) : (
        <UserSidebar 
          employeeData={employeeData}
          onEmployeeUpdate={onEmployeeUpdate}
          onToggleView={handleToggleView}
          isLoggedIn={isUserLoggedIn}
          onLogin={onUserLogin}
        />
      )}
      
      <div className="flex-1 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Fixed header with sidebar trigger and ATISA logo */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <Button 
                variant="outline" 
                onClick={() => navigate(isAdminView ? `/directions/${direction}` : '/my-implementations')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {isAdminView ? 'Regresar a Lista' : 'Regresar a Mis Implementaciones'}
              </Button>
              
              {/* View Indicator Badge */}
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                isAdminView 
                  ? 'bg-red-100 text-red-800 border border-red-200' 
                  : 'bg-blue-100 text-blue-800 border border-blue-200'
              }`}>
                {isAdminView ? (
                  <>
                    <Shield className="h-4 w-4 inline mr-1" />
                    Vista Administrador
                  </>
                ) : (
                  <>
                    <User className="h-4 w-4 inline mr-1" />
                    Vista Usuario
                  </>
                )}
              </div>
            </div>
            
            {/* ATISA Logo - Centered */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <img 
                src="https://i.postimg.cc/FFfbvfHy/ATISA-Group-Color-page-0001.png" 
                alt="ATISA Group Logo" 
                className="h-8 md:h-10 object-contain"
              />
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="max-w-full mx-auto">
            {/* Header Component - Different for Admin vs User */}
            {isAdminView ? (
              <AdminProjectHeader data={headerData} />
            ) : (
              <UserProjectHeader data={headerData} onUpdate={updateHeaderData} />
            )}

            {/* Main Tables with Expandable Layout */}
            <div className={`transition-all duration-300 ${
              expandedTable === null 
                ? 'grid grid-cols-1 xl:grid-cols-2 gap-8' 
                : 'grid grid-cols-1 gap-8'
            }`}>
              {(expandedTable === null || expandedTable === 'implementacion') && (
                isAdminView ? (
                  <AdminM6Table
                    title="Implementación"
                    data={implementacion}
                    totalTime={tiempoImplementacionTable}
                    totalCost={montoTotalImplementacion}
                    isExpanded={expandedTable === 'implementacion'}
                    onToggleExpand={() => handleExpandTable('implementacion')}
                    customTotalTime={tiempoImplementacionTable}
                  />
                ) : (
                  <UserM6Table
                    title="Implementación"
                    data={implementacion}
                    onUpdate={updateImplementacion}
                    totalTime={tiempoImplementacionTable}
                    totalCost={montoTotalImplementacion}
                    isExpanded={expandedTable === 'implementacion'}
                    onToggleExpand={() => handleExpandTable('implementacion')}
                    customTotalTime={tiempoImplementacionTable}
                    onCustomTotalTimeChange={setTiempoImplementacionTable}
                  />
                )
              )}
              
              {(expandedTable === null || expandedTable === 'operacion') && (
                isAdminView ? (
                  <AdminM6Table
                    title="Operación"
                    data={operacion}
                    totalTime={tiempoOperacionTable}
                    totalCost={montoTotalOperacion}
                    isExpanded={expandedTable === 'operacion'}
                    onToggleExpand={() => handleExpandTable('operacion')}
                    customTotalTime={tiempoOperacionTable}
                  />
                ) : (
                  <UserM6Table
                    title="Operación"
                    data={operacion}
                    onUpdate={updateOperacion}
                    totalTime={tiempoOperacionTable}
                    totalCost={montoTotalOperacion}
                    isExpanded={expandedTable === 'operacion'}
                    onToggleExpand={() => handleExpandTable('operacion')}
                    customTotalTime={tiempoOperacionTable}
                    onCustomTotalTimeChange={setTiempoOperacionTable}
                  />
                )
              )}
            </div>

            <CostSummary
              tiempoImplementacion={tiempoImplementacionTable}
              tiempoOperacion={tiempoOperacionTable}
              montoTotalImplementacion={montoTotalImplementacion}
              montoTotalOperacion={montoTotalOperacion}
              tiempoImplementacionUnit={implementacionTimeUnit}
              tiempoOperacionUnit={operacionTimeUnit}
            />

            <CommentsSection />

            <SixMsAnalysis />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImplementationDetails;
