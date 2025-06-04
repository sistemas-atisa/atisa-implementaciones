import React, { useState, useEffect } from 'react';
import ProjectHeader from '@/components/ProjectHeader';
import M6Table from '@/components/M6Table';
import CostSummary from '@/components/CostSummary';
import { SectionData, ProjectHeaderData } from '@/types/project';

const Index = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-6">
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
  );
};

export default Index;
