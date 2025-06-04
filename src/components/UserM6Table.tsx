
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Maximize2, Minimize2 } from 'lucide-react';
import { SectionData } from '@/types/project';

interface UserM6TableProps {
  title: string;
  data: SectionData;
  onUpdate: (category: keyof SectionData, field: keyof SectionData[keyof SectionData], value: string | number) => void;
  totalTime?: number;
  totalCost: number;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

const UserM6Table: React.FC<UserM6TableProps> = ({ 
  title, 
  data, 
  onUpdate, 
  totalTime, 
  totalCost,
  isExpanded = false,
  onToggleExpand
}) => {
  const msCategories = [
    { key: 'manoDeObra' as keyof SectionData, label: 'Mano de Obra' },
    { key: 'metodologia' as keyof SectionData, label: 'Metodología' },
    { key: 'medicion' as keyof SectionData, label: 'Medición' },
    { key: 'maquinaria' as keyof SectionData, label: 'Maquinaria' },
    { key: 'materiales' as keyof SectionData, label: 'Materiales' },
    { key: 'medioAmbiente' as keyof SectionData, label: 'Medio Ambiente' }
  ];

  return (
    <Card className={`bg-white border-gray-200 shadow-md transition-all duration-300 ${
      isExpanded ? 'col-span-full' : ''
    }`}>
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
          {onToggleExpand && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleExpand}
              className="text-gray-600 hover:text-gray-800"
            >
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-700">M's</th>
                {title === 'Implementación' && (
                  <th className="text-left py-3 px-2 font-semibold text-gray-700 min-w-[120px]">Duración (días)</th>
                )}
                <th className="text-left py-3 px-2 font-semibold text-gray-700 min-w-[120px]">Monto ($)</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700 min-w-[120px]">Calidad (%)</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700 min-w-[200px]">Descripción</th>
                {title === 'Implementación' && (
                  <th className="text-left py-3 px-2 font-semibold text-gray-700 min-w-[200px]">Justificación de Duración</th>
                )}
                <th className="text-left py-3 px-2 font-semibold text-gray-700 min-w-[200px]">Justificación de Monto</th>
              </tr>
            </thead>
            <tbody>
              {msCategories.map((category) => (
                <tr key={category.key} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-2 font-medium text-gray-900">{category.label}</td>
                  {title === 'Implementación' && (
                    <td className="py-4 px-2">
                      <Input
                        type="number"
                        value={data[category.key].duracion || ''}
                        onChange={(e) => onUpdate(category.key, 'duracion', Number(e.target.value))}
                        placeholder="0"
                        className="border-gray-200 focus:border-gray-500 focus:ring-gray-500/20 rounded-lg"
                      />
                    </td>
                  )}
                  <td className="py-4 px-2">
                    <Input
                      type="number"
                      value={data[category.key].monto || ''}
                      onChange={(e) => onUpdate(category.key, 'monto', Number(e.target.value))}
                      placeholder="0"
                      className="border-gray-200 focus:border-gray-500 focus:ring-gray-500/20 rounded-lg"
                    />
                  </td>
                  <td className="py-4 px-2">
                    <Input
                      value={data[category.key].calidad || ''}
                      onChange={(e) => onUpdate(category.key, 'calidad', e.target.value)}
                      placeholder="0%"
                      className="border-gray-200 focus:border-gray-500 focus:ring-gray-500/20 rounded-lg"
                    />
                  </td>
                  <td className="py-4 px-2">
                    <Textarea
                      value={data[category.key].descripcion || ''}
                      onChange={(e) => onUpdate(category.key, 'descripcion', e.target.value)}
                      placeholder="Descripción..."
                      className="border-gray-200 focus:border-gray-500 focus:ring-gray-500/20 rounded-lg min-h-[60px]"
                      rows={2}
                    />
                  </td>
                  {title === 'Implementación' && (
                    <td className="py-4 px-2">
                      <Textarea
                        value={data[category.key].duracionJustificacion || ''}
                        onChange={(e) => onUpdate(category.key, 'duracionJustificacion', e.target.value)}
                        placeholder="Justificación..."
                        className="border-gray-200 focus:border-gray-500 focus:ring-gray-500/20 rounded-lg min-h-[60px]"
                        rows={2}
                      />
                    </td>
                  )}
                  <td className="py-4 px-2">
                    <Textarea
                      value={data[category.key].montoJustificacion || ''}
                      onChange={(e) => onUpdate(category.key, 'montoJustificacion', e.target.value)}
                      placeholder="Justificación..."
                      className="border-gray-200 focus:border-gray-500 focus:ring-gray-500/20 rounded-lg min-h-[60px]"
                      rows={2}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Summary section */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex flex-wrap gap-6">
            {totalTime !== undefined && (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-600">Tiempo Total</span>
                <span className="text-lg font-bold text-gray-900">{totalTime} días</span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600">Costo Total</span>
              <span className="text-lg font-bold text-gray-900">${totalCost.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserM6Table;
