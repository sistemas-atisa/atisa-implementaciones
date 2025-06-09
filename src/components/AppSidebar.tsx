
import React from 'react';
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
    extraSpacing: true,
  },
  {
    id: 'cadena-suministros',
    title: 'Cadena de Suministros',
    icon: ShoppingCart,
    extraSpacing: true,
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

  const handleDirectionClick = (directionId: string) => {
    onDirectionSelect(directionId);
    navigate(`/directions/${directionId}`);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Direcciones
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {directions.map((direction) => (
                <SidebarMenuItem key={direction.id} className={direction.extraSpacing ? 'mt-2 mb-2' : ''}>
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
        <ViewToggle onToggle={onToggleView} />
      </SidebarFooter>
    </Sidebar>
  );
}
