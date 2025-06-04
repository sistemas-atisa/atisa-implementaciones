
import React, { useState, useEffect } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import ProjectHeader from '@/components/ProjectHeader';
import M6Table from '@/components/M6Table';
import CostSummary from '@/components/CostSummary';
import { SectionData, ProjectHeaderData } from '@/types/project';

// Datos de ejemplo para Administración
const administracionExample: ProjectHeaderData = {
  direccion: 'ADMINISTRACIÓN',
  gerencia: 'Gerencia General',
  nombreImplementacion: 'Sistema de Control de Gestión Documental',
  razon1: 'Mejora la eficiencia en el manejo de documentos administrativos y reduce los tiempos de búsqueda y archivo.',
  razon2: 'Garantiza el cumplimiento de normativas legales y auditorías mediante un control adecuado de la documentación.',
  razon3: 'Facilita el acceso remoto a documentos importantes y mejora la colaboración entre departamentos.'
};

const administracionImplementacion: SectionData = {
  manoDeObra: { 
    duracion: 15, 
    duracionJustificacion: 'Capacitación del personal en nuevos procesos', 
    monto: 45000, 
    montoJustificacion: 'Salarios durante capacitación y consultorías', 
    calidad: 'Alta - Personal especializado en gestión documental', 
    descripcion: 'Capacitación de 10 empleados en el nuevo sistema de gestión documental y procesos administrativos' 
  },
  metodologia: { 
    duracion: 10, 
    duracionJustificacion: 'Análisis y diseño de procesos optimizados', 
    monto: 25000, 
    montoJustificacion: 'Consultoría especializada en metodologías', 
    calidad: 'Excelente - Metodología probada en organizaciones similares', 
    descripcion: 'Implementación de metodología LEAN para optimizar procesos administrativos y flujos de trabajo' 
  },
  medicion: { 
    duracion: 5, 
    duracionJustificacion: 'Definición de KPIs y métricas de control', 
    monto: 15000, 
    montoJustificacion: 'Software de medición y dashboard', 
    calidad: 'Alta - Métricas precisas y en tiempo real', 
    descripcion: 'Sistema de métricas para medir eficiencia en gestión documental y tiempos de respuesta' 
  },
  maquinaria: { 
    duracion: 7, 
    duracionJustificacion: 'Instalación y configuración de equipos', 
    monto: 120000, 
    montoJustificacion: 'Servidores, escáneres y equipos de digitalización', 
    calidad: 'Excelente - Equipos de última generación con garantía extendida', 
    descripcion: 'Servidores para almacenamiento, escáneres industriales y equipos de digitalización masiva' 
  },
  materiales: { 
    duracion: 3, 
    duracionJustificacion: 'Adquisición e instalación de materiales', 
    monto: 30000, 
    montoJustificacion: 'Software, licencias y materiales de oficina', 
    calidad: 'Alta - Software licenciado y materiales certificados', 
    descripcion: 'Licencias de software de gestión documental, material de archivo y suministros de oficina' 
  },
  medioAmbiente: { 
    duracion: 5, 
    duracionJustificacion: 'Adecuación de espacios y medidas ambientales', 
    monto: 20000, 
    montoJustificacion: 'Climatización y adecuación de espacios', 
    calidad: 'Buena - Cumple con estándares ambientales requeridos', 
    descripcion: 'Acondicionamiento de espacios para archivo digital, climatización adecuada y medidas de seguridad' 
  }
};

const administracionOperacion: SectionData = {
  manoDeObra: { 
    duracion: 0, 
    duracionJustificacion: '', 
    monto: 180000, 
    montoJustificacion: 'Salarios anuales del personal especializado', 
    calidad: 'Alta - Personal capacitado y certificado', 
    descripcion: 'Operación del sistema por personal especializado en gestión documental (2 empleados)' 
  },
  metodologia: { 
    duracion: 0, 
    duracionJustificacion: '', 
    monto: 12000, 
    montoJustificacion: 'Mantenimiento y actualización de procesos', 
    calidad: 'Excelente - Mejora continua de procesos', 
    descripcion: 'Mantenimiento y optimización continua de metodologías implementadas' 
  },
  medicion: { 
    duracion: 0, 
    duracionJustificacion: '', 
    monto: 8000, 
    montoJustificacion: 'Licencias anuales de software de métricas', 
    calidad: 'Alta - Monitoreo constante de indicadores', 
    descripcion: 'Operación del sistema de métricas y generación de reportes mensuales' 
  },
  maquinaria: { 
    duracion: 0, 
    duracionJustificacion: '', 
    monto: 25000, 
    montoJustificacion: 'Mantenimiento anual de equipos', 
    calidad: 'Excelente - Mantenimiento preventivo programado', 
    descripcion: 'Mantenimiento preventivo y correctivo de servidores y equipos de digitalización' 
  },
  materiales: { 
    duracion: 0, 
    duracionJustificacion: '', 
    monto: 15000, 
    montoJustificacion: 'Licencias anuales y suministros', 
    calidad: 'Alta - Renovación oportuna de licencias', 
    descripcion: 'Renovación de licencias de software y suministros operativos anuales' 
  },
  medioAmbiente: { 
    duracion: 0, 
    duracionJustificacion: '', 
    monto: 10000, 
    montoJustificacion: 'Mantenimiento de instalaciones', 
    calidad: 'Buena - Mantenimiento programado de instalaciones', 
    descripcion: 'Mantenimiento de climatización y sistemas de seguridad en espacios de archivo' 
  }
};

const Index = () => {
  const [selectedDirection, setSelectedDirection] = useState('administracion');
  
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

  // Load example data when Administración is selected
  useEffect(() => {
    if (selectedDirection === 'administracion') {
      setHeaderData(administracionExample);
      setImplementacion(administracionImplementacion);
      setOperacion(administracionOperacion);
    } else {
      // Reset to empty data for other directions
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
  }, [selectedDirection]);

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
  };

  return (
    <div className="flex w-full">
      <AppSidebar 
        onDirectionSelect={handleDirectionSelect}
        selectedDirection={selectedDirection}
      />
      
      <div className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="p-6">
          <div className="mb-4">
            <SidebarTrigger />
          </div>
          
          <div className="max-w-full mx-auto">
            <ProjectHeader data={headerData} onUpdate={updateHeaderData} />

            {/* Main Tables */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <M6Table
                title="Implementación"
                data={implementacion}
                onUpdate={updateImplementacion}
                totalTime={tiempoImplementacion}
                totalCost={montoTotalImplementacion}
              />
              
              <M6Table
                title="Operación"
                data={operacion}
                onUpdate={updateOperacion}
                totalCost={montoTotalOperacion}
              />
            </div>

            <CostSummary
              tiempoImplementacion={tiempoImplementacion}
              montoTotalImplementacion={montoTotalImplementacion}
              montoTotalOperacion={montoTotalOperacion}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
