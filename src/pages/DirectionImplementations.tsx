
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { implementacionesData } from '@/data/implementaciones';

const DirectionImplementations: React.FC = () => {
  const { direction } = useParams<{ direction: string }>();
  const navigate = useNavigate();

  // Sample data for administracion direction to show more implementations
  const sampleAdministracionData = [
    { header: { nombreImplementacion: "Sistema de Gestión de Proyectos Integral" } },
    { header: { nombreImplementacion: "Automatización de Procesos Administrativos" } },
    { header: { nombreImplementacion: "Plataforma de Control de Documentos" } },
    { header: { nombreImplementacion: "Sistema de Monitoreo de KPIs en Tiempo Real" } },
    { header: { nombreImplementacion: "Portal de Servicios Internos Centralizado" } },
    { header: { nombreImplementacion: "Optimización del Sistema de Gestión Documental" } },
    { header: { nombreImplementacion: "Modernización de Procesos Administrativos" } },
    { header: { nombreImplementacion: "Sistema de Control de Inventarios" } },
    { header: { nombreImplementacion: "Plataforma de Gestión de Proveedores" } },
    { header: { nombreImplementacion: "Sistema de Evaluación de Desempeño" } },
    { header: { nombreImplementacion: "Automatización de Reportes Financieros" } },
    { header: { nombreImplementacion: "Sistema de Gestión de Calidad" } },
    { header: { nombreImplementacion: "Optimización de Base de Datos" } },
    { header: { nombreImplementacion: "Portal de Recursos Humanos" } }
  ];

  const implementations = direction === 'administracion' 
    ? sampleAdministracionData 
    : (direction ? implementacionesData[direction as keyof typeof implementacionesData] || [] : []);
  
  // For administracion: first 4 are pending, rest are resolved
  // For other directions: use the original logic
  const pendingImplementations = direction === 'administracion' 
    ? implementations.slice(0, 4)
    : implementations.filter((_, index) => index % 3 === 0);
  
  const resolvedImplementations = direction === 'administracion'
    ? implementations.slice(4)
    : implementations.filter((_, index) => index % 3 !== 0);

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

  interface ImplementationCardProps {
    implementation: any;
    index: number;
  }

  const ImplementationCard: React.FC<ImplementationCardProps> = ({ implementation, index }) => {
    return (
      <Card className="p-3 hover:shadow-md transition-shadow duration-200 border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0 mr-3">
            <h3 className="font-semibold text-sm text-gray-900 truncate">
              {implementation.header.nombreImplementacion}
            </h3>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button 
              onClick={() => navigate(`/${direction}/${index}`)}
              size="sm"
              className="bg-red-600 hover:bg-red-700 px-3 py-1 h-8"
            >
              Ver más
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
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
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-gray-900">Pendientes de Revisión</h2>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-medium">
                {pendingImplementations.length}
              </span>
            </div>
            <div className="space-y-2">
              {pendingImplementations.length > 0 ? (
                pendingImplementations.map((implementation, index) => (
                  <ImplementationCard 
                    key={`pending-${index}`} 
                    implementation={implementation} 
                    index={implementations.indexOf(implementation)}
                  />
                ))
              ) : (
                <Card className="p-6 text-center text-gray-500">
                  <p>No hay implementaciones pendientes</p>
                </Card>
              )}
            </div>
          </div>

          {/* Resueltas */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-gray-900">Resueltas</h2>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                {resolvedImplementations.length}
              </span>
            </div>
            <div className="space-y-2">
              {resolvedImplementations.length > 0 ? (
                resolvedImplementations.map((implementation, index) => (
                  <ImplementationCard 
                    key={`resolved-${index}`} 
                    implementation={implementation} 
                    index={implementations.indexOf(implementation)}
                  />
                ))
              ) : (
                <Card className="p-6 text-center text-gray-500">
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
