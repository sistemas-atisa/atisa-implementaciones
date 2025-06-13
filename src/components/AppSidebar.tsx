
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Building2, Users, FileText, Calculator, Wrench, Truck, HardHat, Home, ShoppingCart, Stethoscope, Shield, Target, TrendingUp, Briefcase, ChevronDown, ChevronRight } from 'lucide-react';
import ViewToggle from './ViewToggle';

interface AppSidebarProps {
  onDirectionSelect: (directionId: string) => void;
  selectedDirection: string;
  onToggleView: () => void;
  isAdminView: boolean;
}

// Estructura de datos para los grupos empresariales
const empresasData = [
  {
    id: 'atisa',
    name: 'ATISA',
    icon: Building2,
    directions: [
      { id: 'desarrollo', title: 'Desarrollo', icon: Home },
      { id: 'costos-proyectos', title: 'Costos y Proyectos', icon: Target },
      { id: 'cadena-suministros', title: 'Cadena de Suministro', icon: ShoppingCart },
      { id: 'maquinaria', title: 'Maquinaria', icon: Wrench },
      { id: 'movimiento-tierra', title: 'Movimiento de Tierra', icon: Truck },
      { id: 'construccion', title: 'Construcción', icon: HardHat },
      { id: 'comercial', title: 'Comercial', icon: Briefcase },
      { id: 'asset-management', title: 'Asset Management', icon: Building2 },
      { id: 'administracion', title: 'Administración', icon: Building2 },
      { id: 'legal', title: 'Legal', icon: Shield },
      { id: 'fiscal', title: 'Fiscal', icon: Calculator },
      { id: 'finanzas', title: 'Finanzas', icon: TrendingUp },
      { id: 'capital-humano', title: 'Capital Humano', icon: Users },
      { id: 'tecnologia', title: 'Tecnología', icon: Wrench },
    ]
  },
  {
    id: 'family-office',
    name: 'Family Office',
    icon: Briefcase,
    directions: []
  },
  {
    id: 'clinica-santa-clarita',
    name: 'Clínica Santa Clarita',
    icon: Stethoscope,
    directions: []
  },
  {
    id: 'cama-luz-roja',
    name: 'Cama de Luz Roja',
    icon: Shield,
    directions: []
  },
  {
    id: 'mentoraje',
    name: 'Mentoraje',
    icon: Users,
    directions: []
  },
  {
    id: 'endowment',
    name: 'Endowment',
    icon: TrendingUp,
    directions: []
  }
];

export function AppSidebar({ onDirectionSelect, selectedDirection, onToggleView, isAdminView }: AppSidebarProps) {
  const navigate = useNavigate();
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  const handleDirectionClick = (directionId: string) => {
    onDirectionSelect(directionId);
    navigate(`/directions/${directionId}`);
  };

  const handleToggleView = () => {
    onToggleView();
    navigate('/my-implementations');
  };

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const isGroupOpen = (groupId: string) => openGroups.includes(groupId);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-6 border-b border-gray-200 mb-4">
            <SidebarGroupLabel className="text-xl font-bold text-foreground flex items-center gap-3">
              <FileText className="h-6 w-6 text-red-600" />
              <span className="text-gray-900">Empresas</span>
            </SidebarGroupLabel>
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {empresasData.map((empresa) => (
                <SidebarMenuItem key={empresa.id}>
                  <Collapsible open={isGroupOpen(empresa.id)} onOpenChange={() => toggleGroup(empresa.id)}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="w-full flex items-center justify-between">
                        <div className="flex items-center">
                          <empresa.icon className="h-4 w-4 mr-2" />
                          <span>{empresa.name}</span>
                        </div>
                        {isGroupOpen(empresa.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-4 mt-1">
                      {empresa.directions.length > 0 ? (
                        <SidebarMenu className="space-y-1">
                          {empresa.directions.map((direction) => (
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
                      ) : (
                        <div className="px-3 py-2 text-sm text-gray-500">
                          Próximamente
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
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
