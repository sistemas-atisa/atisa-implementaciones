
import { Building2, Users, Calculator, Laptop, UserCheck, Truck, Mountain, Hammer, Package, Home, Store, Archive, Settings, MapPin, Wrench, User, ArrowRight, Scale, Heart } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader } from "@/components/ui/sidebar";

const directions = [{
  title: "ADMINISTRACIÓN",
  icon: Building2,
  count: 2,
  id: "administracion"
}, {
  title: "FISCAL",
  icon: Calculator,
  count: 1,
  id: "fiscal"
}, {
  title: "LEGAL",
  icon: Scale,
  count: 0,
  id: "legal"
}, {
  title: "FINANZAS",
  icon: Calculator,
  count: 1,
  id: "finanzas"
}, {
  title: "CAPITAL HUMANO",
  icon: Users,
  count: 1,
  id: "capital-humano"
}, {
  title: "TECNOLOGÍA",
  icon: Laptop,
  count: 1,
  id: "tecnologia"
}, {
  title: "PROYECTOS Y PRESUPUESTOS",
  icon: Archive,
  count: 0,
  id: "proyectos-presupuestos",
  extraSpacing: true
}, {
  title: "CADENA DE SUMINISTROS",
  icon: Package,
  count: 0,
  id: "cadena-suministros",
  extraSpacing: true
}, {
  title: "MAQUINARIA",
  icon: Settings,
  count: 1,
  id: "maquinaria"
}, {
  title: "MOVIMIENTO DE TIERRA",
  icon: Mountain,
  count: 0,
  id: "movimiento-tierra"
}, {
  title: "CONSTRUCCIÓN",
  icon: Hammer,
  count: 0,
  id: "construccion"
}, {
  title: "DESARROLLO",
  icon: Home,
  count: 0,
  id: "desarrollo"
}, {
  title: "COMERCIAL",
  icon: Store,
  count: 0,
  id: "comercial"
}, {
  title: "ASSET MANAGEMENT",
  icon: MapPin,
  count: 0,
  id: "asset-management"
}, {
  title: "CLÍNICA SANTA CLARITA",
  icon: Heart,
  count: 0,
  id: "clinica-santa-clarita"
}];

interface AppSidebarProps {
  onDirectionSelect: (directionId: string) => void;
  selectedDirection: string;
  onToggleView: () => void;
}

export function AppSidebar({
  onDirectionSelect,
  selectedDirection,
  onToggleView
}: AppSidebarProps) {
  return <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Implementaciones</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Por Dirección</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {directions.map(direction => <SidebarMenuItem key={direction.id}>
                  <SidebarMenuButton asChild isActive={selectedDirection === direction.id}>
                    <button 
                      onClick={() => onDirectionSelect(direction.id)} 
                      className={`w-full flex items-center gap-2 px-2 py-2 text-left hover:bg-gray-100 rounded-md ${
                        direction.extraSpacing ? 'my-1' : ''
                      }`}
                    >
                      <direction.icon className="h-4 w-4" />
                      <span className="flex-1 text-sm">{direction.title}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${direction.count > 0 ? 'bg-red-100 text-red-700 font-medium' : 'bg-gray-200 text-gray-700'}`}>
                        ({direction.count})
                      </span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Current View Section at bottom */}
        <div className="mt-auto p-2 border-t border-gray-200">
          <div className="mb-2 px-3 py-1">
            <span className="text-xs text-gray-500 font-medium">Vista Administrador</span>
          </div>
          <button onClick={onToggleView} className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Cambiar a Vista de Usuario</span>
            </div>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </SidebarContent>
    </Sidebar>;
}
