
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
    <Card className="p-4 bg-white border-red-200 border-2">
      <h2 className="text-2xl font-bold text-center mb-4 bg-red-600 text-white py-3 rounded">
        {title}
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-red-300">
          <thead>
            <tr className="bg-red-100">
              <th className="border border-red-300 p-2 text-left font-semibold text-red-700 text-base w-20">6 M's</th>
              <th className="border border-red-300 p-2 text-left font-semibold text-red-700 text-base w-44">Descripción</th>
              <th className="border border-red-300 p-2 text-center font-semibold text-red-700 text-base w-36">Tiempo (Días)</th>
              <th className="border border-red-300 p-2 text-center font-semibold text-red-700 text-base w-36">Costo</th>
              <th className="border border-red-300 p-2 text-center font-semibold text-red-700 text-base w-44">Calidad</th>
            </tr>
          </thead>
          <tbody>
            {m6Categories.map((category, index) => (
              <tr key={category.key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border border-red-300 p-2 font-medium text-red-700 text-base align-top">
                  {category.label}
                </td>
                <td className="border border-red-300 p-2 align-top">
                  <Textarea
                    value={data[category.key].descripcion}
                    onChange={(e) => onUpdate(category.key, 'descripcion', e.target.value)}
                    className="text-sm border-red-200 px-2 py-1 min-h-[80px] resize-none w-full"
                    rows={4}
                  />
                </td>
                <td className="border border-red-300 p-2 align-top">
                  <div className="space-y-2">
                    <div>
                      <div className="text-sm text-red-600 mb-1 font-medium">Duración:</div>
                      <Input
                        type="number"
                        value={data[category.key].duracion || ''}
                        onChange={(e) => onUpdate(category.key, 'duracion', Number(e.target.value))}
                        className="text-base h-8 border-red-200 px-2 font-medium w-full"
                        min="0"
                        max="99999"
                      />
                    </div>
                    <div>
                      <Textarea
                        value={data[category.key].duracionJustificacion}
                        onChange={(e) => onUpdate(category.key, 'duracionJustificacion', e.target.value)}
                        className="text-xs border-red-200 px-2 py-1 min-h-[60px] resize-none w-full"
                        rows={3}
                      />
                    </div>
                  </div>
                </td>
                <td className="border border-red-300 p-2 align-top">
                  <div className="space-y-2">
                    <div>
                      <div className="text-sm text-red-600 mb-1 font-medium">Monto: $</div>
                      <Input
                        type="number"
                        value={data[category.key].monto || ''}
                        onChange={(e) => onUpdate(category.key, 'monto', Number(e.target.value))}
                        className="text-base h-8 border-red-200 px-2 font-medium w-full"
                        min="0"
                        max="9999999999"
                      />
                    </div>
                    <div>
                      <Textarea
                        value={data[category.key].montoJustificacion}
                        onChange={(e) => onUpdate(category.key, 'montoJustificacion', e.target.value)}
                        className="text-xs border-red-200 px-2 py-1 min-h-[60px] resize-none w-full"
                        rows={3}
                      />
                    </div>
                  </div>
                </td>
                <td className="border border-red-300 p-2 align-top">
                  <Textarea
                    value={data[category.key].calidad}
                    onChange={(e) => onUpdate(category.key, 'calidad', e.target.value)}
                    className="text-sm border-red-200 px-2 py-1 min-h-[80px] resize-none w-full"
                    rows={4}
                  />
                </td>
              </tr>
            ))}
            <tr className="bg-red-200 font-semibold">
              {title === 'Implementación' ? (
                <>
                  <td className="border border-red-300 p-2 text-red-700 text-sm">Tiempo de Implementación</td>
                  <td className="border border-red-300 p-2"></td>
                  <td className="border border-red-300 p-2 text-center text-red-700 text-sm">
                    {totalTime} días
                  </td>
                  <td className="border border-red-300 p-2 text-center text-red-700 text-sm" colSpan={2}>
                    Monto Total de Implementación: ${totalCost.toLocaleString()}
                  </td>
                </>
              ) : (
                <>
                  <td className="border border-red-300 p-2 text-red-700 text-sm" colSpan={3}>
                    Monto Total de Operación
                  </td>
                  <td className="border border-red-300 p-2"></td>
                  <td className="border border-red-300 p-2 text-center text-red-700 text-sm">
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
