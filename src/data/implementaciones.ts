
import { ProjectHeaderData, SectionData } from '@/types/project';

// Administración - Sistema de Control de Gestión Documental
export const administracionExample1: ProjectHeaderData = {
  direccion: 'ADMINISTRACIÓN',
  gerencia: 'Gerencia General',
  nombreImplementacion: 'Sistema de Control de Gestión Documental',
  razon1: 'Mejora la eficiencia en el manejo de documentos administrativos y reduce los tiempos de búsqueda y archivo.',
  razon2: 'Garantiza el cumplimiento de normativas legales y auditorías mediante un control adecuado de la documentación.',
  razon3: 'Facilita el acceso remoto a documentos importantes y mejora la colaboración entre departamentos.'
};

export const administracionImplementacion1: SectionData = {
  manoDeObra: { 
    duracion: 15, 
    duracionJustificacion: 'Capacitación del personal en nuevos procesos', 
    monto: 45000, 
    montoJustificacion: 'Salarios durante capacitación y consultorías', 
    calidad: 'Alta - Personal especializado en gestión documental', 
    descripcion: 'Capacitación de 10 empleados en el nuevo sistema de gestión documental y procesos administrativos' 
  },
  metodologia: { 
    duracion: 10, 
    duracionJustificacion: 'Análisis y diseño de procesos optimizados', 
    monto: 25000, 
    montoJustificacion: 'Consultoría especializada en metodologías', 
    calidad: 'Excelente - Metodología probada en organizaciones similares', 
    descripcion: 'Implementación de metodología LEAN para optimizar procesos administrativos y flujos de trabajo' 
  },
  medicion: { 
    duracion: 5, 
    duracionJustificacion: 'Definición de KPIs y métricas de control', 
    monto: 15000, 
    montoJustificacion: 'Software de medición y dashboard', 
    calidad: 'Alta - Métricas precisas y en tiempo real', 
    descripcion: 'Sistema de métricas para medir eficiencia en gestión documental y tiempos de respuesta' 
  },
  maquinaria: { 
    duracion: 7, 
    duracionJustificacion: 'Instalación y configuración de equipos', 
    monto: 120000, 
    montoJustificacion: 'Servidores, escáneres y equipos de digitalización', 
    calidad: 'Excelente - Equipos de última generación con garantía extendida', 
    descripcion: 'Servidores para almacenamiento, escáneres industriales y equipos de digitalización masiva' 
  },
  materiales: { 
    duracion: 3, 
    duracionJustificacion: 'Adquisición e instalación de materiales', 
    monto: 30000, 
    montoJustificacion: 'Software, licencias y materiales de oficina', 
    calidad: 'Alta - Software licenciado y materiales certificados', 
    descripcion: 'Licencias de software de gestión documental, material de archivo y suministros de oficina' 
  },
  medioAmbiente: { 
    duracion: 5, 
    duracionJustificacion: 'Adecuación de espacios y medidas ambientales', 
    monto: 20000, 
    montoJustificacion: 'Climatización y adecuación de espacios', 
    calidad: 'Buena - Cumple con estándares ambientales requeridos', 
    descripcion: 'Acondicionamiento de espacios para archivo digital, climatización adecuada y medidas de seguridad' 
  }
};

export const administracionOperacion1: SectionData = {
  manoDeObra: { 
    duracion: 0, 
    duracionJustificacion: '', 
    monto: 180000, 
    montoJustificacion: 'Salarios anuales del personal especializado', 
    calidad: 'Alta - Personal capacitado y certificado', 
    descripcion: 'Operación del sistema por personal especializado en gestión documental (2 empleados)' 
  },
  metodologia: { 
    duracion: 0, 
    duracionJustificacion: '', 
    monto: 12000, 
    montoJustificacion: 'Mantenimiento y actualización de procesos', 
    calidad: 'Excelente - Mejora continua de procesos', 
    descripcion: 'Mantenimiento y optimización continua de metodologías implementadas' 
  },
  medicion: { 
    duracion: 0, 
    duracionJustificacion: '', 
    monto: 8000, 
    montoJustificacion: 'Licencias anuales de software de métricas', 
    calidad: 'Alta - Monitoreo constante de indicadores', 
    descripcion: 'Operación del sistema de métricas y generación de reportes mensuales' 
  },
  maquinaria: { 
    duracion: 0, 
    duracionJustificacion: '', 
    monto: 25000, 
    montoJustificacion: 'Mantenimiento anual de equipos', 
    calidad: 'Excelente - Mantenimiento preventivo programado', 
    descripcion: 'Mantenimiento preventivo y correctivo de servidores y equipos de digitalización' 
  },
  materiales: { 
    duracion: 0, 
    duracionJustificacion: '', 
    monto: 15000, 
    montoJustificacion: 'Licencias anuales y suministros', 
    calidad: 'Alta - Renovación oportuna de licencias', 
    descripcion: 'Renovación de licencias de software y suministros operativos anuales' 
  },
  medioAmbiente: { 
    duracion: 0, 
    duracionJustificacion: '', 
    monto: 10000, 
    montoJustificacion: 'Mantenimiento de instalaciones', 
    calidad: 'Buena - Mantenimiento programado de instalaciones', 
    descripcion: 'Mantenimiento de climatización y sistemas de seguridad en espacios de archivo' 
  }
};

// Administración - Sistema de Gestión de Recursos Humanos
export const administracionExample2: ProjectHeaderData = {
  direccion: 'ADMINISTRACIÓN',
  gerencia: 'Gerencia de Recursos Humanos',
  nombreImplementacion: 'Sistema Integral de Gestión de Recursos Humanos',
  razon1: 'Automatiza los procesos de contratación, nómina y evaluación de desempeño reduciendo errores manuales.',
  razon2: 'Mejora la experiencia del empleado con autoservicios y acceso digital a información laboral.',
  razon3: 'Proporciona analíticas avanzadas para la toma de decisiones estratégicas en gestión de talento.'
};

// Fiscal - Sistema de Control Tributario
export const fiscalExample: ProjectHeaderData = {
  direccion: 'FISCAL',
  gerencia: 'Gerencia Fiscal',
  nombreImplementacion: 'Sistema Automatizado de Control Tributario',
  razon1: 'Garantiza el cumplimiento de obligaciones fiscales y reduce el riesgo de sanciones por parte del SAT.',
  razon2: 'Automatiza la generación de declaraciones y reportes fiscales mensuales y anuales.',
  razon3: 'Optimiza la planeación fiscal mediante análisis predictivos y escenarios de ahorro tributario.'
};

// Finanzas - Sistema de Control Financiero
export const finanzasExample: ProjectHeaderData = {
  direccion: 'FINANZAS',
  gerencia: 'Gerencia de Finanzas',
  nombreImplementacion: 'Sistema de Control y Análisis Financiero',
  razon1: 'Mejora la precisión en la elaboración de estados financieros y reportes de gestión.',
  razon2: 'Facilita el control de flujo de efectivo y la proyección de necesidades de liquidez.',
  razon3: 'Proporciona dashboards ejecutivos para la toma de decisiones financieras estratégicas.'
};

// Tecnología - Infraestructura Cloud
export const tecnologiaExample: ProjectHeaderData = {
  direccion: 'TECNOLOGÍA Y SISTEMAS',
  gerencia: 'Gerencia de TI',
  nombreImplementacion: 'Migración a Infraestructura Cloud Híbrida',
  razon1: 'Reduce costos operativos de infraestructura y mejora la escalabilidad de los sistemas.',
  razon2: 'Aumenta la disponibilidad y seguridad de los datos con respaldos automatizados.',
  razon3: 'Facilita el trabajo remoto y la colaboración entre equipos distribuidos.'
};

// Capital Humano - Programa de Capacitación
export const capitalHumanoExample: ProjectHeaderData = {
  direccion: 'CAPITAL HUMANO',
  gerencia: 'Gerencia de Capital Humano',
  nombreImplementacion: 'Programa de Desarrollo y Capacitación Continua',
  razon1: 'Mejora las competencias técnicas y blandas del personal aumentando la productividad.',
  razon2: 'Reduce la rotación de personal mediante planes de carrera claros y desarrollo profesional.',
  razon3: 'Fortalece la cultura organizacional y el compromiso de los empleados con la empresa.'
};

// Maquinaria - Sistema de Mantenimiento Predictivo
export const maquinariaExample: ProjectHeaderData = {
  direccion: 'MAQUINARIA',
  gerencia: 'Gerencia de Operaciones',
  nombreImplementacion: 'Sistema de Mantenimiento Predictivo con IoT',
  razon1: 'Reduce costos de mantenimiento mediante la predicción de fallas antes de que ocurran.',
  razon2: 'Aumenta la disponibilidad de equipos y reduce tiempos de paro no programados.',
  razon3: 'Optimiza el inventario de refacciones basado en datos reales de desgaste de componentes.'
};

export const implementacionesData = {
  administracion: [
    {
      header: administracionExample1,
      implementacion: administracionImplementacion1,
      operacion: administracionOperacion1
    },
    {
      header: administracionExample2,
      implementacion: administracionImplementacion1, // Reusing for simplicity
      operacion: administracionOperacion1
    }
  ],
  fiscal: [
    {
      header: fiscalExample,
      implementacion: administracionImplementacion1, // Reusing structure with different context
      operacion: administracionOperacion1
    }
  ],
  finanzas: [
    {
      header: finanzasExample,
      implementacion: administracionImplementacion1,
      operacion: administracionOperacion1
    }
  ],
  tecnologia: [
    {
      header: tecnologiaExample,
      implementacion: administracionImplementacion1,
      operacion: administracionOperacion1
    }
  ],
  'capital-humano': [
    {
      header: capitalHumanoExample,
      implementacion: administracionImplementacion1,
      operacion: administracionOperacion1
    }
  ],
  maquinaria: [
    {
      header: maquinariaExample,
      implementacion: administracionImplementacion1,
      operacion: administracionOperacion1
    }
  ]
};
