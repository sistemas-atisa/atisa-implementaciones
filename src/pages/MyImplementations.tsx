
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Clock, DollarSign, CheckCircle, XCircle } from 'lucide-react';

const MyImplementations: React.FC = () => {
  const navigate = useNavigate();

  // Mock data for user implementations - only from 'tecnologia' direction
  const myImplementations = [
    {
      id: 0,
      title: "Optimización del Sistema de Gestión Documental",
      description: "Implementar un nuevo sistema para mejorar la gestión y almacenamiento de documentos corporativos.",
      days: 15,
      cost: 25000,
      status: 'pending',
      direction: 'tecnologia'
    },
    {
      id: 1,
      title: "Mejora en Procesos de Reclutamiento",
      description: "Actualizar los procesos de selección y reclutamiento de personal para mayor eficiencia.",
      days: 20,
      cost: 18000,
      status: 'approved',
      direction: 'tecnologia'
    },
    {
      id: 2,
      title: "Automatización de Reportes Financieros",
      description: "Implementar herramientas de automatización para la generación de reportes financieros mensuales.",
      days: 25,
      cost: 35000,
      status: 'rejected',
      direction: 'tecnologia'
    }
  ];

  const pendingImplementations = myImplementations.filter(impl => impl.status === 'pending');
  const resolvedImplementations = myImplementations.filter(impl => impl.status !== 'pending');

  interface ImplementationCardProps {
    implementation: typeof myImplementations[0];
    isPending: boolean;
  }

  const ImplementationCard: React.FC<ImplementationCardProps> = ({ implementation, isPending }) => {
    const getStatusInfo = (status: string) => {
      switch (status) {
        case 'approved':
          return { 
            label: 'Aprobada', 
            className: 'bg-green-100 text-green-800',
            icon: <CheckCircle className="h-4 w-4" />
          };
        case 'rejected':
          return { 
            label: 'Rechazada', 
            className: 'bg-red-100 text-red-800',
            icon: <XCircle className="h-4 w-4" />
          };
        default:
          return { 
            label: 'Pendiente', 
            className: 'bg-yellow-100 text-yellow-800',
            icon: <Clock className="h-4 w-4" />
          };
      }
    };

    const statusInfo = getStatusInfo(implementation.status);
    
    return (
      <Card className="p-6 hover:shadow-lg transition-shadow duration-200 border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
            {implementation.title}
          </h3>
          <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusInfo.className}`}>
            {statusInfo.icon}
            {statusInfo.label}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {implementation.description}
        </p>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{implementation.days} días</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>${implementation.cost.toLocaleString()}</span>
          </div>
        </div>
        
        <Button 
          onClick={() => navigate(`/${implementation.direction}/${implementation.id}`)}
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
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4 w-full">
        <div className="flex items-center justify-between w-full max-w-none mx-auto px-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Mis Implementaciones
            </h1>
            <p className="text-gray-600">Implementaciones asignadas a tu área</p>
          </div>
          
          <img 
            src="https://i.postimg.cc/FFfbvfHy/ATISA-Group-Color-page-0001.png" 
            alt="ATISA Group Logo" 
            className="h-8 md:h-10 object-contain"
          />
        </div>
      </div>

      <div className="p-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* Pendientes de Revisión */}
          <div className="w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-gray-900">Pendientes de Revisión</h2>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-medium">
                {pendingImplementations.length}
              </span>
            </div>
            <div className="space-y-4">
              {pendingImplementations.length > 0 ? (
                pendingImplementations.map((implementation) => (
                  <ImplementationCard 
                    key={`pending-${implementation.id}`} 
                    implementation={implementation} 
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
          <div className="w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-gray-900">Resueltas</h2>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                {resolvedImplementations.length}
              </span>
            </div>
            <div className="space-y-4">
              {resolvedImplementations.length > 0 ? (
                resolvedImplementations.map((implementation) => (
                  <ImplementationCard 
                    key={`resolved-${implementation.id}`} 
                    implementation={implementation} 
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

export default MyImplementations;
