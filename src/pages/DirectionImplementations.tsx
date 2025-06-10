
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Clock, DollarSign } from 'lucide-react';
import { implementacionesData } from '@/data/implementaciones';

const DirectionImplementations: React.FC = () => {
  const { direction } = useParams<{ direction: string }>();
  const navigate = useNavigate();

  const implementations = direction ? implementacionesData[direction as keyof typeof implementacionesData] || [] : [];
  
  // For demo purposes, we'll mark some as pending and others as resolved randomly
  const pendingImplementations = implementations.filter((_, index) => index % 3 === 0);
  const resolvedImplementations = implementations.filter((_, index) => index % 3 !== 0);

  const getDirectionTitle = (directionKey: string): string => {
    const directionMap: { [key: string]: string } = {
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
    return directionMap[directionKey] || directionKey;
  };

  const calculateTotals = (implementation: any): { time: number; cost: number } => {
    if (!implementation?.implementacion) {
      return { time: 0, cost: 0 };
    }
    
    const implTime = Object.values(implementation.implementacion).reduce((sum: number, item: any) => {
      if (item && typeof item === 'object' && 'duracion' in item) {
        const duration = item.duracion;
        const numericDuration = typeof duration === 'number' ? duration : (typeof duration === 'string' ? parseFloat(duration) : 0);
        return sum + (isNaN(numericDuration) ? 0 : numericDuration);
      }
      return sum;
    }, 0);
    
    const implCost = Object.values(implementation.implementacion).reduce((sum: number, item: any) => {
      if (item && typeof item === 'object' && 'monto' in item) {
        const amount = item.monto;
        const numericAmount = typeof amount === 'number' ? amount : (typeof amount === 'string' ? parseFloat(amount) : 0);
        return sum + (isNaN(numericAmount) ? 0 : numericAmount);
      }
      return sum;
    }, 0);
    
    return { time: implTime, cost: implCost };
  };

  interface ImplementationCardProps {
    implementation: any;
    index: number;
    isPending: boolean;
  }

  const ImplementationCard: React.FC<ImplementationCardProps> = ({ implementation, index, isPending }) => {
    const totals = calculateTotals(implementation);
    
    return (
      <Card className="p-6 hover:shadow-lg transition-shadow duration-200 border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
            {implementation.header.nombreImplementacion}
          </h3>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            isPending ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
          }`}>
            {isPending ? 'Pendiente' : 'Resuelta'}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {implementation.header.razon1}
        </p>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{totals.time} días</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>${totals.cost.toLocaleString()}</span>
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 w-full">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {getDirectionTitle(direction || '')}
            </h1>
            <p className="text-gray-600">Implementaciones disponibles</p>
          </div>
          
          <img 
            src="https://i.postimg.cc/FFfbvfHy/ATISA-Group-Color-page-0001.png" 
            alt="ATISA Group Logo" 
            className="h-8 md:h-10 object-contain"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pendientes de Revisión */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-gray-900">Pendientes de Revisión</h2>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-medium">
                {pendingImplementations.length}
              </span>
            </div>
            <div className="space-y-4">
              {pendingImplementations.length > 0 ? (
                pendingImplementations.map((implementation, index) => (
                  <ImplementationCard 
                    key={`pending-${index}`} 
                    implementation={implementation} 
                    index={implementations.indexOf(implementation)}
                    isPending={true}
                  />
                ))
              ) : (
                <Card className="p-8 text-center text-gray-500">
                  <p>No hay implementaciones pendientes</p>
                </Card>
              )}
            </div>
          </div>

          {/* Resueltas */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-gray-900">Resueltas</h2>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                {resolvedImplementations.length}
              </span>
            </div>
            <div className="space-y-4">
              {resolvedImplementations.length > 0 ? (
                resolvedImplementations.map((implementation, index) => (
                  <ImplementationCard 
                    key={`resolved-${index}`} 
                    implementation={implementation} 
                    index={implementations.indexOf(implementation)}
                    isPending={false}
                  />
                ))
              ) : (
                <Card className="p-8 text-center text-gray-500">
                  <p>No hay implementaciones resueltas</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectionImplementations;
