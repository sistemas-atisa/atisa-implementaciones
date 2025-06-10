
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Expand, Plus, Minus, MessageCircle, Upload } from 'lucide-react';
import { SectionData, M6Data } from '@/types/project';
import ChatModal from './ChatModal';
import TimeUnitSelector, { TimeUnit } from './TimeUnitSelector';
import { getUnitLabel } from '@/utils/timeConversions';

interface M6TableProps {
  title: string;
  data: SectionData;
  onUpdate: (category: keyof SectionData, field: keyof M6Data, value: string | number) => void;
  totalTime?: number;
  totalCost: number;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  customTotalTime?: number;
  onCustomTotalTimeChange?: (value: number) => void;
  onTimeUnitChange?: (unit: string) => void;
}

const M6Table: React.FC<M6TableProps> = ({ 
  title, 
  data, 
  onUpdate, 
  totalTime, 
  totalCost, 
  isExpanded = false,
  onToggleExpand,
  customTotalTime = 0,
  onCustomTotalTimeChange,
  onTimeUnitChange
}) => {
  const [categoryRows, setCategoryRows] = useState<{ [key: string]: number }>({
    manoDeObra: 1,
    metodologia: 1,
    medicion: 1,
    maquinaria: 1,
    materiales: 1,
    medioAmbiente: 1
  });

  const [timeUnit, setTimeUnit] = useState<TimeUnit>('dias');

  const [chatModal, setChatModal] = useState<{
    isOpen: boolean;
    category: string;
    categoryLabel: string;
  }>({
    isOpen: false,
    category: '',
    categoryLabel: ''
  });
  
  const m6Categories = [
    { key: 'manoDeObra' as keyof SectionData, label: 'Mano de obra' },
    { key: 'metodologia' as keyof SectionData, label: 'Metodología' },
    { key: 'medicion' as keyof SectionData, label: 'Medición' },
    { key: 'maquinaria' as keyof SectionData, label: 'Maquinaria' },
    { key: 'materiales' as keyof SectionData, label: 'Materiales' },
    { key: 'medioAmbiente' as keyof SectionData, label: 'Medio Ambiente' }
  ];

  const addRow = (categoryKey: string) => {
    setCategoryRows(prev => ({
      ...prev,
      [categoryKey]: Math.min(prev[categoryKey] + 1, 10)
    }));
  };

  const removeRow = (categoryKey: string) => {
    setCategoryRows(prev => ({
      ...prev,
      [categoryKey]: Math.max(prev[categoryKey] - 1, 1)
    }));
  };

  const handleChatClick = (categoryKey: string, categoryLabel: string) => {
    setChatModal({
      isOpen: true,
      category: categoryKey,
      categoryLabel: categoryLabel
    });
  };

  const handleUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '*/*';
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        console.log('Files selected:', Array.from(files).map(f => f.name));
        // Here you would implement the actual file upload logic
      }
    };
    input.click();
  };

  const closeChatModal = () => {
    setChatModal({ isOpen: false, category: '', categoryLabel: '' });
  };

  const handleCustomTotalTimeChange = (value: string) => {
    const numericValue = parseFloat(value) || 0;
    // Pass the raw value directly without any conversion
    if (onCustomTotalTimeChange) {
      onCustomTotalTimeChange(numericValue);
    }
  };

  const handleTimeUnitChange = (unit: TimeUnit) => {
    setTimeUnit(unit);
    if (onTimeUnitChange) {
      onTimeUnitChange(getUnitLabel(unit));
    }
  };

  return (
    <>
      <Card className="p-1 bg-white border-gray-200 shadow-xl">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-3 rounded-xl mb-1 -m-1 mb-1 relative">
          <h2 className="text-lg font-bold text-center pr-12">
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

        {/* Time Unit Selector */}
        <div className="p-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Unidad de tiempo:</span>
            <TimeUnitSelector value={timeUnit} onChange={handleTimeUnitChange} />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-900">
                <th className="border border-gray-200 py-2 px-1 text-left font-bold text-white text-xs" style={{width: '15%'}}>6 M's</th>
                <th className="border border-gray-200 py-2 px-1 text-left font-bold text-white text-xs" style={{width: '25%'}}>Descripción</th>
                <th className="border border-gray-200 py-2 px-1 text-center font-bold text-white text-xs" style={{width: '20%'}}>Tiempo ({getUnitLabel(timeUnit)})</th>
                <th className="border border-gray-200 py-2 px-1 text-center font-bold text-white text-xs" style={{width: '20%'}}>Costo</th>
                <th className="border border-gray-200 py-2 px-1 text-center font-bold text-white text-xs" style={{width: '15%'}}>Calidad</th>
                <th className="border border-gray-200 py-2 px-1 text-center font-bold text-white text-xs" style={{width: '5%'}}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {m6Categories.map((category, categoryIndex) => (
                <React.Fragment key={category.key}>
                  {/* Render multiple rows for each category */}
                  {Array.from({ length: categoryRows[category.key] }, (_, rowIndex) => (
                    <tr key={`${category.key}-${rowIndex}`} className={categoryIndex % 2 === 0 ? 'bg-white hover:bg-gray-25' : 'bg-gray-25 hover:bg-gray-50'}>
                      {/* Category name cell - only show in first row of each category */}
                      {rowIndex === 0 ? (
                        <td 
                          className="border border-gray-200 p-0.5 font-semibold text-gray-900 text-xs align-top bg-gray-50" 
                          style={{width: '15%'}}
                          rowSpan={categoryRows[category.key]}
                        >
                          <div className="p-1 flex items-center justify-between">
                            <span>{category.label}</span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => addRow(category.key)}
                                className="text-red-600 hover:text-red-800 transition-colors bg-red-50 hover:bg-red-100 rounded-full p-1"
                                disabled={categoryRows[category.key] >= 10}
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                              {categoryRows[category.key] > 1 && (
                                <button
                                  onClick={() => removeRow(category.key)}
                                  className="text-red-600 hover:text-red-800 transition-colors bg-red-50 hover:bg-red-100 rounded-full p-1"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        </td>
                      ) : null}
                      
                      <td className="border border-gray-200 p-0.5 align-top" style={{width: '25%'}}>
                        <Textarea
                          value={rowIndex === 0 ? data[category.key].descripcion : ''}
                          onChange={rowIndex === 0 ? (e) => onUpdate(category.key, 'descripcion', e.target.value) : undefined}
                          className="text-xs border-gray-200 focus:border-red-600 focus:ring-red-600/20 rounded-lg min-h-[75px] resize-none w-full transition-all duration-200"
                          rows={4}
                          placeholder={rowIndex > 0 ? `Descripción adicional ${rowIndex + 1}...` : ''}
                        />
                      </td>
                      <td className="border border-gray-200 p-0.5 align-top" style={{width: '20%'}}>
                        <div className="space-y-0.5">
                          <div>
                            <div className="text-xs text-gray-700 mb-0.5 font-semibold">Duración:</div>
                            <Input
                              type="number"
                              value={rowIndex === 0 ? (data[category.key].duracion || '') : ''}
                              onChange={rowIndex === 0 ? (e) => onUpdate(category.key, 'duracion', Number(e.target.value)) : undefined}
                              className="text-xs h-5 border-gray-200 focus:border-red-600 focus:ring-red-600/20 rounded-lg font-medium w-full transition-all duration-200"
                              min="0"
                              step="0.01"
                              placeholder={rowIndex > 0 ? "0" : ""}
                            />
                          </div>
                          <div>
                            <Textarea
                              value={rowIndex === 0 ? data[category.key].duracionJustificacion : ''}
                              onChange={rowIndex === 0 ? (e) => onUpdate(category.key, 'duracionJustificacion', e.target.value) : undefined}
                              className="text-xs border-gray-200 focus:border-red-600 focus:ring-red-600/20 rounded-lg min-h-[38px] resize-none w-full transition-all duration-200"
                              rows={2}
                              placeholder={rowIndex > 0 ? "Justificación..." : ""}
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
                              value={rowIndex === 0 ? (data[category.key].monto || '') : ''}
                              onChange={rowIndex === 0 ? (e) => onUpdate(category.key, 'monto', Number(e.target.value)) : undefined}
                              className="text-xs h-5 border-gray-200 focus:border-red-600 focus:ring-red-600/20 rounded-lg font-medium w-full transition-all duration-200"
                              min="0"
                              max="9999999999"
                              placeholder={rowIndex > 0 ? "0" : ""}
                            />
                          </div>
                          <div>
                            <Textarea
                              value={rowIndex === 0 ? data[category.key].montoJustificacion : ''}
                              onChange={rowIndex === 0 ? (e) => onUpdate(category.key, 'montoJustificacion', e.target.value) : undefined}
                              className="text-xs border-gray-200 focus:border-red-600 focus:ring-red-600/20 rounded-lg min-h-[38px] resize-none w-full transition-all duration-200"
                              rows={2}
                              placeholder={rowIndex > 0 ? "Justificación..." : ""}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="border border-gray-200 p-0.5 align-top" style={{width: '15%'}}>
                        <Textarea
                          value={rowIndex === 0 ? data[category.key].calidad : ''}
                          onChange={rowIndex === 0 ? (e) => onUpdate(category.key, 'calidad', e.target.value) : undefined}
                          className="text-xs border-gray-200 focus:border-red-600 focus:ring-red-600/20 rounded-lg min-h-[75px] resize-none w-full transition-all duration-200"
                          rows={4}
                          placeholder={rowIndex > 0 ? "Calidad..." : ""}
                        />
                      </td>
                      <td className="border border-gray-200 p-0.5 align-top" style={{width: '5%'}}>
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleChatClick(category.key, category.label)}
                            className="h-6 w-full text-xs border-gray-300 hover:bg-red-50 hover:border-red-300"
                          >
                            <MessageCircle className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleUploadClick}
                            className="h-6 w-full text-xs border-gray-300 hover:bg-red-50 hover:border-red-300"
                          >
                            <Upload className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
              <tr className="bg-gradient-to-r from-red-50 to-red-100 font-semibold">
                {title === 'Implementación' ? (
                  <>
                    <td className="border border-gray-200 py-2 px-1 text-center text-gray-900 text-xs font-bold" colSpan={3}>
                      Tiempo de Implementación ({getUnitLabel(timeUnit)})
                    </td>
                    <td className="border border-gray-200 py-2 px-1 text-center text-gray-900 text-xs font-bold" colSpan={3}>
                      Monto Total de Implementación
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border border-gray-200 py-2 px-1 text-center text-gray-900 text-xs font-bold" colSpan={3}>
                      Tiempo Total ({getUnitLabel(timeUnit)})
                    </td>
                    <td className="border border-gray-200 py-2 px-1 text-center text-gray-900 text-xs font-bold" colSpan={3}>
                      Monto Total
                    </td>
                  </>
                )}
              </tr>
              <tr className="bg-gradient-to-r from-red-50 to-red-100 font-semibold">
                <td className="border border-gray-200 py-2 px-1 text-center" colSpan={3}>
                  <Input
                    type="number"
                    value={customTotalTime}
                    onChange={(e) => handleCustomTotalTimeChange(e.target.value)}
                    className="text-center text-red-700 text-base font-bold border-red-200 focus:border-red-600 focus:ring-red-600/20 bg-transparent"
                    min="0"
                    step="0.01"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-200 py-2 px-1 text-center text-red-700 text-base font-bold" colSpan={3}>
                  ${totalCost.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <ChatModal
        isOpen={chatModal.isOpen}
        onClose={closeChatModal}
        categoryName={chatModal.categoryLabel}
        description={chatModal.category ? data[chatModal.category as keyof SectionData]?.descripcion || '' : ''}
        time={chatModal.category ? data[chatModal.category as keyof SectionData]?.duracion || 0 : 0}
        cost={chatModal.category ? data[chatModal.category as keyof SectionData]?.monto || 0 : 0}
      />
    </>
  );
};

export default M6Table;
