
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

const EmployeeCard: React.FC<EmployeeCardProps> = ({ data, onUpdate }) => {
  return (
    <Card className="p-4 mb-4 bg-white border-gray-200 shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-full">
          <User className="h-5 w-5 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Información del Empleado</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Empleado:
          </label>
          <Input
            value={data.nombre}
            onChange={(e) => onUpdate('nombre', e.target.value)}
            placeholder="Ingrese su nombre completo"
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de Empleado:
          </label>
          <Input
            value={data.numeroEmpleado}
            onChange={(e) => onUpdate('numeroEmpleado', e.target.value)}
            placeholder="Ingrese su número de empleado"
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dirección:
          </label>
          <Input
            value={data.direccion}
            onChange={(e) => onUpdate('direccion', e.target.value)}
            placeholder="Ingrese su dirección"
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
          />
        </div>
      </div>
    </Card>
  );
};

export default EmployeeCard;
