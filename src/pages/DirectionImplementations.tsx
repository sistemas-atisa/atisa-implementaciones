
import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ProjectHeader from '../components/ProjectHeader';
import M6Table from '../components/M6Table';
import CostSummary from '../components/CostSummary';
import SixMsAnalysis from '../components/SixMsAnalysis';
import { implementacionesData } from '../data/implementaciones';

const DirectionImplementations = () => {
  const { direction } = useParams<{ direction: string }>();
  const [globalTiempoImplementacion, setGlobalTiempoImplementacion] = useState(0);
  const [globalTiempoTotal, setGlobalTiempoTotal] = useState(0);

  const implementaciones = direction 
    ? implementacionesData[direction as keyof typeof implementacionesData] || []
    : [];

  const directionNames: { [key: string]: string } = {
    'administracion': 'Administración',
    'fiscal': 'Fiscal',
    'legal': 'Legal',
    'finanzas': 'Finanzas',
    'capital-humano': 'Capital Humano',
    'tecnologia': 'Tecnología',
    'proyectos-presupuestos': 'Proyectos y Presupuestos',
    'cadena-suministros': 'Cadena de Suministros',
    'maquinaria': 'Maquinaria',
    'movimiento-tierra': 'Movimiento de Tierra',
    'construccion': 'Construcción',
    'desarrollo': 'Desarrollo',
    'comercial': 'Comercial',
    'asset-management': 'Asset Management',
    'clinica-santa-clarita': 'Clínica Santa Clarita'
  };

  const directionDisplayName = direction ? directionNames[direction] || direction : '';

  const calculateTotals = (data: any[]) => {
    const tiempoImplementacion = data.reduce((sum, item) => {
      const value = Number(item.tiempoImplementacion);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
    
    const tiempoTotal = data.reduce((sum, item) => {
      const value = Number(item.tiempoTotal);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
    
    return {
      tiempoImplementacion,
      tiempoTotal
    };
  };

  const totals = useMemo(() => {
    const allData = implementaciones.flatMap(impl => [
      ...Object.values(impl.implementacion),
      ...Object.values(impl.operacion)
    ]);
    return calculateTotals(allData);
  }, [implementaciones, globalTiempoImplementacion, globalTiempoTotal]);

  const handleGlobalTimeChange = (tiempoImplementacion: number, tiempoTotal: number) => {
    setGlobalTiempoImplementacion(tiempoImplementacion);
    setGlobalTiempoTotal(tiempoTotal);
  };

  const handleProjectHeaderUpdate = (field: string, value: string) => {
    // Handle project header updates
    console.log(`Updating ${field} to ${value}`);
  };

  if (!direction || implementaciones.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {directionDisplayName || 'Dirección no encontrada'}
        </h1>
        <p className="text-gray-600">No hay implementaciones disponibles para esta dirección.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-center">
          <img 
            src="https://i.postimg.cc/FFfbvfHy/ATISA-Group-Color-page-0001.png" 
            alt="ATISA Group Logo" 
            className="h-8 md:h-10 object-contain"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="space-y-6">
          {implementaciones.map((implementacion, index) => {
            // Calculate totals for this specific implementation
            const implementacionData = Object.values(implementacion.implementacion);
            const operacionData = Object.values(implementacion.operacion);
            
            const tiempoImplementacion = implementacionData.reduce((sum, item) => sum + (item.duracion || 0), 0);
            const tiempoOperacion = operacionData.reduce((sum, item) => sum + (item.duracion || 0), 0);
            const montoTotalImplementacion = implementacionData.reduce((sum, item) => sum + (item.monto || 0), 0);
            const montoTotalOperacion = operacionData.reduce((sum, item) => sum + (item.monto || 0), 0);

            return (
              <div key={index} className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                <ProjectHeader 
                  data={implementacion.header}
                  onUpdate={handleProjectHeaderUpdate}
                />
                
                <div className="mt-6 space-y-6">
                  <M6Table 
                    title="Implementación"
                    data={implementacion.implementacion}
                    onUpdate={() => {}}
                    totalCost={montoTotalImplementacion}
                    customTotalTime={tiempoImplementacion}
                    onCustomTotalTimeChange={() => {}}
                  />
                  <M6Table 
                    title="Operación"
                    data={implementacion.operacion}
                    onUpdate={() => {}}
                    totalCost={montoTotalOperacion}
                    customTotalTime={tiempoOperacion}
                    onCustomTotalTimeChange={() => {}}
                  />
                  <CostSummary 
                    tiempoImplementacion={tiempoImplementacion}
                    tiempoOperacion={tiempoOperacion}
                    montoTotalImplementacion={montoTotalImplementacion}
                    montoTotalOperacion={montoTotalOperacion}
                  />
                  <SixMsAnalysis />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DirectionImplementations;
