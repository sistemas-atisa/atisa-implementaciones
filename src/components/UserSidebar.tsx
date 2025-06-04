
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import EmployeeCard from './EmployeeCard';

interface EmployeeData {
  nombre: string;
  numeroEmpleado: string;
  direccion: string;
}

interface UserSidebarProps {
  employeeData: EmployeeData;
  onEmployeeUpdate: (field: keyof EmployeeData, value: string) => void;
}

export function UserSidebar({ employeeData, onEmployeeUpdate }: UserSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Vista Usuario</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="p-2">
          <EmployeeCard data={employeeData} onUpdate={onEmployeeUpdate} />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
