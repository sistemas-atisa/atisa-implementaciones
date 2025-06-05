
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import EmployeeCard from './EmployeeCard';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

interface EmployeeData {
  nombre: string;
  numeroEmpleado: string;
  direccion: string;
}

interface UserSidebarProps {
  employeeData: EmployeeData;
  onEmployeeUpdate: (field: keyof EmployeeData, value: string) => void;
  onToggleView: () => void;
}

export function UserSidebar({ employeeData, onEmployeeUpdate, onToggleView }: UserSidebarProps) {
  // Fixed employee data for Oscar Arredondo
  const oscarData = {
    nombre: 'Oscar Arredondo',
    numeroEmpleado: '793',
    direccion: 'Tecnología y Sistemas'
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Vista Usuario</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="p-2">
          <EmployeeCard data={oscarData} onUpdate={onEmployeeUpdate} />
        </div>
        
        {/* Toggle View Section at bottom */}
        <div className="mt-auto p-2 border-t border-gray-200">
          <Button
            onClick={onToggleView}
            variant="outline"
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Shield className="h-4 w-4" />
            Vista Administrador
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
