
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AppSidebar } from '@/components/AppSidebar';
import { UserSidebar } from '@/components/UserSidebar';
import ProjectHeader from '@/components/ProjectHeader';
import UserProjectHeader from '@/components/UserProjectHeader';
import M6Table from '@/components/M6Table';
import UserM6Table from '@/components/UserM6Table';
import CostSummary from '@/components/CostSummary';
import CommentsSection from '@/components/CommentsSection';
import SixMsAnalysis from '@/components/SixMsAnalysis';
import { SectionData, ProjectHeaderData } from '@/types/project';
import { implementacionesData } from '@/data/implementaciones';

interface ImplementationDetailsProps {
  isAdminView?: boolean;
  isUserLoggedIn?: boolean;
}

const ImplementationDetails: React.FC<ImplementationDetailsProps> = ({ 
  isAdminView: propIsAdminView, 
  isUserLoggedIn: propIsUserLoggedIn 
}) => {
  const { direction, implementationIndex } = useParams<{ direction: string; implementationIndex: string }>();
  const navigate = useNavigate();
  const [isAdminView, setIsAdminView] = useState(propIsAdminView ?? true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(propIsUserLoggedIn ?? false);
  const [expandedTable, setExpandedTable] = useState<'implementacion' | 'operacion' | null>(null);
  
  // Employee data for user view
  const [employeeData, setEmployeeData] = useState({
    nombre: 'Oscar Arredondo',
    numeroEmpleado: '793',
    direccion: 'Tecnología y Sistemas'
  });
  
  const [headerData, setHeaderData] = useState<ProjectHeaderData>({
    direccion: '',
    gerencia: '',
    nombreImplementacion: '',
    razon1: '',
    razon2: '',
    razon3: ''
  });
  
  const [implementacion, setImplementacion] = useState<SectionData>({
    manoDeObra: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' },
    metodologia: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' },
    medicion: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' },
    maquinaria: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' },
    materiales: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' },
    medioAmbiente: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' }
  });

  const [operacion, setOperacion] = useState<SectionData>({
    manoDeObra: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' },
    metodologia: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' },
    medicion: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' },
    maquinaria: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' },
    materiales: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' },
    medioAmbiente: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' }
  });

  // These represent the display values in the selected time unit
  const [displayTiempoImplementacion, setDisplayTiempoImplementacion] = useState(0);
  const [displayTiempoOperacion, setDisplayTiempoOperacion] = useState(0);
  const [montoTotalImplementacion, setMontoTotalImplementacion] = useState(0);
  const [montoTotalOperacion, setMontoTotalOperacion] = useState(0);
  
  // Add state for tracking time units for each table
  const [implementacionTimeUnit, setImplementacionTimeUnit] = useState<string>('días');
  const [operacionTimeUnit, setOperacionTimeUnit] = useState<string>('días');

  // Update states when props change
  useEffect(() => {
    if (propIsAdminView !== undefined) {
      setIsAdminView(propIsAdminView);
    }
    if (propIsUserLoggedIn !== undefined) {
      setIsUserLoggedIn(propIsUserLoggedIn);
    }
  }, [propIsAdminView, propIsUserLoggedIn]);

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
    setHeaderData(prev => ({ ...prev, [field]: value }));
  };

  const updateEmployeeData = (field: keyof typeof employeeData, value: string) => {
    setEmployeeData(prev => ({ ...prev, [field]: value }));
  };

  const updateImplementacion = (category: keyof SectionData, field: keyof SectionData[keyof SectionData], value: string | number) => {
    setImplementacion(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const updateOperacion = (category: keyof SectionData, field: keyof SectionData[keyof SectionData], value: string | number) => {
    setOperacion(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleToggleView = () => {
    setIsAdminView(!isAdminView);
    if (isAdminView) {
      setIsUserLoggedIn(false);
    }
  };

  const handleUserLogin = () => {
    setIsUserLoggedIn(true);
  };

  const handleExpandTable = (tableType: 'implementacion' | 'operacion') => {
    setExpandedTable(expandedTable === tableType ? null : tableType);
  };

  // If user view and not logged in, redirect to my-implementations
  if (!isAdminView && !isUserLoggedIn) {
    navigate('/my-implementations');
    return null;
  }

  // For non-admin view, redirect to My Implementations if not looking at user's own data
  if (!isAdminView && employeeData.direccion !== 'Tecnología y Sistemas') {
    navigate('/my-implementations');
    return null;
  }

  return (
    <div className="flex w-full min-h-screen">
      {isAdminView ? (
        <AppSidebar 
          onDirectionSelect={() => {}}
          selectedDirection={direction || ''}
          onToggleView={handleToggleView}
        />
      ) : (
        <UserSidebar 
          employeeData={employeeData}
          onEmployeeUpdate={updateEmployeeData}
          onToggleView={handleToggleView}
          isLoggedIn={isUserLoggedIn}
          onLogin={handleUserLogin}
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
            {isAdminView ? (
              <ProjectHeader data={headerData} onUpdate={updateHeaderData} />
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
                  <M6Table
                    title="Implementación"
                    data={implementacion}
                    onUpdate={updateImplementacion}
                    totalTime={displayTiempoImplementacion}
                    totalCost={montoTotalImplementacion}
                    isExpanded={expandedTable === 'implementacion'}
                    onToggleExpand={() => handleExpandTable('implementacion')}
                    customTotalTime={displayTiempoImplementacion}
                    onCustomTotalTimeChange={setDisplayTiempoImplementacion}
                    onTimeUnitChange={setImplementacionTimeUnit}
                  />
                ) : (
                  <UserM6Table
                    title="Implementación"
                    data={implementacion}
                    onUpdate={updateImplementacion}
                    totalTime={displayTiempoImplementacion}
                    totalCost={montoTotalImplementacion}
                    isExpanded={expandedTable === 'implementacion'}
                    onToggleExpand={() => handleExpandTable('implementacion')}
                    customTotalTime={displayTiempoImplementacion}
                    onCustomTotalTimeChange={setDisplayTiempoImplementacion}
                  />
                )
              )}
              
              {(expandedTable === null || expandedTable === 'operacion') && (
                isAdminView ? (
                  <M6Table
                    title="Operación"
                    data={operacion}
                    onUpdate={updateOperacion}
                    totalTime={displayTiempoOperacion}
                    totalCost={montoTotalOperacion}
                    isExpanded={expandedTable === 'operacion'}
                    onToggleExpand={() => handleExpandTable('operacion')}
                    customTotalTime={displayTiempoOperacion}
                    onCustomTotalTimeChange={setDisplayTiempoOperacion}
                    onTimeUnitChange={setOperacionTimeUnit}
                  />
                ) : (
                  <UserM6Table
                    title="Operación"
                    data={operacion}
                    onUpdate={updateOperacion}
                    totalTime={displayTiempoOperacion}
                    totalCost={montoTotalOperacion}
                    isExpanded={expandedTable === 'operacion'}
                    onToggleExpand={() => handleExpandTable('operacion')}
                    customTotalTime={displayTiempoOperacion}
                    onCustomTotalTimeChange={setDisplayTiempoOperacion}
                  />
                )
              )}
            </div>

            <CostSummary
              tiempoImplementacion={displayTiempoImplementacion}
              tiempoOperacion={displayTiempoOperacion}
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
