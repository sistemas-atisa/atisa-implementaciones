
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
    <Card className="p-8 bg-white border-gray-200 shadow-xl">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-6 px-8 rounded-xl mb-8 -m-8 mb-8">
        <h2 className="text-2xl font-bold text-center">
          {title}
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-gradient-to-r from-gray-800 to-gray-900">
              <th className="border border-gray-200 py-3 px-2 text-left font-bold text-white text-sm" style={{width: '15%'}}>6 M's</th>
              <th className="border border-gray-200 py-3 px-2 text-left font-bold text-white text-sm" style={{width: '25%'}}>Descripción</th>
              <th className="border border-gray-200 py-3 px-2 text-center font-bold text-white text-sm" style={{width: '20%'}}>Tiempo (Días)</th>
              <th className="border border-gray-200 py-3 px-2 text-center font-bold text-white text-sm" style={{width: '20%'}}>Costo</th>
              <th className="border border-gray-200 py-3 px-2 text-center font-bold text-white text-sm" style={{width: '20%'}}>Calidad</th>
            </tr>
          </thead>
          <tbody>
            {m6Categories.map((category, index) => (
              <tr key={category.key} className={index % 2 === 0 ? 'bg-white hover:bg-gray-25' : 'bg-gray-25 hover:bg-gray-50'}>
                <td className="border border-gray-200 p-1 font-semibold text-gray-900 text-sm align-top bg-gray-50" style={{width: '15%'}}>
                  {category.label}
                </td>
                <td className="border border-gray-200 p-1 align-top" style={{width: '25%'}}>
                  <Textarea
                    value={data[category.key].descripcion}
                    onChange={(e) => onUpdate(category.key, 'descripcion', e.target.value)}
                    className="text-sm border-gray-200 focus:border-red-600 focus:ring-red-600/20 rounded-lg min-h-[80px] resize-none w-full transition-all duration-200"
                    rows={4}
                  />
                </td>
                <td className="border border-gray-200 p-1 align-top" style={{width: '20%'}}>
                  <div className="space-y-1">
                    <div>
                      <div className="text-xs text-gray-700 mb-1 font-semibold">Duración:</div>
                      <Input
                        type="number"
                        value={data[category.key].duracion || ''}
                        onChange={(e) => onUpdate(category.key, 'duracion', Number(e.target.value))}
                        className="text-sm h-6 border-gray-200 focus:border-red-600 focus:ring-red-600/20 rounded-lg font-medium w-full transition-all duration-200"
                        min="0"
                        max="99999"
                      />
                    </div>
                    <div>
                      <Textarea
                        value={data[category.key].duracionJustificacion}
                        onChange={(e) => onUpdate(category.key, 'duracionJustificacion', e.target.value)}
                        className="text-xs border-gray-200 focus:border-red-600 focus:ring-red-600/20 rounded-lg min-h-[40px] resize-none w-full transition-all duration-200"
                        rows={2}
                      />
                    </div>
                  </div>
                </td>
                <td className="border border-gray-200 p-1 align-top" style={{width: '20%'}}>
                  <div className="space-y-1">
                    <div>
                      <div className="text-xs text-gray-700 mb-1 font-semibold">Monto: $</div>
                      <Input
                        type="number"
                        value={data[category.key].monto || ''}
                        onChange={(e) => onUpdate(category.key, 'monto', Number(e.target.value))}
                        className="text-sm h-6 border-gray-200 focus:border-red-600 focus:ring-red-600/20 rounded-lg font-medium w-full transition-all duration-200"
                        min="0"
                        max="9999999999"
                      />
                    </div>
                    <div>
                      <Textarea
                        value={data[category.key].montoJustificacion}
                        onChange={(e) => onUpdate(category.key, 'montoJustificacion', e.target.value)}
                        className="text-xs border-gray-200 focus:border-red-600 focus:ring-red-600/20 rounded-lg min-h-[40px] resize-none w-full transition-all duration-200"
                        rows={2}
                      />
                    </div>
                  </div>
                </td>
                <td className="border border-gray-200 p-1 align-top" style={{width: '20%'}}>
                  <Textarea
                    value={data[category.key].calidad}
                    onChange={(e) => onUpdate(category.key, 'calidad', e.target.value)}
                    className="text-sm border-gray-200 focus:border-red-600 focus:ring-red-600/20 rounded-lg min-h-[80px] resize-none w-full transition-all duration-200"
                    rows={4}
                  />
                </td>
              </tr>
            ))}
            <tr className="bg-gradient-to-r from-red-50 to-red-100 font-semibold">
              {title === 'Implementación' ? (
                <>
                  <td className="border border-gray-200 py-3 px-2 text-gray-900 text-sm" style={{width: '15%'}}>Tiempo de Implementación</td>
                  <td className="border border-gray-200 py-3 px-2" style={{width: '25%'}}></td>
                  <td className="border border-gray-200 py-3 px-2 text-center text-red-700 text-sm font-bold" style={{width: '20%'}}>
                    {totalTime} días
                  </td>
                  <td className="border border-gray-200 py-3 px-2 text-center text-red-700 text-sm font-bold" style={{width: '20%'}}>
                    ${totalCost.toLocaleString()}
                  </td>
                  <td className="border border-gray-200 py-3 px-2" style={{width: '20%'}}></td>
                </>
              ) : (
                <>
                  <td className="border border-gray-200 py-3 px-2 text-gray-900 text-sm" style={{width: '15%'}}>Monto Total</td>
                  <td className="border border-gray-200 py-3 px-2" style={{width: '25%'}}></td>
                  <td className="border border-gray-200 py-3 px-2" style={{width: '20%'}}></td>
                  <td className="border border-gray-200 py-3 px-2 text-center text-red-700 text-sm font-bold" style={{width: '20%'}}>
                    ${totalCost.toLocaleString()}
                  </td>
                  <td className="border border-gray-200 py-3 px-2" style={{width: '20%'}}></td>
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
