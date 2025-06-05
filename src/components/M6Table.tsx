import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Expand, Shrink, Clock, DollarSign } from 'lucide-react';
import { SectionData } from '@/types/project';
import { formatNumber } from '@/utils/formatCurrency';

interface M6TableProps {
  title: string;
  data: SectionData;
  onUpdate: (category: keyof SectionData, field: keyof SectionData[keyof SectionData], value: string | number) => void;
  totalTime?: number;
  totalCost?: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const M6Table: React.FC<M6TableProps> = ({ 
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
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onToggleExpand}>
          {isExpanded ? <Shrink className="h-5 w-5" /> : <Expand className="h-5 w-5" />}
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Tiempo <Clock className="h-4 w-4 inline-block" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Justificación Tiempo
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Costo <DollarSign className="h-4 w-4 inline-block" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Justificación Costo
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Calidad
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Descripción
              </th>
            </tr>
          </thead>
          
          <tbody>
            {categories.map((category) => (
              <tr key={category.key} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-4 font-medium text-gray-900">{category.name}</td>
                <td className="px-4 py-4">
                  <Input
                    type="number"
                    value={data[category.key].duracion || ''}
                    onChange={(e) => onUpdate(category.key, 'duracion', parseFloat(e.target.value) || 0)}
                    className="border-gray-200 focus:border-red-600 focus:ring-red-600/20 text-right"
                    placeholder="0"
                  />
                </td>
                <td className="px-4 py-4">
                  <Textarea
                    value={data[category.key].duracionJustificacion || ''}
                    onChange={(e) => onUpdate(category.key, 'duracionJustificacion', e.target.value)}
                    className="border-gray-200 focus:border-red-600 focus:ring-red-600/20"
                    rows={1}
                    placeholder="Justificación"
                  />
                </td>
                <td className="px-4 py-4">
                  <Input
                    type="number"
                    value={data[category.key].monto || ''}
                    onChange={(e) => onUpdate(category.key, 'monto', parseFloat(e.target.value) || 0)}
                    className="border-gray-200 focus:border-red-600 focus:ring-red-600/20 text-right"
                    placeholder="0.00"
                  />
                </td>
                <td className="px-4 py-4">
                  <Textarea
                    value={data[category.key].montoJustificacion || ''}
                    onChange={(e) => onUpdate(category.key, 'montoJustificacion', e.target.value)}
                    className="border-gray-200 focus:border-red-600 focus:ring-red-600/20"
                    rows={1}
                    placeholder="Justificación"
                  />
                </td>
                <td className="px-4 py-4">
                  <Input
                    value={data[category.key].calidad || ''}
                    onChange={(e) => onUpdate(category.key, 'calidad', e.target.value)}
                    className="border-gray-200 focus:border-red-600 focus:ring-red-600/20"
                    placeholder="Calidad"
                  />
                </td>
                <td className="px-4 py-4">
                  <Textarea
                    value={data[category.key].descripcion || ''}
                    onChange={(e) => onUpdate(category.key, 'descripcion', e.target.value)}
                    className="border-gray-200 focus:border-red-600 focus:ring-red-600/20"
                    rows={1}
                    placeholder="Descripción"
                  />
                </td>
              </tr>
            ))}
          </tbody>
          
          <tfoot className="bg-gradient-to-r from-red-600 to-red-700 text-white">
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

export default M6Table;
