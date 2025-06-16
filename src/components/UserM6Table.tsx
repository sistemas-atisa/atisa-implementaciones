import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Expand, Plus, Minus, MessageCircle, Upload } from 'lucide-react';
import { SectionData, M6Data } from '@/types/project';
import ChatModal from './ChatModal';

interface UserM6TableProps {
  title: string;
  data: SectionData;
  onUpdate: (category: keyof SectionData, field: keyof M6Data, value: string | number) => void;
  totalTime?: number;
  totalCost: number;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  customTotalTime?: number;
  onCustomTotalTimeChange?: (value: number) => void;
  customTotalCost?: number;
  onCustomTotalCostChange?: (value: number) => void;
  periodicidades?: { [categoryKey: string]: { [rowIndex: number]: string } };
  onPeriodicidadChange?: (periodicidades: { [categoryKey: string]: { [rowIndex: number]: string } }) => void;
  timeUnit?: string;
  onTimeUnitChange?: (unit: string) => void;
  duracionTimeUnits?: { [categoryKey: string]: { [rowIndex: number]: string } };
  onDuracionTimeUnitChange?: (units: { [categoryKey: string]: { [rowIndex: number]: string } }) => void;
}

interface AdditionalRowData {
  descripcion: string;
  duracion: number;
  duracionJustificacion: string;
  monto: number;
  montoJustificacion: string;
  calidad: string;
  periodicidad?: string;
}

const UserM6Table: React.FC<UserM6TableProps> = ({ 
  title, 
  data, 
  onUpdate, 
  totalTime, 
  totalCost, 
  isExpanded = false,
  onToggleExpand,
  customTotalTime = 0,
  onCustomTotalTimeChange,
  customTotalCost = 0,
  onCustomTotalCostChange,
  periodicidades = {},
  onPeriodicidadChange,
  timeUnit = 'días',
  onTimeUnitChange,
  duracionTimeUnits = {},
  onDuracionTimeUnitChange
}) => {
  const [categoryRows, setCategoryRows] = useState<{ [key: string]: number }>({
    manoDeObra: 1,
    metodologia: 1,
    medicion: 1,
    maquinaria: 1,
    materiales: 1,
    medioAmbiente: 1
  });

  // Store additional row data
  const [additionalRowsData, setAdditionalRowsData] = useState<{ [categoryKey: string]: { [rowIndex: number]: AdditionalRowData } }>({});

  // Store custom periodicidad values
  const [customPeriodicidades, setCustomPeriodicidades] = useState<{ [key: string]: string }>({});

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

  const periodicidadOptions = [
    { value: 'mensual', label: 'Mensual' },
    { value: 'bimestral', label: 'Bimestral' },
    { value: 'trimestral', label: 'Trimestral' },
    { value: 'anual', label: 'Anual' },
    { value: 'personalizado', label: 'Personalizado' }
  ];

  const timeUnitOptions = [
    { value: 'días', label: 'Días' },
    { value: 'semanas', label: 'Semanas' },
    { value: 'meses', label: 'Meses' }
  ];

  const addRow = (categoryKey: string) => {
    setCategoryRows(prev => ({
      ...prev,
      [categoryKey]: Math.min(prev[categoryKey] + 1, 10)
    }));
  };

  const removeRow = (categoryKey: string) => {
    setCategoryRows(prev => {
      const newCount = Math.max(prev[categoryKey] - 1, 1);
      // Remove data for the deleted row
      setAdditionalRowsData(prevData => {
        const newData = { ...prevData };
        if (newData[categoryKey]) {
          delete newData[categoryKey][newCount];
        }
        return newData;
      });
      return {
        ...prev,
        [categoryKey]: newCount
      };
    });
  };

  const updateAdditionalRowData = (categoryKey: string, rowIndex: number, field: keyof AdditionalRowData, value: string | number) => {
    setAdditionalRowsData(prev => ({
      ...prev,
      [categoryKey]: {
        ...prev[categoryKey],
        [rowIndex]: {
          ...prev[categoryKey]?.[rowIndex],
          descripcion: prev[categoryKey]?.[rowIndex]?.descripcion || '',
          duracion: prev[categoryKey]?.[rowIndex]?.duracion || 0,
          duracionJustificacion: prev[categoryKey]?.[rowIndex]?.duracionJustificacion || '',
          monto: prev[categoryKey]?.[rowIndex]?.monto || 0,
          montoJustificacion: prev[categoryKey]?.[rowIndex]?.montoJustificacion || '',
          calidad: prev[categoryKey]?.[rowIndex]?.calidad || '',
          [field]: value
        }
      }
    }));
  };

  const getAdditionalRowData = (categoryKey: string, rowIndex: number, field: keyof AdditionalRowData) => {
    return additionalRowsData[categoryKey]?.[rowIndex]?.[field] || (field === 'duracion' || field === 'monto' ? 0 : '');
  };

  // Functions for handling duration time units
  const updateDuracionTimeUnit = (categoryKey: string, rowIndex: number, value: string) => {
    const newUnits = {
      ...duracionTimeUnits,
      [categoryKey]: {
        ...duracionTimeUnits[categoryKey],
        [rowIndex]: value
      }
    };
    
    if (onDuracionTimeUnitChange) {
      onDuracionTimeUnitChange(newUnits);
    }
  };

  const getDuracionTimeUnit = (categoryKey: string, rowIndex: number) => {
    return duracionTimeUnits[categoryKey]?.[rowIndex] || 'días';
  };

  // Use the periodicidades from props and update parent when changed
  const updatePeriodicidad = (categoryKey: string, rowIndex: number, value: string) => {
    const newPeriodicidades = {
      ...periodicidades,
      [categoryKey]: {
        ...periodicidades[categoryKey],
        [rowIndex]: value
      }
    };
    
    if (onPeriodicidadChange) {
      onPeriodicidadChange(newPeriodicidades);
    }
  };

  const getPeriodicidad = (categoryKey: string, rowIndex: number) => {
    return periodicidades[categoryKey]?.[rowIndex] || '';
  };

  const handleCustomPeriodicidadChange = (categoryKey: string, rowIndex: number, value: string) => {
    const key = `${categoryKey}-${rowIndex}`;
    setCustomPeriodicidades(prev => ({
      ...prev,
      [key]: value
    }));
    updatePeriodicidad(categoryKey, rowIndex, value);
  };

  const getCustomPeriodicidad = (categoryKey: string, rowIndex: number) => {
    const key = `${categoryKey}-${rowIndex}`;
    return customPeriodicidades[key] || '';
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

  // For both tables, use custom total cost or allow manual input
  const displayTotalCost = customTotalCost !== undefined ? customTotalCost : totalCost;

  return (
    <>
      <Card className="p-1 bg-white border-gray-200 shadow-xl">
        <div className={`text-white py-3 px-3 rounded-xl mb-1 -m-1 mb-1 relative ${
          title === 'Implementación' 
            ? 'bg-[#364050]' 
            : 'bg-gradient-to-r from-gray-700 to-gray-800'
        }`}>
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
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-900">
                <th className="border border-gray-200 py-2 px-1 text-left font-bold text-white text-xs" style={{width: '15%'}}>6 M's</th>
                <th className="border border-gray-200 py-2 px-1 text-left font-bold text-white text-xs" style={{width: '25%'}}>Descripción</th>
                <th className="border border-gray-200 py-2 px-1 text-center font-bold text-white text-xs" style={{width: '20%'}}>Tiempo</th>
                <th className="border border-gray-200 py-2 px-1 text-center font-bold text-white text-xs" style={{width: '20%'}}>Costo (USD)</th>
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
                                className="text-gray-600 hover:text-gray-800 transition-colors bg-gray-50 hover:bg-gray-100 rounded-full p-1"
                                disabled={categoryRows[category.key] >= 10}
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                              {categoryRows[category.key] > 1 && (
                                <button
                                  onClick={() => removeRow(category.key)}
                                  className="text-gray-600 hover:text-gray-800 transition-colors bg-gray-50 hover:bg-gray-100 rounded-full p-1"
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
                          value={rowIndex === 0 ? data[category.key].descripcion : getAdditionalRowData(category.key, rowIndex, 'descripcion') as string}
                          onChange={(e) => {
                            if (rowIndex === 0) {
                              onUpdate(category.key, 'descripcion', e.target.value);
                            } else {
                              updateAdditionalRowData(category.key, rowIndex, 'descripcion', e.target.value);
                            }
                          }}
                          className="text-xs border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 rounded-lg min-h-[75px] resize-none w-full transition-all duration-200"
                          rows={4}
                          placeholder={rowIndex > 0 ? `Descripción adicional ${rowIndex + 1}...` : ''}
                        />
                      </td>
                      <td className="border border-gray-200 p-0.5 align-top" style={{width: '20%'}}>
                        <div className="space-y-0.5">
                          <div>
                            <div className="text-xs text-gray-700 mb-0.5 font-semibold">Duración:</div>
                            <div className="flex gap-1">
                              <Input
                                type="number"
                                value={rowIndex === 0 ? (data[category.key].duracion || '') : (getAdditionalRowData(category.key, rowIndex, 'duracion') || '')}
                                onChange={(e) => {
                                  if (rowIndex === 0) {
                                    onUpdate(category.key, 'duracion', Number(e.target.value));
                                  } else {
                                    updateAdditionalRowData(category.key, rowIndex, 'duracion', Number(e.target.value));
                                  }
                                }}
                                className="text-xs h-5 border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 rounded-lg font-medium flex-1 transition-all duration-200"
                                min="0"
                                max="99999"
                                placeholder="0"
                              />
                              <Select
                                value={getDuracionTimeUnit(category.key, rowIndex)}
                                onValueChange={(value) => updateDuracionTimeUnit(category.key, rowIndex, value)}
                              >
                                <SelectTrigger className="text-xs h-5 border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 rounded-lg w-16">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="z-50 bg-white border border-gray-200 rounded-lg shadow-lg">
                                  {timeUnitOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value} className="text-xs">
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div>
                            <Textarea
                              value={rowIndex === 0 ? data[category.key].duracionJustificacion : getAdditionalRowData(category.key, rowIndex, 'duracionJustificacion') as string}
                              onChange={(e) => {
                                if (rowIndex === 0) {
                                  onUpdate(category.key, 'duracionJustificacion', e.target.value);
                                } else {
                                  updateAdditionalRowData(category.key, rowIndex, 'duracionJustificacion', e.target.value);
                                }
                              }}
                              className="text-xs border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 rounded-lg min-h-[38px] resize-none w-full transition-all duration-200"
                              rows={2}
                              placeholder="Justificación..."
                            />
                          </div>
                        </div>
                      </td>
                      <td className="border border-gray-200 p-0.5 align-top" style={{width: '20%'}}>
                        <div className="space-y-0.5">
                          <div>
                            <div className="text-xs text-gray-700 mb-0.5 font-semibold">Periodicidad:</div>
                            <Select
                              value={getPeriodicidad(category.key, rowIndex)}
                              onValueChange={(value) => updatePeriodicidad(category.key, rowIndex, value)}
                            >
                              <SelectTrigger className="text-xs h-5 border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 rounded-lg w-full">
                                <SelectValue placeholder="Seleccionar" />
                              </SelectTrigger>
                              <SelectContent className="z-50 bg-white border border-gray-200 rounded-lg shadow-lg">
                                {periodicidadOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value} className="text-xs">
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          {/* Show custom periodicidad input if "personalizado" is selected */}
                          {getPeriodicidad(category.key, rowIndex) === 'personalizado' && (
                            <div>
                              <Input
                                type="text"
                                value={getCustomPeriodicidad(category.key, rowIndex)}
                                onChange={(e) => handleCustomPeriodicidadChange(category.key, rowIndex, e.target.value)}
                                className="text-xs h-5 border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 rounded-lg w-full"
                                placeholder="Especificar periodicidad..."
                              />
                            </div>
                          )}
                          
                          <div>
                            <div className="text-xs text-gray-700 mb-0.5 font-semibold">Monto: $</div>
                            <Input
                              type="number"
                              value={rowIndex === 0 ? (data[category.key].monto || '') : (getAdditionalRowData(category.key, rowIndex, 'monto') || '')}
                              onChange={(e) => {
                                if (rowIndex === 0) {
                                  onUpdate(category.key, 'monto', Number(e.target.value));
                                } else {
                                  updateAdditionalRowData(category.key, rowIndex, 'monto', Number(e.target.value));
                                }
                              }}
                              className="text-xs h-5 border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 rounded-lg font-medium w-full transition-all duration-200"
                              min="0"
                              max="9999999999"
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <Textarea
                              value={rowIndex === 0 ? data[category.key].montoJustificacion : getAdditionalRowData(category.key, rowIndex, 'montoJustificacion') as string}
                              onChange={(e) => {
                                if (rowIndex === 0) {
                                  onUpdate(category.key, 'montoJustificacion', e.target.value);
                                } else {
                                  updateAdditionalRowData(category.key, rowIndex, 'montoJustificacion', e.target.value);
                                }
                              }}
                              className="text-xs border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 rounded-lg min-h-[38px] resize-none w-full transition-all duration-200"
                              rows={2}
                              placeholder="Justificación..."
                            />
                          </div>
                        </div>
                      </td>
                      <td className="border border-gray-200 p-0.5 align-top" style={{width: '15%'}}>
                        <Textarea
                          value={rowIndex === 0 ? data[category.key].calidad : getAdditionalRowData(category.key, rowIndex, 'calidad') as string}
                          onChange={(e) => {
                            if (rowIndex === 0) {
                              onUpdate(category.key, 'calidad', e.target.value);
                            } else {
                              updateAdditionalRowData(category.key, rowIndex, 'calidad', e.target.value);
                            }
                          }}
                          className="text-xs border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 rounded-lg min-h-[75px] resize-none w-full transition-all duration-200"
                          rows={4}
                          placeholder="Calidad..."
                        />
                      </td>
                      <td className="border border-gray-200 p-0.5 align-top" style={{width: '5%'}}>
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleChatClick(category.key, category.label)}
                            className="h-6 w-full text-xs border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                          >
                            <MessageCircle className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleUploadClick}
                            className="h-6 w-full text-xs border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                          >
                            <Upload className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
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
                      Tiempo Total
                    </td>
                    <td className="border border-gray-200 py-2 px-1 text-center text-gray-900 text-xs font-bold" colSpan={3}>
                      Monto Total
                    </td>
                  </>
                )}
              </tr>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 font-semibold">
                <td className="border border-gray-200 py-2 px-1 text-center" colSpan={2}>
                  <Input
                    type="number"
                    value={customTotalTime}
                    onChange={(e) => onCustomTotalTimeChange && onCustomTotalTimeChange(Number(e.target.value))}
                    className="text-center text-gray-700 text-base font-bold border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 bg-transparent"
                    min="0"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-200 py-2 px-1 text-center">
                  <Select
                    value={timeUnit}
                    onValueChange={(value) => onTimeUnitChange && onTimeUnitChange(value)}
                  >
                    <SelectTrigger className="text-xs border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 bg-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white border border-gray-200 rounded-lg shadow-lg">
                      {timeUnitOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-xs">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="border border-gray-200 py-2 px-1 text-center" colSpan={2}>
                  <Input
                    type="number"
                    value={customTotalCost || ''}
                    onChange={(e) => onCustomTotalCostChange && onCustomTotalCostChange(Number(e.target.value))}
                    className="text-center text-gray-700 text-base font-bold border-gray-200 focus:border-gray-600 focus:ring-gray-600/20 bg-transparent"
                    min="0"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-200 py-2 px-1 text-center">
                  <span className="text-gray-700 text-sm font-medium">USD</span>
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

export default UserM6Table;
