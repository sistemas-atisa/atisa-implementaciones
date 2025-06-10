
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Building2, Users, FileText, Calculator, Wrench, Truck, HardHat, Home, ShoppingCart, Stethoscope, Shield, Target, TrendingUp, Briefcase } from 'lucide-react';
import ViewToggle from './ViewToggle';

interface AppSidebarProps {
  onDirectionSelect: (directionId: string) => void;
  selectedDirection: string;
  onToggleView: () => void;
}

const directions = [
  {
    id: 'administracion',
    title: 'Administración',
    icon: Building2,
  },
  {
    id: 'fiscal',
    title: 'Fiscal',
    icon: Calculator,
  },
  {
    id: 'legal',
    title: 'Legal',
    icon: Shield,
  },
  {
    id: 'finanzas',
    title: 'Finanzas',
    icon: TrendingUp,
  },
  {
    id: 'capital-humano',
    title: 'Capital Humano',
    icon: Users,
  },
  {
    id: 'tecnologia',
    title: 'Tecnología',
    icon: Wrench,
  },
  {
    id: 'proyectos-presupuestos',
    title: 'Proyectos y Presupuestos',
    icon: Target,
  },
  {
    id: 'cadena-suministros',
    title: 'Cadena de Suministros',
    icon: ShoppingCart,
  },
  {
    id: 'maquinaria',
    title: 'Maquinaria',
    icon: Wrench,
  },
  {
    id: 'movimiento-tierra',
    title: 'Movimiento de Tierra',
    icon: Truck,
  },
  {
    id: 'construccion',
    title: 'Construcción',
    icon: HardHat,
  },
  {
    id: 'desarrollo',
    title: 'Desarrollo',
    icon: Home,
  },
  {
    id: 'comercial',
    title: 'Comercial',
    icon: Briefcase,
  },
  {
    id: 'asset-management',
    title: 'Asset Management',
    icon: Building2,
  },
  {
    id: 'clinica-santa-clarita',
    title: 'Clínica Santa Clarita',
    icon: Stethoscope,
  },
];

export function AppSidebar({ onDirectionSelect, selectedDirection, onToggleView }: AppSidebarProps) {
  const navigate = useNavigate();
  const [isAdminView, setIsAdminView] = useState(false);

  const handleDirectionClick = (directionId: string) => {
    onDirectionSelect(directionId);
    navigate(`/directions/${directionId}`);
  };

  const handleToggleView = () => {
    setIsAdminView(!isAdminView);
    onToggleView();
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-6 border-b border-gray-200 mb-4">
            <SidebarGroupLabel className="text-xl font-bold text-foreground flex items-center gap-3">
              <FileText className="h-6 w-6 text-red-600" />
              <span className="text-gray-900">Direcciones</span>
            </SidebarGroupLabel>
            <p className="text-sm text-gray-500 mt-1 ml-9">Selecciona una dirección</p>
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {directions.map((direction) => (
                <SidebarMenuItem key={direction.id}>
                  <SidebarMenuButton
                    onClick={() => handleDirectionClick(direction.id)}
                    isActive={selectedDirection === direction.id}
                    className="w-full"
                  >
                    <direction.icon className="h-4 w-4" />
                    <span>{direction.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ViewToggle isAdminView={isAdminView} onToggleView={handleToggleView} />
      </SidebarFooter>
    </Sidebar>
  );
}
