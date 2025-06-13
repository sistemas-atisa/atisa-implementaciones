
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Expand, MessageCircle, Eye } from 'lucide-react';
import { SectionData } from '@/types/project';
import ChatModal from './ChatModal';
import TimeUnitSelector, { TimeUnit } from './TimeUnitSelector';
import { getUnitLabel } from '@/utils/timeConversions';

interface AdminM6TableProps {
  title: string;
  data: SectionData;
  totalTime?: number;
  totalCost: number;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  customTotalTime?: number;
}

const AdminM6Table: React.FC<AdminM6TableProps> = ({ 
  title, 
  data, 
  totalTime, 
  totalCost, 
  isExpanded = false,
  onToggleExpand,
  customTotalTime = 0
}) => {
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

  const handleChatClick = (categoryKey: string, categoryLabel: string) => {
    setChatModal({
      isOpen: true,
      category: categoryKey,
      categoryLabel: categoryLabel
    });
  };

  const handleViewFilesClick = () => {
    console.log('Ver archivos subidos');
    // Aquí se implementaría la lógica para ver archivos
  };

  const closeChatModal = () => {
    setChatModal({ isOpen: false, category: '', categoryLabel: '' });
  };

  const handleTimeUnitChange = (unit: TimeUnit) => {
    setTimeUnit(unit);
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

        {/* Time Unit Selector - Read Only */}
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
                <tr key={category.key} className={categoryIndex % 2 === 0 ? 'bg-gray-50 hover:bg-gray-75' : 'bg-gray-75 hover:bg-gray-100'}>
                  <td className="border border-gray-200 p-0.5 font-semibold text-gray-700 text-xs align-top bg-gray-100" style={{width: '15%'}}>
                    <div className="p-1">
                      <span>{category.label}</span>
                    </div>
                  </td>
                  
                  <td className="border border-gray-200 p-0.5 align-top" style={{width: '25%'}}>
                    <Textarea
                      value={data[category.key].descripcion}
                      disabled
                      className="text-xs bg-white border border-gray-300 text-gray-800 rounded-lg min-h-[75px] resize-none w-full"
                      rows={4}
                    />
                  </td>
                  <td className="border border-gray-200 p-0.5 align-top" style={{width: '20%'}}>
                    <div className="space-y-0.5">
                      <div>
                        <div className="text-xs text-gray-700 mb-0.5 font-semibold">Duración:</div>
                        <Input
                          type="number"
                          value={data[category.key].duracion || ''}
                          disabled
                          className="text-xs h-5 bg-white border border-gray-300 text-gray-800 rounded-lg font-medium w-full"
                        />
                      </div>
                      <div>
                        <Textarea
                          value={data[category.key].duracionJustificacion}
                          disabled
                          className="text-xs bg-white border border-gray-300 text-gray-800 rounded-lg min-h-[38px] resize-none w-full"
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
                          disabled
                          className="text-xs h-5 bg-white border border-gray-300 text-gray-800 rounded-lg font-medium w-full"
                        />
                      </div>
                      <div>
                        <Textarea
                          value={data[category.key].montoJustificacion}
                          disabled
                          className="text-xs bg-white border border-gray-300 text-gray-800 rounded-lg min-h-[38px] resize-none w-full"
                          rows={2}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="border border-gray-200 p-0.5 align-top" style={{width: '15%'}}>
                    <Textarea
                      value={data[category.key].calidad}
                      disabled
                      className="text-xs bg-white border border-gray-300 text-gray-800 rounded-lg min-h-[75px] resize-none w-full"
                      rows={4}
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
                        onClick={handleViewFilesClick}
                        className="h-6 w-full text-xs border-gray-300 hover:bg-red-50 hover:border-red-300"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
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
                    disabled
                    className="text-center bg-white border border-gray-300 text-gray-800 text-base font-bold"
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

export default AdminM6Table;
