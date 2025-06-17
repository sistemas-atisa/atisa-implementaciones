
// Centralized icons file for the application
// All icons used in the sidebar are organized here by categories

import {
  // System icons
  FileText,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  
  // Company icons
  Building2,
  Briefcase,
  Stethoscope,
  Shield,
  Users,
  TrendingUp,
  
  // Direction icons
  Home,
  Target,
  ShoppingCart,
  Wrench,
  Truck,
  HardHat,
  Calculator,
} from 'lucide-react';

// System Icons - Used for navigation and UI elements
export const SystemIcons = {
  FileText,      // Main sidebar header icon
  ChevronDown,   // Expanded group indicator
  ChevronRight,  // Collapsed group indicator
  ArrowRight,    // Navigation arrows
} as const;

// Company Icons - Used for different business entities
export const CompanyIcons = {
  Building2,     // ATISA, Asset Management, Administración
  Briefcase,     // Family Office, Comercial
  Stethoscope,   // Clínica Santa Clarita
  Shield,        // Cama de Luz Roja, Legal
  Users,         // Mentoraje, Capital Humano
  TrendingUp,    // Endowment, Finanzas
} as const;

// Direction Icons - Used for different business directions within companies
export const DirectionIcons = {
  Home,          // Desarrollo
  Target,        // Costos y Proyectos
  ShoppingCart,  // Cadena de Suministro
  Wrench,        // Maquinaria, Tecnología
  Truck,         // Movimiento de Tierra
  HardHat,       // Construcción
  Calculator,    // Fiscal
} as const;

// Combined export for easy access to all icons
export const AllIcons = {
  ...SystemIcons,
  ...CompanyIcons,
  ...DirectionIcons,
} as const;

// Type definitions for better TypeScript support
export type SystemIconName = keyof typeof SystemIcons;
export type CompanyIconName = keyof typeof CompanyIcons;
export type DirectionIconName = keyof typeof DirectionIcons;
export type IconName = keyof typeof AllIcons;
