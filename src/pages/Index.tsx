
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Users, FileText, Calculator, Wrench, Truck, HardHat, Home, ShoppingCart, Stethoscope, Shield, Target, TrendingUp, Briefcase } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const directions = [
    { id: 'administracion', title: 'Administración', icon: Building2, description: 'Gestión administrativa y documentos' },
    { id: 'fiscal', title: 'Fiscal', icon: Calculator, description: 'Control tributario y cumplimiento fiscal' },
    { id: 'legal', title: 'Legal', icon: Shield, description: 'Gestión jurídica y contratos' },
    { id: 'finanzas', title: 'Finanzas', icon: TrendingUp, description: 'Control financiero y análisis' },
    { id: 'capital-humano', title: 'Capital Humano', icon: Users, description: 'Recursos humanos y desarrollo' },
    { id: 'tecnologia', title: 'Tecnología', icon: Wrench, description: 'Sistemas y tecnología' },
    { id: 'proyectos-presupuestos', title: 'Proyectos y Presupuestos', icon: Target, description: 'Gestión de proyectos y PMO' },
    { id: 'cadena-suministros', title: 'Cadena de Suministros', icon: ShoppingCart, description: 'Supply chain e inventarios' },
    { id: 'maquinaria', title: 'Maquinaria', icon: Wrench, description: 'Equipos y mantenimiento' },
    { id: 'movimiento-tierra', title: 'Movimiento de Tierra', icon: Truck, description: 'Operaciones de movimiento' },
    { id: 'construccion', title: 'Construcción', icon: HardHat, description: 'Proyectos constructivos' },
    { id: 'desarrollo', title: 'Desarrollo', icon: Home, description: 'Desarrollos inmobiliarios' },
    { id: 'comercial', title: 'Comercial', icon: Briefcase, description: 'Ventas y marketing' },
    { id: 'asset-management', title: 'Asset Management', icon: Building2, description: 'Gestión de activos' },
    { id: 'clinica-santa-clarita', title: 'Clínica Santa Clarita', icon: Stethoscope, description: 'Servicios médicos' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-center">
          <img 
            src="https://i.postimg.cc/FFfbvfHy/ATISA-Group-Color-page-0001.png" 
            alt="ATISA Group Logo" 
            className="h-12 md:h-16 object-contain"
          />
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sistema de Gestión de Implementaciones
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Selecciona una dirección para ver las implementaciones disponibles y gestionar proyectos de mejora organizacional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {directions.map((direction) => (
            <Card 
              key={direction.id}
              className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer border-gray-200 hover:border-red-300"
              onClick={() => navigate(`/directions/${direction.id}`)}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <direction.icon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900">
                  {direction.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                {direction.description}
              </p>
              <Button 
                className="w-full bg-red-600 hover:bg-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/directions/${direction.id}`);
                }}
              >
                Ver Implementaciones
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
