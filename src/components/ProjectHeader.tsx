
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ProjectHeaderData } from '@/types/project';
import ApprovalButtons from './ApprovalButtons';

interface ProjectHeaderProps {
  data: ProjectHeaderData;
  onUpdate: (field: keyof ProjectHeaderData, value: string) => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ data, onUpdate }) => {
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
        <h1 className="text-3xl font-bold text-center">
          Análisis de las 6 M's
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Dirección:
            </label>
            <Input
              value={data.direccion}
              onChange={(e) => onUpdate('direccion', e.target.value)}
              placeholder="Ingrese la dirección"
              className="border-gray-200 focus:border-red-600 focus:ring-red-600/20 rounded-lg transition-all duration-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Gerencia:
            </label>
            <Input
              value={data.gerencia}
              onChange={(e) => onUpdate('gerencia', e.target.value)}
              placeholder="Ingrese la gerencia"
              className="border-gray-200 focus:border-red-600 focus:ring-red-600/20 rounded-lg transition-all duration-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Nombre de la Implementación:
            </label>
            <Input
              value={data.nombreImplementacion}
              onChange={(e) => onUpdate('nombreImplementacion', e.target.value)}
              placeholder="Ingrese el nombre de la implementación"
              className="border-gray-200 focus:border-red-600 focus:ring-red-600/20 rounded-lg transition-all duration-200"
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
                onChange={(e) => onUpdate('razon1', e.target.value)}
                placeholder="Razón 1"
                className="border-gray-200 focus:border-red-600 focus:ring-red-600/20 rounded-lg transition-all duration-200"
                rows={2}
              />
              <Textarea
                value={data.razon2}
                onChange={(e) => onUpdate('razon2', e.target.value)}
                placeholder="Razón 2"
                className="border-gray-200 focus:border-red-600 focus:ring-red-600/20 rounded-lg transition-all duration-200"
                rows={2}
              />
              <Textarea
                value={data.razon3}
                onChange={(e) => onUpdate('razon3', e.target.value)}
                placeholder="Razón 3"
                className="border-gray-200 focus:border-red-600 focus:ring-red-600/20 rounded-lg transition-all duration-200"
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

export default ProjectHeader;
