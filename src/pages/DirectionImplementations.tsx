
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Clock, DollarSign, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { implementacionesData } from '@/data/implementaciones';
import { SidebarTrigger } from '@/components/ui/sidebar';

const DirectionImplementations: React.FC = () => {
  const { direction } = useParams<{ direction: string }>();
  const navigate = useNavigate();
  
  const directionData = direction ? implementacionesData[direction as keyof typeof implementacionesData] : undefined;
  
  if (!directionData) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Dirección no encontrada</h1>
          <p className="text-gray-600">La dirección solicitada no existe.</p>
        </div>
      </div>
    );
  }

  const getDirectionTitle = (directionId: string) => {
    const titles: { [key: string]: string } = {
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
    return titles[directionId] || directionId;
  };

  const calculateTotalTime = (implementacion: any, operacion: any) => {
    const implTime = typeof implementacion?.totalTime === 'number' ? implementacion.totalTime : 0;
    const operTime = typeof operacion?.totalTime === 'number' ? operacion.totalTime : 0;
    return implTime + operTime;
  };

  const calculateTotalCost = (implementacion: any, operacion: any) => {
    const implCost = typeof implementacion?.totalCost === 'number' ? implementacion.totalCost : 0;
    const operCost = typeof operacion?.totalCost === 'number' ? operacion.totalCost : 0;
    return implCost + operCost;
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {getDirectionTitle(direction || '')}
              </h1>
              <p className="text-gray-600">Implementaciones de la dirección</p>
            </div>
          </div>
          
          <img 
            src="https://i.postimg.cc/FFfbvfHy/ATISA-Group-Color-page-0001.png" 
            alt="ATISA Group Logo" 
            className="h-8 md:h-10 object-contain"
          />
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Lista de Implementaciones
          </h2>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => navigate(`/${direction}/new`)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva Implementación
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {directionData.map((implementation, index) => {
            const totalTime = calculateTotalTime(implementation.implementacion, implementation.operacion);
            const totalCost = calculateTotalCost(implementation.implementacion, implementation.operacion);
            
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200 border-gray-200">
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                    {implementation.header.nombreImplementacion}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Gerencia:</span> {implementation.header.gerencia}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Dirección:</span> {implementation.header.direccion}
                  </p>
                </div>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{totalTime} días</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>${totalCost.toLocaleString()}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => navigate(`/${direction}/${index}`)}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Detalles
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DirectionImplementations;
