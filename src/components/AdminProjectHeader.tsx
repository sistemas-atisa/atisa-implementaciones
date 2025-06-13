
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ProjectHeaderData } from '@/types/project';
import ApprovalButtons from './ApprovalButtons';

interface AdminProjectHeaderProps {
  data: ProjectHeaderData;
}

const AdminProjectHeader: React.FC<AdminProjectHeaderProps> = ({ data }) => {
  const handleApprove = () => {
    console.log('Implementación aprobada');
    // Aquí se puede agregar lógica para manejar la aprobación
  };

  const handleReject = () => {
    console.log('Implementación rechazada');
    // Aquí se puede agregar lógica para manejar el rechazo
  };

  return (
    <Card className="p-8 mb-8 bg-white border-gray-200 shadow-xl">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-6 px-8 rounded-xl mb-8 -m-8 mb-8">
        <h1 className="font-bold text-center text-2xl">
          Descripción de implementación
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Nombre de la Implementación:
            </label>
            <Input 
              value={data.nombreImplementacion} 
              disabled
              className="bg-white border border-gray-300 text-black rounded-lg font-medium text-lg" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Dirección:
            </label>
            <Input 
              value={data.direccion} 
              disabled
              className="bg-white border border-gray-300 text-black rounded-lg" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Gerencia:
            </label>
            <Input 
              value={data.gerencia} 
              disabled
              className="bg-white border border-gray-300 text-black rounded-lg" 
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              ¿Por qué es relevante?
            </label>
            <div className="space-y-4">
              <Textarea 
                value={data.razon1} 
                disabled
                className="bg-white border border-gray-300 text-black rounded-lg" 
                rows={2} 
              />
              <Textarea 
                value={data.razon2} 
                disabled
                className="bg-white border border-gray-300 text-black rounded-lg" 
                rows={2} 
              />
              <Textarea 
                value={data.razon3} 
                disabled
                className="bg-white border border-gray-300 text-black rounded-lg" 
                rows={2} 
              />
            </div>

            <ApprovalButtons onApprove={handleApprove} onReject={handleReject} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdminProjectHeader;
