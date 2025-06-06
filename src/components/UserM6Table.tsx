
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Expand, Plus, Minus, MessageCircle, Upload } from 'lucide-react';
import { SectionData, M6Data } from '@/types/project';

interface UserM6TableProps {
  title: string;
  data: SectionData;
  onUpdate: (category: keyof SectionData, field: keyof M6Data, value: string | number) => void;
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
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});
  
  const m6Categories = [
    { key: 'manoDeObra' as keyof SectionData, label: 'Mano de obra' },
    { key: 'metodologia' as keyof SectionData, label: 'Metodología' },
    { key: 'medicion' as keyof SectionData, label: 'Medición' },
    { key: 'maquinaria' as keyof SectionData, label: 'Maquinaria' },
    { key: 'materiales' as keyof SectionData, label: 'Materiales' },
    { key: 'medioAmbiente' as keyof SectionData, label: 'Medio Ambiente' }
  ];

  const toggleRow = (categoryKey: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };

  return (
    <Card className="p-1 bg-white border-gray-200 shadow-xl">
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white py-3 px-3 rounded-xl mb-1 -m-1 mb-1 relative">
        <h2 className="text-xl font-bold text-center pr-12">
          {title}
        </h2>
        {onToggleExpand && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleExpand}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 p-2"
          >
            <Expand 
              className={`h-5 w-5 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`} 
            />
          </Button>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-gradient-to-r from-gray-800 to-gray-900">
              <th className="border border-gray-200 py-2 px-1 text-left font-bold text-white text-xs" style={{width: '15%'}}>6 M's</th>
              <th className="border border-gray-200 py-2 px-1 text-left font-bold text-white text-xs" style={{width: '25%'}}>Descripción</th>
              <th className="border border-gray-200 py-2 px-1 text-center font-bold text-white text-xs" style={{width: '20%'}}>Tiempo (Días)</th>
              <th className="border border-gray-200 py-2 px-1 text-center font-bold text-white text-xs" style={{width: '20%'}}>Costo</th>
              <th className="border border-gray-200 py-2 px-1 text-center font-bold text-white text-xs" style={{width: '20%'}}>Calidad</th>
              <th className="border border-gray-200 py-2 px-1 text-center font-bold text-white text-xs" style={{width: '10%'}}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {m6Categories.map((category, index) => (
              <React.Fragment key={category.key}>
                {/* Main row */}
                <tr className={index % 2 === 0 ? 'bg-white hover:bg-gray-25' : 'bg-gray-25 hover:bg-gray-50'}>
                  <td className="border border-gray-200 p-0.5 font-semibold text-gray-900 text-xs align-top bg-gray-50" style={{width: '15%'}}>
                    <div className="p-1 flex items-center gap-1">
                      <button
                        onClick={() => toggleRow(category.key)}
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        {expandedRows[category.key] ? (
                          <Minus className="h-3 w-3" />
                        ) : (
                          <Plus className="h-3 w-3" />
                        )}
                      </button>
                      <span>{category.label}</span>
                    </div>
                  </td>
                  <td className="border border-gray-200 p-0.5 align-top" style={{width: '25%'}}>
                    <Textarea
                      value={data[category.key].descripcion}
                      onChange={(e) => onUpdate(category.key, 'descripcion', e.target.value)}
                      className="text-xs border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 rounded-lg min-h-[60px] resize-none w-full transition-all duration-200"
                      rows={3}
                    />
                  </td>
                  <td className="border border-gray-200 p-0.5 align-top" style={{width: '20%'}}>
                    <div className="space-y-0.5">
                      <div>
                        <div className="text-xs text-gray-700 mb-0.5 font-semibold">Duración:</div>
                        <Input
                          type="number"
                          value={data[category.key].duracion || ''}
                          onChange={(e) => onUpdate(category.key, 'duracion', Number(e.target.value))}
                          className="text-xs h-5 border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 rounded-lg font-medium w-full transition-all duration-200"
                          min="0"
                          max="99999"
                        />
                      </div>
                      <div>
                        <Textarea
                          value={data[category.key].duracionJustificacion}
                          onChange={(e) => onUpdate(category.key, 'duracionJustificacion', e.target.value)}
                          className="text-xs border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 rounded-lg min-h-[30px] resize-none w-full transition-all duration-200"
                          rows={2}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="border border-gray-200 p-0.5 align-top" style={{width: '20%'}}>
                    <div className="space-y-0.5">
                      <div>
                        <div className="text-xs text-gray-700 mb-0.5 font-semibold">Monto: $</div>
                        <Input
                          type="number"
                          value={data[category.key].monto || ''}
                          onChange={(e) => onUpdate(category.key, 'monto', Number(e.target.value))}
                          className="text-xs h-5 border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 rounded-lg font-medium w-full transition-all duration-200"
                          min="0"
                          max="9999999999"
                        />
                      </div>
                      <div>
                        <Textarea
                          value={data[category.key].montoJustificacion}
                          onChange={(e) => onUpdate(category.key, 'montoJustificacion', e.target.value)}
                          className="text-xs border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 rounded-lg min-h-[30px] resize-none w-full transition-all duration-200"
                          rows={2}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="border border-gray-200 p-0.5 align-top" style={{width: '20%'}}>
                    <Textarea
                      value={data[category.key].calidad}
                      onChange={(e) => onUpdate(category.key, 'calidad', e.target.value)}
                      className="text-xs border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 rounded-lg min-h-[60px] resize-none w-full transition-all duration-200"
                      rows={3}
                    />
                  </td>
                  <td className="border border-gray-200 p-0.5 align-top" style={{width: '10%'}}>
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 w-full text-xs border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                      >
                        <MessageCircle className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 w-full text-xs border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                      >
                        <Upload className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
                
                {/* Expanded sub-row */}
                {expandedRows[category.key] && (
                  <tr className={index % 2 === 0 ? 'bg-gray-25 hover:bg-gray-50' : 'bg-white hover:bg-gray-25'}>
                    <td className="border border-gray-200 p-0.5 font-semibold text-gray-700 text-xs align-top bg-gray-100" style={{width: '15%'}}>
                      <div className="p-1 pl-6">
                        <span className="text-gray-600">Sub-{category.label}</span>
                      </div>
                    </td>
                    <td className="border border-gray-200 p-0.5 align-top" style={{width: '25%'}}>
                      <Textarea
                        placeholder="Descripción adicional..."
                        className="text-xs border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 rounded-lg min-h-[60px] resize-none w-full transition-all duration-200"
                        rows={3}
                      />
                    </td>
                    <td className="border border-gray-200 p-0.5 align-top" style={{width: '20%'}}>
                      <div className="space-y-0.5">
                        <div>
                          <div className="text-xs text-gray-700 mb-0.5 font-semibold">Duración:</div>
                          <Input
                            type="number"
                            placeholder="0"
                            className="text-xs h-5 border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 rounded-lg font-medium w-full transition-all duration-200"
                            min="0"
                            max="99999"
                          />
                        </div>
                        <div>
                          <Textarea
                            placeholder="Justificación..."
                            className="text-xs border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 rounded-lg min-h-[30px] resize-none w-full transition-all duration-200"
                            rows={2}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="border border-gray-200 p-0.5 align-top" style={{width: '20%'}}>
                      <div className="space-y-0.5">
                        <div>
                          <div className="text-xs text-gray-700 mb-0.5 font-semibold">Monto: $</div>
                          <Input
                            type="number"
                            placeholder="0"
                            className="text-xs h-5 border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 rounded-lg font-medium w-full transition-all duration-200"
                            min="0"
                            max="9999999999"
                          />
                        </div>
                        <div>
                          <Textarea
                            placeholder="Justificación..."
                            className="text-xs border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 rounded-lg min-h-[30px] resize-none w-full transition-all duration-200"
                            rows={2}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="border border-gray-200 p-0.5 align-top" style={{width: '20%'}}>
                      <Textarea
                        placeholder="Calidad..."
                        className="text-xs border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 rounded-lg min-h-[60px] resize-none w-full transition-all duration-200"
                        rows={3}
                      />
                    </td>
                    <td className="border border-gray-200 p-0.5 align-top" style={{width: '10%'}}>
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-full text-xs border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                        >
                          <MessageCircle className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-full text-xs border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                        >
                          <Upload className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 font-semibold">
              {title === 'Implementación' ? (
                <>
                  <td className="border border-gray-200 py-2 px-1 text-center text-gray-900 text-xs font-bold" colSpan={3}>
                    Tiempo de Implementación
                  </td>
                  <td className="border border-gray-200 py-2 px-1 text-center text-gray-900 text-xs font-bold" colSpan={3}>
                    Monto Total de Implementación
                  </td>
                </>
              ) : (
                <>
                  <td className="border border-gray-200 py-2 px-1 text-center text-gray-900 text-xs font-bold" colSpan={3}>
                    Tiempo de Implementación
                  </td>
                  <td className="border border-gray-200 py-2 px-1 text-center text-gray-900 text-xs font-bold" colSpan={3}>
                    Monto Total
                  </td>
                </>
              )}
            </tr>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 font-semibold">
              {title === 'Implementación' ? (
                <>
                  <td className="border border-gray-200 py-2 px-1 text-center text-gray-700 text-base font-bold" colSpan={3}>
                    {totalTime} días
                  </td>
                  <td className="border border-gray-200 py-2 px-1 text-center text-gray-700 text-base font-bold" colSpan={3}>
                    ${totalCost.toLocaleString()}
                  </td>
                </>
              ) : (
                <>
                  <td className="border border-gray-200 py-2 px-1 text-center text-gray-700 text-base font-bold" colSpan={3}>
                    -
                  </td>
                  <td className="border border-gray-200 py-2 px-1 text-center text-gray-700 text-base font-bold" colSpan={3}>
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

export default UserM6Table;
