
import React from 'react';
import { Card } from '@/components/ui/card';
import { ProjectHeaderData } from '@/types/project';

interface UserProjectHeaderProps {
  data: ProjectHeaderData;
  onUpdate: (field: keyof ProjectHeaderData, value: string) => void;
}

const UserProjectHeader: React.FC<UserProjectHeaderProps> = ({ data }) => {
  return (
    <Card className="p-8 mb-8 bg-white border-gray-200 shadow-xl">
      <div className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-6 px-8 rounded-xl mb-8 -m-8 mb-8">
        <h1 className="text-3xl font-bold text-center">
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
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-lg font-bold text-gray-900">
              {data.nombreImplementacion || 'Sin especificar'}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Dirección:
            </label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
              {data.direccion || 'Sin especificar'}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Gerencia:
            </label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
              {data.gerencia || 'Sin especificar'}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              ¿Por qué es relevante?
            </label>
            <div className="space-y-4">
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 min-h-[60px]">
                {data.razon1 || 'Sin especificar'}
              </div>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 min-h-[60px]">
                {data.razon2 || 'Sin especificar'}
              </div>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 min-h-[60px]">
                {data.razon3 || 'Sin especificar'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserProjectHeader;
