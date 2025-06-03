
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

  const direccionOpciones = [
    'CREO',
    'COO',
    'Administración',
    'Capital humano',
    'Finanzas'
  ];

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

  const getCostHighlight = (monto: number) => {
    return monto > 10000 ? 'bg-red-200 border-red-400' : '';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-full mx-auto px-2">
        {/* Header Section */}
        <Card className="mb-6 p-8 bg-white border-red-200 border-2">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-red-700 mb-4">
                Evaluación de Implementación de Proyectos - Metodología 6M
              </h1>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="font-bold text-xl text-red-700">ATISA</span>
                <span className="text-sm text-gray-600 ml-1">GROUP</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="direccion" className="font-semibold text-red-700">Dirección</Label>
                <Select value={direccion} onValueChange={setDireccion}>
                  <SelectTrigger className="mt-1 border-red-200 focus:border-red-400">
                    <SelectValue placeholder="Seleccionar dirección" />
                  </SelectTrigger>
                  <SelectContent>
                    {direccionOpciones.map((opcion) => (
                      <SelectItem key={opcion} value={opcion}>
                        {opcion}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="gerencia" className="font-semibold text-red-700">Gerencia</Label>
                <Input
                  id="gerencia"
                  value={gerencia}
                  onChange={(e) => setGerencia(e.target.value)}
                  className="mt-1 border-red-200 focus:border-red-400"
                />
              </div>
              <div>
                <Label htmlFor="implementacion" className="font-semibold text-red-700">Nombre de implementación</Label>
                <Input
                  id="implementacion"
                  value={nombreImplementacion}
                  onChange={(e) => setNombreImplementacion(e.target.value)}
                  className="mt-1 border-red-200 focus:border-red-400"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <Label htmlFor="relevante" className="font-semibold text-red-700">¿Por qué es relevante?</Label>
                <Textarea
                  id="relevante"
                  value={porQueRelevante}
                  onChange={(e) => setPorQueRelevante(e.target.value)}
                  placeholder="¿Qué habilidad nueva nos da?"
                  className="mt-1 border-red-200 focus:border-red-400"
                  rows={6}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Main Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Implementación Table */}
          <Card className="p-4 bg-white border-red-200 border-2">
            <h2 className="text-lg font-bold text-center mb-3 bg-red-600 text-white py-2 rounded">
              Implementación
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-red-300">
                <thead>
                  <tr className="bg-red-100">
                    <th className="border border-red-300 p-1 text-left font-semibold text-red-700 text-xs w-16">6 M's</th>
                    <th className="border border-red-300 p-1 text-left font-semibold text-red-700 text-xs w-28"></th>
                    <th className="border border-red-300 p-1 text-center font-semibold text-red-700 text-xs w-24">Tiempo</th>
                    <th className="border border-red-300 p-1 text-center font-semibold text-red-700 text-xs w-28">Costo</th>
                    <th className="border border-red-300 p-1 text-center font-semibold text-red-700 text-xs">Calidad</th>
                  </tr>
                </thead>
                <tbody>
                  {m6Categories.map((category, index) => (
                    <tr key={category.key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-red-300 p-1 font-medium text-red-700 text-xs w-16">
                        {category.label}
                      </td>
                      <td className="border border-red-300 p-1 w-28"></td>
                      <td className="border border-red-300 p-1 w-24">
                        <div className="text-xs text-red-600 mb-0.5">Duración:</div>
                        <Input
                          type="number"
                          value={implementacion[category.key].duracion || ''}
                          onChange={(e) => updateImplementacion(category.key, 'duracion', Number(e.target.value))}
                          className="text-xs h-4 border-red-200 px-1"
                          min="0"
                        />
                      </td>
                      <td className="border border-red-300 p-1 w-28">
                        <div className="text-xs text-red-600 mb-0.5">Monto: $</div>
                        <Input
                          type="number"
                          value={implementacion[category.key].monto || ''}
                          onChange={(e) => updateImplementacion(category.key, 'monto', Number(e.target.value))}
                          className={`text-xs h-4 border-red-200 px-1 ${getCostHighlight(implementacion[category.key].monto)}`}
                          min="0"
                        />
                      </td>
                      <td className="border border-red-300 p-1">
                        <Textarea
                          value={implementacion[category.key].calidad}
                          onChange={(e) => updateImplementacion(category.key, 'calidad', e.target.value)}
                          className="text-xs h-4 resize-none border-red-200 px-2"
                          rows={1}
                        />
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-red-200 font-semibold">
                    <td className="border border-red-300 p-1 text-red-700 text-xs">Tiempo de Implementación</td>
                    <td className="border border-red-300 p-1"></td>
                    <td className="border border-red-300 p-1 text-center text-red-700 text-xs">
                      {tiempoImplementacion} días
                    </td>
                    <td className="border border-red-300 p-1 text-center text-red-700 text-xs" colSpan={2}>
                      Monto Total de Implementación: ${montoTotalImplementacion.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Operación Table */}
          <Card className="p-4 bg-white border-red-200 border-2">
            <h2 className="text-lg font-bold text-center mb-3 bg-red-600 text-white py-2 rounded">
              Operación
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-red-300">
                <thead>
                  <tr className="bg-red-100">
                    <th className="border border-red-300 p-1 text-left font-semibold text-red-700 text-xs w-16">6 M's</th>
                    <th className="border border-red-300 p-1 text-left font-semibold text-red-700 text-xs w-28"></th>
                    <th className="border border-red-300 p-1 text-center font-semibold text-red-700 text-xs w-24">Tiempo</th>
                    <th className="border border-red-300 p-1 text-center font-semibold text-red-700 text-xs w-28">Costo</th>
                    <th className="border border-red-300 p-1 text-center font-semibold text-red-700 text-xs">Calidad</th>
                  </tr>
                </thead>
                <tbody>
                  {m6Categories.map((category, index) => (
                    <tr key={category.key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-red-300 p-1 font-medium text-red-700 text-xs w-16">
                        {category.label}
                      </td>
                      <td className="border border-red-300 p-1 w-28"></td>
                      <td className="border border-red-300 p-1 w-24">
                        <div className="text-xs text-red-600 mb-0.5">Duración:</div>
                        <Input
                          type="number"
                          value={operacion[category.key].duracion || ''}
                          onChange={(e) => updateOperacion(category.key, 'duracion', Number(e.target.value))}
                          className="text-xs h-4 border-red-200 px-1"
                          min="0"
                        />
                      </td>
                      <td className="border border-red-300 p-1 w-28">
                        <div className="text-xs text-red-600 mb-0.5">Monto: $</div>
                        <Input
                          type="number"
                          value={operacion[category.key].monto || ''}
                          onChange={(e) => updateOperacion(category.key, 'monto', Number(e.target.value))}
                          className={`text-xs h-4 border-red-200 px-1 ${getCostHighlight(operacion[category.key].monto)}`}
                          min="0"
                        />
                      </td>
                      <td className="border border-red-300 p-1">
                        <Textarea
                          value={operacion[category.key].calidad}
                          onChange={(e) => updateOperacion(category.key, 'calidad', e.target.value)}
                          className="text-xs h-4 resize-none border-red-200 px-2"
                          rows={1}
                        />
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-red-200 font-semibold">
                    <td className="border border-red-300 p-1 text-red-700 text-xs" colSpan={3}>
                      Monto Total de Operación
                    </td>
                    <td className="border border-red-300 p-1"></td>
                    <td className="border border-red-300 p-1 text-center text-red-700 text-xs">
                      ${montoTotalOperacion.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Summary Section */}
        <Card className="mt-6 p-6 bg-white border-red-200 border-2">
          <h3 className="text-xl font-bold mb-6 text-red-700">Resumen de Costos</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Implementación Summary */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-red-600">Implementación</h4>
              <div className="space-y-4">
                <div className="bg-red-50 p-6 rounded-lg text-center border border-red-200">
                  <div className="text-sm text-red-600">Tiempo Total de Implementación</div>
                  <div className="text-3xl font-bold text-red-700">{tiempoImplementacion} días</div>
                </div>
                <div className="bg-red-100 p-6 rounded-lg text-center border border-red-300">
                  <div className="text-sm text-red-600">Costo Total de Implementación</div>
                  <div className="text-3xl font-bold text-red-700">${montoTotalImplementacion.toLocaleString()}</div>
                </div>
              </div>
            </div>
            
            {/* Operación Summary */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-red-600">Operación</h4>
              <div className="space-y-4">
                <div className="bg-red-200 p-6 rounded-lg text-center border border-red-400">
                  <div className="text-sm text-red-600">Costo Total de Operación</div>
                  <div className="text-3xl font-bold text-red-700">${montoTotalOperacion.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
