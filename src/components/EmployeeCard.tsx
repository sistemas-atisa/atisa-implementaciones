
import React from 'react';
import { Card } from '@/components/ui/card';
import { User } from 'lucide-react';

interface EmployeeData {
  nombre: string;
  numeroEmpleado: string;
  direccion: string;
}

interface EmployeeCardProps {
  data: EmployeeData;
  onUpdate: (field: keyof EmployeeData, value: string) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ data }) => {
  return (
    <Card className="p-4 mb-4 bg-white border-gray-200 shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gray-100 rounded-full">
          <User className="h-5 w-5 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Información del Empleado</h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Empleado:
          </label>
          <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900">
            {data.nombre}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de Empleado:
          </label>
          <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900">
            {data.numeroEmpleado}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dirección:
          </label>
          <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900">
            {data.direccion}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EmployeeCard;
