
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SectionData, M6Data } from '@/types/project';

interface M6TableProps {
  title: string;
  data: SectionData;
  onUpdate: (category: keyof SectionData, field: keyof M6Data, value: string | number) => void;
  totalTime?: number;
  totalCost: number;
}

const M6Table: React.FC<M6TableProps> = ({ title, data, onUpdate, totalTime, totalCost }) => {
  const m6Categories = [
    { key: 'manoDeObra' as keyof SectionData, label: 'Mano de obra' },
    { key: 'metodologia' as keyof SectionData, label: 'Metodología' },
    { key: 'medicion' as keyof SectionData, label: 'Medición' },
    { key: 'maquinaria' as keyof SectionData, label: 'Maquinaria' },
    { key: 'materiales' as keyof SectionData, label: 'Materiales' },
    { key: 'medioAmbiente' as keyof SectionData, label: 'Medio Ambiente' }
  ];

  return (
    <Card className="p-6 bg-white border-gray-200 shadow-lg">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-lg mb-6 -m-6 mb-6">
        <h2 className="text-2xl font-bold text-center">
          {title}
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              <th className="border border-gray-200 p-4 text-left font-semibold text-gray-800 text-sm w-24">6 M's</th>
              <th className="border border-gray-200 p-4 text-left font-semibold text-gray-800 text-sm w-48">Descripción</th>
              <th className="border border-gray-200 p-4 text-center font-semibold text-gray-800 text-sm w-40">Tiempo (Días)</th>
              <th className="border border-gray-200 p-4 text-center font-semibold text-gray-800 text-sm w-40">Costo</th>
              <th className="border border-gray-200 p-4 text-center font-semibold text-gray-800 text-sm w-48">Calidad</th>
            </tr>
          </thead>
          <tbody>
            {m6Categories.map((category, index) => (
              <tr key={category.key} className={index % 2 === 0 ? 'bg-white hover:bg-gray-25' : 'bg-gray-50/50 hover:bg-gray-50'}>
                <td className="border border-gray-200 p-4 font-medium text-gray-800 text-sm align-top bg-gray-50/30">
                  {category.label}
                </td>
                <td className="border border-gray-200 p-3 align-top">
                  <Textarea
                    value={data[category.key].descripcion}
                    onChange={(e) => onUpdate(category.key, 'descripcion', e.target.value)}
                    className="text-sm border-gray-200 focus:border-red-500 focus:ring-red-500/20 rounded-md min-h-[80px] resize-none w-full transition-all duration-200"
                    rows={4}
                  />
                </td>
                <td className="border border-gray-200 p-3 align-top">
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-600 mb-2 font-medium">Duración:</div>
                      <Input
                        type="number"
                        value={data[category.key].duracion || ''}
                        onChange={(e) => onUpdate(category.key, 'duracion', Number(e.target.value))}
                        className="text-sm h-9 border-gray-200 focus:border-red-500 focus:ring-red-500/20 rounded-md font-medium w-full transition-all duration-200"
                        min="0"
                        max="99999"
                      />
                    </div>
                    <div>
                      <Textarea
                        value={data[category.key].duracionJustificacion}
                        onChange={(e) => onUpdate(category.key, 'duracionJustificacion', e.target.value)}
                        className="text-xs border-gray-200 focus:border-red-500 focus:ring-red-500/20 rounded-md min-h-[60px] resize-none w-full transition-all duration-200"
                        rows={3}
                      />
                    </div>
                  </div>
                </td>
                <td className="border border-gray-200 p-3 align-top">
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-600 mb-2 font-medium">Monto: $</div>
                      <Input
                        type="number"
                        value={data[category.key].monto || ''}
                        onChange={(e) => onUpdate(category.key, 'monto', Number(e.target.value))}
                        className="text-sm h-9 border-gray-200 focus:border-red-500 focus:ring-red-500/20 rounded-md font-medium w-full transition-all duration-200"
                        min="0"
                        max="9999999999"
                      />
                    </div>
                    <div>
                      <Textarea
                        value={data[category.key].montoJustificacion}
                        onChange={(e) => onUpdate(category.key, 'montoJustificacion', e.target.value)}
                        className="text-xs border-gray-200 focus:border-red-500 focus:ring-red-500/20 rounded-md min-h-[60px] resize-none w-full transition-all duration-200"
                        rows={3}
                      />
                    </div>
                  </div>
                </td>
                <td className="border border-gray-200 p-3 align-top">
                  <Textarea
                    value={data[category.key].calidad}
                    onChange={(e) => onUpdate(category.key, 'calidad', e.target.value)}
                    className="text-sm border-gray-200 focus:border-red-500 focus:ring-red-500/20 rounded-md min-h-[80px] resize-none w-full transition-all duration-200"
                    rows={4}
                  />
                </td>
              </tr>
            ))}
            <tr className="bg-gradient-to-r from-red-50 to-red-100 font-semibold">
              {title === 'Implementación' ? (
                <>
                  <td className="border border-gray-200 p-4 text-gray-800 text-sm">Tiempo de Implementación</td>
                  <td className="border border-gray-200 p-4"></td>
                  <td className="border border-gray-200 p-4 text-center text-red-700 text-sm font-bold">
                    {totalTime} días
                  </td>
                  <td className="border border-gray-200 p-4 text-center text-red-700 text-sm font-bold" colSpan={2}>
                    Monto Total de Implementación: ${totalCost.toLocaleString()}
                  </td>
                </>
              ) : (
                <>
                  <td className="border border-gray-200 p-4 text-gray-800 text-sm" colSpan={3}>
                    Monto Total de Operación
                  </td>
                  <td className="border border-gray-200 p-4"></td>
                  <td className="border border-gray-200 p-4 text-center text-red-700 text-sm font-bold">
                    ${totalCost.toLocaleString()}
                  </td>
                </>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default M6Table;
