import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface M6Data {
  duracion: number;
  duracionJustificacion: string;
  monto: number;
  montoJustificacion: string;
  calidad: string;
  descripcion: string;
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
  const [razon1, setRazon1] = useState('');
  const [razon2, setRazon2] = useState('');
  const [razon3, setRazon3] = useState('');
  
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
              <img 
                src="/lovable-uploads/441a03f4-a193-4088-8265-7f033451acc1.png" 
                alt="ATISA GROUP Logo" 
                className="h-12 object-contain"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="implementacion" className="font-semibold text-red-700">Nombre de implementación</Label>
                <Input
                  id="implementacion"
                  value={nombreImplementacion}
                  onChange={(e) => setNombreImplementacion(e.target.value)}
                  className="mt-1 border-red-200 focus:border-red-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
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
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <Label className="font-semibold text-red-700">Habilidades</Label>
                <div className="mt-2 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-red-600 font-semibold text-sm">#1</span>
                    <Input
                      value={razon1}
                      onChange={(e) => setRazon1(e.target.value)}
                      placeholder="¿Que habilidad nueva nos da?"
                      className="border-red-200 focus:border-red-400"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600 font-semibold text-sm">#2</span>
                    <Input
                      value={razon2}
                      onChange={(e) => setRazon2(e.target.value)}
                      className="border-red-200 focus:border-red-400"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600 font-semibold text-sm">#3</span>
                    <Input
                      value={razon3}
                      onChange={(e) => setRazon3(e.target.value)}
                      className="border-red-200 focus:border-red-400"
                    />
                  </div>
                </div>
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
                    <th className="border border-red-300 p-1 text-left font-semibold text-red-700 text-xs w-20">6 M's</th>
                    <th className="border border-red-300 p-1 text-left font-semibold text-red-700 text-xs w-44">Descripción</th>
                    <th className="border border-red-300 p-1 text-center font-semibold text-red-700 text-xs w-36">Tiempo</th>
                    <th className="border border-red-300 p-1 text-center font-semibold text-red-700 text-xs w-36">Costo</th>
                    <th className="border border-red-300 p-1 text-center font-semibold text-red-700 text-xs w-44">Calidad</th>
                  </tr>
                </thead>
                <tbody>
                  {m6Categories.map((category, index) => (
                    <tr key={category.key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-red-300 p-1 font-medium text-red-700 text-xs w-20">
                        {category.label}
                      </td>
                      <td className="border border-red-300 p-1 w-44">
                        <Textarea
                          value={implementacion[category.key].descripcion}
                          onChange={(e) => updateImplementacion(category.key, 'descripcion', e.target.value)}
                          className="text-xs border-red-200 px-2 py-1 min-h-[80px] resize-none"
                          rows={4}
                        />
                      </td>
                      <td className="border border-red-300 p-1 w-36">
                        <div className="space-y-1">
                          <div>
                            <div className="text-xs text-red-600 mb-0.5">Duración:</div>
                            <Input
                              type="number"
                              value={implementacion[category.key].duracion || ''}
                              onChange={(e) => updateImplementacion(category.key, 'duracion', Number(e.target.value))}
                              className="text-base h-6 border-red-200 px-1 font-medium"
                              min="0"
                              max="99999"
                            />
                          </div>
                          <div>
                            <Textarea
                              value={implementacion[category.key].duracionJustificacion}
                              onChange={(e) => updateImplementacion(category.key, 'duracionJustificacion', e.target.value)}
                              className="text-xs border-red-200 px-2 py-1 min-h-[60px] resize-none"
                              rows={3}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="border border-red-300 p-1 w-36">
                        <div className="space-y-1">
                          <div>
                            <div className="text-xs text-red-600 mb-0.5">Monto: $</div>
                            <Input
                              type="number"
                              value={implementacion[category.key].monto || ''}
                              onChange={(e) => updateImplementacion(category.key, 'monto', Number(e.target.value))}
                              className="text-base h-6 border-red-200 px-1 font-medium"
                              min="0"
                              max="9999999999"
                            />
                          </div>
                          <div>
                            <Textarea
                              value={implementacion[category.key].montoJustificacion}
                              onChange={(e) => updateImplementacion(category.key, 'montoJustificacion', e.target.value)}
                              className="text-xs border-red-200 px-2 py-1 min-h-[60px] resize-none"
                              rows={3}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="border border-red-300 p-1 w-44">
                        <Textarea
                          value={implementacion[category.key].calidad}
                          onChange={(e) => updateImplementacion(category.key, 'calidad', e.target.value)}
                          className="text-xs border-red-200 px-2 py-1 min-h-[80px] resize-none"
                          rows={4}
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
                    <th className="border border-red-300 p-1 text-left font-semibold text-red-700 text-xs w-20">6 M's</th>
                    <th className="border border-red-300 p-1 text-left font-semibold text-red-700 text-xs w-44">Descripción</th>
                    <th className="border border-red-300 p-1 text-center font-semibold text-red-700 text-xs w-36">Tiempo</th>
                    <th className="border border-red-300 p-1 text-center font-semibold text-red-700 text-xs w-36">Costo</th>
                    <th className="border border-red-300 p-1 text-center font-semibold text-red-700 text-xs w-44">Calidad</th>
                  </tr>
                </thead>
                <tbody>
                  {m6Categories.map((category, index) => (
                    <tr key={category.key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-red-300 p-1 font-medium text-red-700 text-xs w-20">
                        {category.label}
                      </td>
                      <td className="border border-red-300 p-1 w-44">
                        <Textarea
                          value={operacion[category.key].descripcion}
                          onChange={(e) => updateOperacion(category.key, 'descripcion', e.target.value)}
                          className="text-xs border-red-200 px-2 py-1 min-h-[80px] resize-none"
                          rows={4}
                        />
                      </td>
                      <td className="border border-red-300 p-1 w-36">
                        <div className="space-y-1">
                          <div>
                            <div className="text-xs text-red-600 mb-0.5">Duración:</div>
                            <Input
                              type="number"
                              value={operacion[category.key].duracion || ''}
                              onChange={(e) => updateOperacion(category.key, 'duracion', Number(e.target.value))}
                              className="text-base h-6 border-red-200 px-1 font-medium"
                              min="0"
                              max="99999"
                            />
                          </div>
                          <div>
                            <Textarea
                              value={operacion[category.key].duracionJustificacion}
                              onChange={(e) => updateOperacion(category.key, 'duracionJustificacion', e.target.value)}
                              className="text-xs border-red-200 px-2 py-1 min-h-[60px] resize-none"
                              rows={3}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="border border-red-300 p-1 w-36">
                        <div className="space-y-1">
                          <div>
                            <div className="text-xs text-red-600 mb-0.5">Monto: $</div>
                            <Input
                              type="number"
                              value={operacion[category.key].monto || ''}
                              onChange={(e) => updateOperacion(category.key, 'monto', Number(e.target.value))}
                              className="text-base h-6 border-red-200 px-1 font-medium"
                              min="0"
                              max="9999999999"
                            />
                          </div>
                          <div>
                            <Textarea
                              value={operacion[category.key].montoJustificacion}
                              onChange={(e) => updateOperacion(category.key, 'montoJustificacion', e.target.value)}
                              className="text-xs border-red-200 px-2 py-1 min-h-[60px] resize-none"
                              rows={3}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="border border-red-300 p-1 w-44">
                        <Textarea
                          value={operacion[category.key].calidad}
                          onChange={(e) => updateOperacion(category.key, 'calidad', e.target.value)}
                          className="text-xs border-red-200 px-2 py-1 min-h-[80px] resize-none"
                          rows={4}
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
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
                  <div className="text-xs text-red-600">Tiempo Total</div>
                  <div className="text-lg font-bold text-red-700">{tiempoImplementacion} días</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
                  <div className="text-xs text-red-600">Costo Total</div>
                  <div className="text-lg font-bold text-red-700">${montoTotalImplementacion.toLocaleString()}</div>
                </div>
              </div>
            </div>
            
            {/* Operación Summary */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-red-600">Operación</h4>
              <div className="space-y-4">
                <div className="bg-red-200 p-4 rounded-lg border border-red-400 text-center">
                  <div className="text-xs text-red-600">Costo Total de Operación</div>
                  <div className="text-lg font-bold text-red-700">${montoTotalOperacion.toLocaleString()}</div>
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
