
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface M6Data {
  duracion: number;
  monto: number;
  calidad: string;
}

interface SectionData {
  manoDeObra: M6Data;
  metodologia: M6Data;
  medicion: M6Data;
  maquinaria: M6Data;
  materiales: M6Data;
  medioAmbiente: M6Data;
}

const Index = () => {
  const [direccion, setDireccion] = useState('');
  const [gerencia, setGerencia] = useState('');
  const [nombreImplementacion, setNombreImplementacion] = useState('');
  const [porQueRelevante, setPorQueRelevante] = useState('');
  const [habilidadNueva, setHabilidadNueva] = useState('');
  
  const [implementacion, setImplementacion] = useState<SectionData>({
    manoDeObra: { duracion: 0, monto: 0, calidad: '' },
    metodologia: { duracion: 0, monto: 0, calidad: '' },
    medicion: { duracion: 0, monto: 0, calidad: '' },
    maquinaria: { duracion: 0, monto: 0, calidad: '' },
    materiales: { duracion: 0, monto: 0, calidad: '' },
    medioAmbiente: { duracion: 0, monto: 0, calidad: '' }
  });

  const [operacion, setOperacion] = useState<SectionData>({
    manoDeObra: { duracion: 0, monto: 0, calidad: '' },
    metodologia: { duracion: 0, monto: 0, calidad: '' },
    medicion: { duracion: 0, monto: 0, calidad: '' },
    maquinaria: { duracion: 0, monto: 0, calidad: '' },
    materiales: { duracion: 0, monto: 0, calidad: '' },
    medioAmbiente: { duracion: 0, monto: 0, calidad: '' }
  });

  const [tiempoImplementacion, setTiempoImplementacion] = useState(0);
  const [montoTotalImplementacion, setMontoTotalImplementacion] = useState(0);
  const [montoTotalOperacion, setMontoTotalOperacion] = useState(0);

  const m6Categories = [
    { key: 'manoDeObra' as keyof SectionData, label: 'Mano de obra' },
    { key: 'metodologia' as keyof SectionData, label: 'Metodología' },
    { key: 'medicion' as keyof SectionData, label: 'Medición' },
    { key: 'maquinaria' as keyof SectionData, label: 'Maquinaria' },
    { key: 'materiales' as keyof SectionData, label: 'Materiales' },
    { key: 'medioAmbiente' as keyof SectionData, label: 'Medio Ambiente' }
  ];

  // Calculate totals automatically
  useEffect(() => {
    const calcTiempoImpl = Object.values(implementacion).reduce((sum, item) => sum + (item.duracion || 0), 0);
    const calcMontoImpl = Object.values(implementacion).reduce((sum, item) => sum + (item.monto || 0), 0);
    const calcMontoOp = Object.values(operacion).reduce((sum, item) => sum + (item.monto || 0), 0);
    
    setTiempoImplementacion(calcTiempoImpl);
    setMontoTotalImplementacion(calcMontoImpl);
    setMontoTotalOperacion(calcMontoOp);
  }, [implementacion, operacion]);

  const updateImplementacion = (category: keyof SectionData, field: keyof M6Data, value: string | number) => {
    setImplementacion(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const updateOperacion = (category: keyof SectionData, field: keyof M6Data, value: string | number) => {
    setOperacion(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const getRowClass = (index: number) => {
    return index % 2 === 0 ? 'bg-gray-50' : 'bg-white';
  };

  const getCostHighlight = (monto: number) => {
    return monto > 10000 ? 'bg-red-100 border-red-300' : '';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <Card className="mb-6 p-6 bg-white">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Evaluación de Implementación de Proyectos - Metodología 6M
              </h1>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="font-bold text-xl text-gray-800">ATISA</span>
                <span className="text-sm text-gray-600 ml-1">GROUP</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="direccion" className="font-semibold">Dirección</Label>
                <Input
                  id="direccion"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="gerencia" className="font-semibold">Gerencia</Label>
                <Input
                  id="gerencia"
                  value={gerencia}
                  onChange={(e) => setGerencia(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="implementacion" className="font-semibold">Nombre de implementación</Label>
                <Input
                  id="implementacion"
                  value={nombreImplementacion}
                  onChange={(e) => setNombreImplementacion(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="relevante" className="font-semibold">¿Por qué es relevante?</Label>
                <Textarea
                  id="relevante"
                  value={porQueRelevante}
                  onChange={(e) => setPorQueRelevante(e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="habilidad" className="font-semibold">¿Qué habilidad nueva nos da?</Label>
                <Textarea
                  id="habilidad"
                  value={habilidadNueva}
                  onChange={(e) => setHabilidadNueva(e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Main Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Implementación Table */}
          <Card className="p-6 bg-white">
            <h2 className="text-xl font-bold text-center mb-4 bg-gray-200 py-2 rounded">
              Implementación
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left font-semibold">6 M's</th>
                    <th className="border border-gray-300 p-2 text-center font-semibold">Tiempo</th>
                    <th className="border border-gray-300 p-2 text-center font-semibold">Costo</th>
                    <th className="border border-gray-300 p-2 text-center font-semibold">Calidad</th>
                  </tr>
                </thead>
                <tbody>
                  {m6Categories.map((category, index) => (
                    <tr key={category.key} className={getRowClass(index)}>
                      <td className="border border-gray-300 p-2 font-medium">
                        {category.label}
                      </td>
                      <td className="border border-gray-300 p-1">
                        <div className="text-xs text-gray-600 mb-1">Duración:</div>
                        <Input
                          type="number"
                          value={implementacion[category.key].duracion || ''}
                          onChange={(e) => updateImplementacion(category.key, 'duracion', Number(e.target.value))}
                          className="text-sm h-8"
                          min="0"
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <div className="text-xs text-gray-600 mb-1">Monto: $</div>
                        <Input
                          type="number"
                          value={implementacion[category.key].monto || ''}
                          onChange={(e) => updateImplementacion(category.key, 'monto', Number(e.target.value))}
                          className={`text-sm h-8 ${getCostHighlight(implementacion[category.key].monto)}`}
                          min="0"
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <Textarea
                          value={implementacion[category.key].calidad}
                          onChange={(e) => updateImplementacion(category.key, 'calidad', e.target.value)}
                          className="text-sm h-8 resize-none"
                          rows={1}
                        />
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50 font-semibold">
                    <td className="border border-gray-300 p-2">Tiempo de Implementación</td>
                    <td className="border border-gray-300 p-2 text-center">
                      {tiempoImplementacion} días
                    </td>
                    <td className="border border-gray-300 p-2 text-center" colSpan={2}>
                      Monto Total de Implementación: ${montoTotalImplementacion.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Operación Table */}
          <Card className="p-6 bg-white">
            <h2 className="text-xl font-bold text-center mb-4 bg-gray-200 py-2 rounded">
              Operación
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left font-semibold">6 M's</th>
                    <th className="border border-gray-300 p-2 text-center font-semibold">Tiempo</th>
                    <th className="border border-gray-300 p-2 text-center font-semibold">Costo</th>
                    <th className="border border-gray-300 p-2 text-center font-semibold">Calidad</th>
                  </tr>
                </thead>
                <tbody>
                  {m6Categories.map((category, index) => (
                    <tr key={category.key} className={getRowClass(index)}>
                      <td className="border border-gray-300 p-2 font-medium">
                        {category.label}
                      </td>
                      <td className="border border-gray-300 p-1">
                        <div className="text-xs text-gray-600 mb-1">Duración:</div>
                        <Input
                          type="number"
                          value={operacion[category.key].duracion || ''}
                          onChange={(e) => updateOperacion(category.key, 'duracion', Number(e.target.value))}
                          className="text-sm h-8"
                          min="0"
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <div className="text-xs text-gray-600 mb-1">Monto: $</div>
                        <Input
                          type="number"
                          value={operacion[category.key].monto || ''}
                          onChange={(e) => updateOperacion(category.key, 'monto', Number(e.target.value))}
                          className={`text-sm h-8 ${getCostHighlight(operacion[category.key].monto)}`}
                          min="0"
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <Textarea
                          value={operacion[category.key].calidad}
                          onChange={(e) => updateOperacion(category.key, 'calidad', e.target.value)}
                          className="text-sm h-8 resize-none"
                          rows={1}
                        />
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-green-50 font-semibold">
                    <td className="border border-gray-300 p-2" colSpan={3}>
                      Monto Total de Operación
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      ${montoTotalOperacion.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Summary Section */}
        <Card className="mt-6 p-6 bg-white">
          <h3 className="text-lg font-bold mb-4">Resumen de Costos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-sm text-gray-600">Tiempo Total de Implementación</div>
              <div className="text-2xl font-bold text-blue-600">{tiempoImplementacion} días</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-sm text-gray-600">Costo Total de Implementación</div>
              <div className="text-2xl font-bold text-yellow-600">${montoTotalImplementacion.toLocaleString()}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-sm text-gray-600">Costo Total de Operación</div>
              <div className="text-2xl font-bold text-green-600">${montoTotalOperacion.toLocaleString()}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
