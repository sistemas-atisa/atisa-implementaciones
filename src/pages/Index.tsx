import React, { useState, useEffect } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { UserSidebar } from '@/components/UserSidebar';
import ProjectHeader from '@/components/ProjectHeader';
import UserProjectHeader from '@/components/UserProjectHeader';
import M6Table from '@/components/M6Table';
import UserM6Table from '@/components/UserM6Table';
import CostSummary from '@/components/CostSummary';
import SixMsAnalysis from '@/components/SixMsAnalysis';
import ViewToggle from '@/components/ViewToggle';
import { SectionData, ProjectHeaderData } from '@/types/project';
import { implementacionesData } from '@/data/implementaciones';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Shield } from 'lucide-react';

const Index = () => {
  const [isAdminView, setIsAdminView] = useState(true);
  const [selectedDirection, setSelectedDirection] = useState('administracion');
  const [currentImplementationIndex, setCurrentImplementationIndex] = useState(0);
  const [expandedTable, setExpandedTable] = useState<'implementacion' | 'operacion' | null>(null);
  
  // Employee data for user view
  const [employeeData, setEmployeeData] = useState({
    nombre: '',
    numeroEmpleado: '',
    direccion: ''
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

  const [tiempoImplementacion, setTiempoImplementacion] = useState(0);
  const [montoTotalImplementacion, setMontoTotalImplementacion] = useState(0);
  const [montoTotalOperacion, setMontoTotalOperacion] = useState(0);

  // Load data when direction or implementation index changes
  useEffect(() => {
    const implementations = implementacionesData[selectedDirection as keyof typeof implementacionesData];
    if (implementations && implementations[currentImplementationIndex]) {
      const currentImpl = implementations[currentImplementationIndex];
      setHeaderData(currentImpl.header);
      setImplementacion(currentImpl.implementacion);
      setOperacion(currentImpl.operacion);
    } else {
      // Reset to empty data for directions without implementations
      setHeaderData({
        direccion: '',
        gerencia: '',
        nombreImplementacion: '',
        razon1: '',
        razon2: '',
        razon3: ''
      });
      setImplementacion({
        manoDeObra: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' },
        metodologia: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' },
        medicion: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' },
        maquinaria: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' },
        materiales: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' },
        medioAmbiente: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' }
      });
      setOperacion({
        manoDeObra: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' },
        metodologia: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' },
        medicion: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' },
        maquinaria: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' },
        materiales: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' },
        medioAmbiente: { duracion: 0, duracionJustificacion: '', monto: 0, montoJustificacion: '', calidad: '', descripcion: '' }
      });
    }
  }, [selectedDirection, currentImplementationIndex]);

  // Calculate totals automatically
  useEffect(() => {
    const calcTiempoImpl = Object.values(implementacion).reduce((sum, item) => sum + (item.duracion || 0), 0);
    const calcMontoImpl = Object.values(implementacion).reduce((sum, item) => sum + (item.monto || 0), 0);
    const calcMontoOp = Object.values(operacion).reduce((sum, item) => sum + (item.monto || 0), 0);
    
    setTiempoImplementacion(calcTiempoImpl);
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

  const handleDirectionSelect = (directionId: string) => {
    setSelectedDirection(directionId);
    setCurrentImplementationIndex(0); // Reset to first implementation
  };

  const handleToggleView = () => {
    setIsAdminView(!isAdminView);
  };

  const getCurrentImplementations = () => {
    return implementacionesData[selectedDirection as keyof typeof implementacionesData] || [];
  };

  const currentImplementations = getCurrentImplementations();
  const hasMultipleImplementations = currentImplementations.length > 1;

  const nextImplementation = () => {
    if (currentImplementationIndex < currentImplementations.length - 1) {
      setCurrentImplementationIndex(currentImplementationIndex + 1);
    }
  };

  const previousImplementation = () => {
    if (currentImplementationIndex > 0) {
      setCurrentImplementationIndex(currentImplementationIndex - 1);
    }
  };

  const handleExpandTable = (tableType: 'implementacion' | 'operacion') => {
    setExpandedTable(expandedTable === tableType ? null : tableType);
  };

  return (
    <div className="flex w-full">
      {isAdminView ? (
        <AppSidebar 
          onDirectionSelect={handleDirectionSelect}
          selectedDirection={selectedDirection}
          onToggleView={handleToggleView}
        />
      ) : (
        <UserSidebar 
          employeeData={employeeData}
          onEmployeeUpdate={updateEmployeeData}
        />
      )}
      
      <div className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Fixed header with sidebar trigger */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <SidebarTrigger />
            
            {/* View toggle for user view */}
            {!isAdminView && (
              <button
                onClick={handleToggleView}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors border border-gray-200"
              >
                <Shield className="h-4 w-4" />
                Vista Administrador
              </button>
            )}
            
            {/* Navigation for multiple implementations - only in admin view */}
            {isAdminView && hasMultipleImplementations && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Implementación {currentImplementationIndex + 1} de {currentImplementations.length}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={previousImplementation}
                    disabled={currentImplementationIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextImplementation}
                    disabled={currentImplementationIndex === currentImplementations.length - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
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
                    totalTime={tiempoImplementacion}
                    totalCost={montoTotalImplementacion}
                    isExpanded={expandedTable === 'implementacion'}
                    onToggleExpand={() => handleExpandTable('implementacion')}
                  />
                ) : (
                  <UserM6Table
                    title="Implementación"
                    data={implementacion}
                    onUpdate={updateImplementacion}
                    totalTime={tiempoImplementacion}
                    totalCost={montoTotalImplementacion}
                    isExpanded={expandedTable === 'implementacion'}
                    onToggleExpand={() => handleExpandTable('implementacion')}
                  />
                )
              )}
              
              {(expandedTable === null || expandedTable === 'operacion') && (
                isAdminView ? (
                  <M6Table
                    title="Operación"
                    data={operacion}
                    onUpdate={updateOperacion}
                    totalCost={montoTotalOperacion}
                    isExpanded={expandedTable === 'operacion'}
                    onToggleExpand={() => handleExpandTable('operacion')}
                  />
                ) : (
                  <UserM6Table
                    title="Operación"
                    data={operacion}
                    onUpdate={updateOperacion}
                    totalCost={montoTotalOperacion}
                    isExpanded={expandedTable === 'operacion'}
                    onToggleExpand={() => handleExpandTable('operacion')}
                  />
                )
              )}
            </div>

            <CostSummary
              tiempoImplementacion={tiempoImplementacion}
              montoTotalImplementacion={montoTotalImplementacion}
              montoTotalOperacion={montoTotalOperacion}
            />

            <SixMsAnalysis />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
