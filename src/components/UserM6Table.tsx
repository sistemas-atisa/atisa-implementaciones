import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Expand, Shrink, Clock, DollarSign } from 'lucide-react';
import { SectionData } from '@/types/project';
import { formatNumber } from '@/utils/formatCurrency';

interface M6TableProps {
  title: string;
  data: SectionData;
  onUpdate: (category: keyof SectionData, field: keyof SectionData[keyof SectionData], value: string | number) => void;
  totalTime: number;
  totalCost: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const UserM6Table: React.FC<M6TableProps> = ({ 
  title, 
  data, 
  onUpdate, 
  totalTime, 
  totalCost, 
  isExpanded, 
  onToggleExpand 
}) => {
  const categories = [
    { name: 'Mano de Obra', key: 'manoDeObra' },
    { name: 'Metodología', key: 'metodologia' },
    { name: 'Medición', key: 'medicion' },
    { name: 'Maquinaria', key: 'maquinaria' },
    { name: 'Materiales', key: 'materiales' },
    { name: 'Medio Ambiente', key: 'medioAmbiente' }
  ];

  return (
    <Card className="p-6 bg-white border-gray-200 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <Button variant="ghost" size="sm" onClick={onToggleExpand}>
          {isExpanded ? (
            <>
              <Shrink className="h-4 w-4 mr-2" />
              Colapsar
            </>
          ) : (
            <>
              <Expand className="h-4 w-4 mr-2" />
              Expandir
            </>
          )}
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="px-4 py-3 text-left">Categoría</th>
              <th className="px-4 py-3 text-right">Tiempo (días)</th>
              <th className="px-4 py-3 text-left">Justificación Tiempo</th>
              <th className="px-4 py-3 text-right">Costo</th>
              <th className="px-4 py-3 text-left">Justificación Costo</th>
              <th className="px-4 py-3 text-left">Calidad</th>
              <th className="px-4 py-3 text-left">Descripción</th>
            </tr>
          </thead>
          
          <tbody>
            {categories.map((category) => (
              <tr key={category.key} className="border-b border-gray-100">
                <td className="px-4 py-4 font-medium text-gray-900">{category.name}</td>
                <td className="px-4 py-4 text-right">
                  {data[category.key].duracion ? `${formatNumber(data[category.key].duracion as number)} días` : '0 días'}
                </td>
                <td className="px-4 py-4 text-gray-700">{data[category.key].duracionJustificacion || 'Sin especificar'}</td>
                <td className="px-4 py-4 text-right font-medium">
                  ${formatNumber((data[category.key].monto as number) || 0)}
                </td>
                <td className="px-4 py-4 text-gray-700">{data[category.key].montoJustificacion || 'Sin especificar'}</td>
                <td className="px-4 py-4 text-gray-700">{data[category.key].calidad || 'Sin especificar'}</td>
                <td className="px-4 py-4 text-gray-700">{data[category.key].descripcion || 'Sin especificar'}</td>
              </tr>
            ))}
          </tbody>
          
          <tfoot className="bg-gradient-to-r from-gray-600 to-gray-700 text-white">
            <tr>
              <td className="px-4 py-4 font-bold">TOTAL</td>
              <td className="px-4 py-4 font-bold text-right">
                {totalTime ? `${formatNumber(totalTime)} días` : '0 días'}
              </td>
              <td className="px-4 py-4"></td>
              <td className="px-4 py-4 font-bold text-right">
                ${formatNumber(totalCost || 0)}
              </td>
              <td className="px-4 py-4"></td>
              <td className="px-4 py-4"></td>
              <td className="px-4 py-4"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
};

export default UserM6Table;
