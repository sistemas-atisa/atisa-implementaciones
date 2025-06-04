
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
        <div className="p-2 bg-gray-100 rounded-full">
          <User className="h-5 w-5 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Oscar Arredondo</h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <span className="text-sm font-medium text-gray-700">
            Número de empleado: <span className="font-normal">793</span>
          </span>
        </div>
        
        <div>
          <span className="text-sm font-medium text-gray-700">
            Dirección: <span className="font-normal">Tecnología y sistemas</span>
          </span>
        </div>
      </div>
    </Card>
  );
};

export default EmployeeCard;
