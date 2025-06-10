import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AppSidebar } from '@/components/AppSidebar';
import { UserSidebar } from '@/components/UserSidebar';
import ProjectCard from '@/components/ProjectCard';
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SectionData, ProjectHeaderData } from '@/types/project';
import { implementacionesData } from '@/data/implementaciones';

interface DirectionImplementationsProps {
  isAdminView?: boolean;
  isUserLoggedIn?: boolean;
}

const DirectionImplementations: React.FC<DirectionImplementationsProps> = ({ 
  isAdminView: propIsAdminView, 
  isUserLoggedIn: propIsUserLoggedIn 
}) => {
  const { direction } = useParams<{ direction: string }>();
  const navigate = useNavigate();
  const [isAdminView, setIsAdminView] = useState(propIsAdminView ?? true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(propIsUserLoggedIn ?? false);
  const [implementations, setImplementations] = useState<any[]>([]);

  // Employee data for user view
  const [employeeData, setEmployeeData] = useState({
    nombre: 'Oscar Arredondo',
    numeroEmpleado: '793',
    direccion: 'Tecnología y Sistemas'
  });

  // Update states when props change
  useEffect(() => {
    if (propIsAdminView !== undefined) {
      setIsAdminView(propIsAdminView);
    }
    if (propIsUserLoggedIn !== undefined) {
      setIsUserLoggedIn(propIsUserLoggedIn);
    }
  }, [propIsAdminView, propIsUserLoggedIn]);

  // Load data when direction changes
  useEffect(() => {
    if (direction) {
      const implementations = implementacionesData[direction as keyof typeof implementacionesData];
      
      if (implementations) {
        setImplementations(implementations);
      }
    }
  }, [direction]);

  const updateEmployeeData = (field: keyof typeof employeeData, value: string) => {
    setEmployeeData(prev => ({ ...prev, [field]: value }));
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

  const calculateTotals = (impl: any) => {
    const tiempoImplementacion = Number(impl.implementacion ? Object.values(impl.implementacion).reduce((sum: number, item: any) => sum + (Number(item.duracion) || 0), 0) : 0);
    const tiempoOperacion = Number(impl.operacion ? Object.values(impl.operacion).reduce((sum: number, item: any) => sum + (Number(item.duracion) || 0), 0) : 0);
    
    return {
      tiempoImplementacion,
      tiempoTotal: tiempoImplementacion + tiempoOperacion
    };
  };

  // If user view and not logged in, redirect to my-implementations
  if (!isAdminView && !isUserLoggedIn) {
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
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Regresar a Direcciones
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
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">
              Implementaciones de {direction}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {implementations.length > 0 ? (
                implementations.map((impl, index) => {
                  const { tiempoImplementacion, tiempoTotal } = calculateTotals(impl);

                  return (
                    <ProjectCard
                      key={index}
                      title={impl.header.nombreImplementacion}
                      description={`Tiempo de Implementación: ${tiempoImplementacion} días`}
                      totalTime={tiempoTotal}
                      onClick={() => navigate(`/directions/${direction}/${index}`)}
                    />
                  );
                })
              ) : (
                <>
                  <Skeleton className="w-full h-32" />
                  <Skeleton className="w-full h-32" />
                  <Skeleton className="w-full h-32" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectionImplementations;
