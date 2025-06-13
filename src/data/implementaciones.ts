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

// Crear estructura base para reutilizar en otras implementaciones
const createBaseSectionData = (factor: number = 1): SectionData => ({
  manoDeObra: { 
    duracion: Math.round(15 * factor), 
    duracionJustificacion: 'Capacitación del personal especializado', 
    monto: Math.round(45000 * factor), 
    montoJustificacion: 'Salarios durante capacitación y consultorías', 
    calidad: 'Alta - Personal especializado', 
    descripcion: 'Capacitación de personal en nuevos procesos y sistemas' 
  },
  metodologia: { 
    duracion: Math.round(10 * factor), 
    duracionJustificacion: 'Análisis y diseño de procesos', 
    monto: Math.round(25000 * factor), 
    montoJustificacion: 'Consultoría especializada', 
    calidad: 'Excelente - Metodología probada', 
    descripcion: 'Implementación de metodologías optimizadas' 
  },
  medicion: { 
    duracion: Math.round(5 * factor), 
    duracionJustificacion: 'Definición de KPIs y métricas', 
    monto: Math.round(15000 * factor), 
    montoJustificacion: 'Software de medición', 
    calidad: 'Alta - Métricas precisas', 
    descripcion: 'Sistema de métricas y control de calidad' 
  },
  maquinaria: { 
    duracion: Math.round(7 * factor), 
    duracionJustificacion: 'Instalación y configuración', 
    monto: Math.round(120000 * factor), 
    montoJustificacion: 'Equipos y tecnología', 
    calidad: 'Excelente - Equipos de última generación', 
    descripcion: 'Adquisición e instalación de equipos especializados' 
  },
  materiales: { 
    duracion: Math.round(3 * factor), 
    duracionJustificacion: 'Adquisición de materiales', 
    monto: Math.round(30000 * factor), 
    montoJustificacion: 'Materiales y suministros', 
    calidad: 'Alta - Materiales certificados', 
    descripcion: 'Adquisición de materiales y suministros necesarios' 
  },
  medioAmbiente: { 
    duracion: Math.round(5 * factor), 
    duracionJustificacion: 'Adecuaciones ambientales', 
    monto: Math.round(20000 * factor), 
    montoJustificacion: 'Adecuaciones y climatización', 
    calidad: 'Buena - Cumple estándares ambientales', 
    descripcion: 'Adecuaciones ambientales y de seguridad' 
  }
});

const createBaseOperationData = (factor: number = 1): SectionData => ({
  manoDeObra: { 
    duracion: 0, 
    duracionJustificacion: '', 
    monto: Math.round(180000 * factor), 
    montoJustificacion: 'Salarios anuales', 
    calidad: 'Alta - Personal capacitado', 
    descripcion: 'Operación por personal especializado' 
  },
  metodologia: { 
    duracion: 0, 
    duracionJustificacion: '', 
    monto: Math.round(12000 * factor), 
    montoJustificacion: 'Mantenimiento de procesos', 
    calidad: 'Excelente - Mejora continua', 
    descripcion: 'Mantenimiento y optimización continua' 
  },
  medicion: { 
    duracion: 0, 
    duracionJustificacion: '', 
    monto: Math.round(8000 * factor), 
    montoJustificacion: 'Licencias anuales', 
    calidad: 'Alta - Monitoreo constante', 
    descripcion: 'Operación del sistema de métricas' 
  },
  maquinaria: { 
    duracion: 0, 
    duracionJustificacion: '', 
    monto: Math.round(25000 * factor), 
    montoJustificacion: 'Mantenimiento anual', 
    calidad: 'Excelente - Mantenimiento preventivo', 
    descripcion: 'Mantenimiento de equipos' 
  },
  materiales: { 
    duracion: 0, 
    duracionJustificacion: '', 
    monto: Math.round(15000 * factor), 
    montoJustificacion: 'Suministros anuales', 
    calidad: 'Alta - Renovación oportuna', 
    descripcion: 'Suministros operativos anuales' 
  },
  medioAmbiente: { 
    duracion: 0, 
    duracionJustificacion: '', 
    monto: Math.round(10000 * factor), 
    montoJustificacion: 'Mantenimiento de instalaciones', 
    calidad: 'Buena - Mantenimiento programado', 
    descripcion: 'Mantenimiento de instalaciones' 
  }
});

// ADMINISTRACIÓN - Implementaciones adicionales
const administracionExample2: ProjectHeaderData = {
  direccion: 'ADMINISTRACIÓN',
  gerencia: 'Gerencia de Recursos Humanos',
  nombreImplementacion: 'Sistema Integral de Gestión de Recursos Humanos',
  razon1: 'Automatiza los procesos de contratación, nómina y evaluación de desempeño reduciendo errores manuales.',
  razon2: 'Mejora la experiencia del empleado con autoservicios y acceso digital a información laboral.',
  razon3: 'Proporciona analíticas avanzadas para la toma de decisiones estratégicas en gestión de talento.'
};

const administracionExample3: ProjectHeaderData = {
  direccion: 'ADMINISTRACIÓN',
  gerencia: 'Gerencia Administrativa',
  nombreImplementacion: 'Modernización del Sistema de Correspondencia',
  razon1: 'Digitaliza el proceso de manejo de correspondencia interna y externa.',
  razon2: 'Reduce tiempos de entrega y mejora el seguimiento de documentos importantes.',
  razon3: 'Implementa un sistema de trazabilidad completo para auditorías.'
};

// FISCAL
const fiscalExample1: ProjectHeaderData = {
  direccion: 'FISCAL',
  gerencia: 'Gerencia Fiscal',
  nombreImplementacion: 'Sistema Automatizado de Control Tributario',
  razon1: 'Garantiza el cumplimiento de obligaciones fiscales y reduce el riesgo de sanciones por parte del SAT.',
  razon2: 'Automatiza la generación de declaraciones y reportes fiscales mensuales y anuales.',
  razon3: 'Optimiza la planeación fiscal mediante análisis predictivos y escenarios de ahorro tributario.'
};

const fiscalExample2: ProjectHeaderData = {
  direccion: 'FISCAL',
  gerencia: 'Gerencia Fiscal',
  nombreImplementacion: 'Plataforma de Facturación Electrónica Avanzada',
  razon1: 'Moderniza el proceso de facturación con cumplimiento total de normas SAT.',
  razon2: 'Integra automáticamente con sistemas contables y de inventario.',
  razon3: 'Reduce errores y tiempos en el proceso de facturación.'
};

// FINANZAS
const finanzasExample1: ProjectHeaderData = {
  direccion: 'FINANZAS',
  gerencia: 'Gerencia de Finanzas',
  nombreImplementacion: 'Sistema de Control y Análisis Financiero',
  razon1: 'Mejora la precisión en la elaboración de estados financieros y reportes de gestión.',
  razon2: 'Facilita el control de flujo de efectivo y la proyección de necesidades de liquidez.',
  razon3: 'Proporciona dashboards ejecutivos para la toma de decisiones financieras estratégicas.'
};

const finanzasExample2: ProjectHeaderData = {
  direccion: 'FINANZAS',
  gerencia: 'Gerencia de Finanzas',
  nombreImplementacion: 'Sistema de Gestión de Tesorería',
  razon1: 'Optimiza la gestión de efectivo y inversiones a corto plazo.',
  razon2: 'Automatiza procesos de conciliación bancaria y control de pagos.',
  razon3: 'Mejora la proyección de flujos de efectivo y planificación financiera.'
};

// TECNOLOGÍA
const tecnologiaExample1: ProjectHeaderData = {
  direccion: 'TECNOLOGÍA',
  gerencia: 'Gerencia de TI',
  nombreImplementacion: 'Migración a Infraestructura Cloud Híbrida',
  razon1: 'Reduce costos operativos de infraestructura y mejora la escalabilidad de los sistemas.',
  razon2: 'Aumenta la disponibilidad y seguridad de los datos con respaldos automatizados.',
  razon3: 'Facilita el trabajo remoto y la colaboración entre equipos distribuidos.'
};

const tecnologiaExample2: ProjectHeaderData = {
  direccion: 'TECNOLOGÍA',
  gerencia: 'Gerencia de TI',
  nombreImplementacion: 'Sistema de Ciberseguridad Avanzado',
  razon1: 'Protege la información sensible contra amenazas cibernéticas actuales.',
  razon2: 'Implementa monitoreo 24/7 y respuesta automática a incidentes.',
  razon3: 'Cumple con estándares internacionales de seguridad de la información.'
};

// CAPITAL HUMANO
const capitalHumanoExample1: ProjectHeaderData = {
  direccion: 'CAPITAL HUMANO',
  gerencia: 'Gerencia de Capital Humano',
  nombreImplementacion: 'Programa de Desarrollo y Capacitación Continua',
  razon1: 'Mejora las competencias técnicas y blandas del personal aumentando la productividad.',
  razon2: 'Reduce la rotación de personal mediante planes de carrera claros y desarrollo profesional.',
  razon3: 'Fortalece la cultura organizacional y el compromiso de los empleados con la empresa.'
};

const capitalHumanoExample2: ProjectHeaderData = {
  direccion: 'CAPITAL HUMANO',
  gerencia: 'Gerencia de Capital Humano',
  nombreImplementacion: 'Sistema de Evaluación de Desempeño 360°',
  razon1: 'Implementa un sistema integral de evaluación con múltiples perspectivas.',
  razon2: 'Mejora la objetividad en las evaluaciones y desarrollo de planes de mejora.',
  razon3: 'Facilita la identificación de talento y necesidades de capacitación.'
};

// MAQUINARIA
const maquinariaExample1: ProjectHeaderData = {
  direccion: 'MAQUINARIA',
  gerencia: 'Gerencia de Operaciones',
  nombreImplementacion: 'Sistema de Mantenimiento Predictivo con IoT',
  razon1: 'Reduce costos de mantenimiento mediante la predicción de fallas antes de que ocurran.',
  razon2: 'Aumenta la disponibilidad de equipos y reduce tiempos de paro no programados.',
  razon3: 'Optimiza el inventario de refacciones basado en datos reales de desgaste de componentes.'
};

const maquinariaExample2: ProjectHeaderData = {
  direccion: 'MAQUINARIA',
  gerencia: 'Gerencia de Operaciones',
  nombreImplementacion: 'Sistema de Gestión de Flota Vehicular',
  razon1: 'Optimiza el uso y mantenimiento de la flota vehicular de la empresa.',
  razon2: 'Reduce costos operativos y mejora la seguridad de los operadores.',
  razon3: 'Implementa seguimiento GPS y monitoreo de combustible en tiempo real.'
};

// CONSTRUCCIÓN
const construccionExample1: ProjectHeaderData = {
  direccion: 'CONSTRUCCIÓN',
  gerencia: 'Gerencia de Construcción',
  nombreImplementacion: 'Sistema BIM para Gestión de Proyectos',
  razon1: 'Moderniza la gestión de proyectos constructivos con tecnología BIM.',
  razon2: 'Mejora la coordinación entre equipos y reduce errores de diseño.',
  razon3: 'Optimiza tiempos de construcción y control de costos.'
};

const construccionExample2: ProjectHeaderData = {
  direccion: 'CONSTRUCCIÓN',
  gerencia: 'Gerencia de Construcción',
  nombreImplementacion: 'Plataforma de Control de Calidad en Obra',
  razon1: 'Implementa controles de calidad digitales en tiempo real.',
  razon2: 'Reduce defectos y mejora la satisfacción del cliente final.',
  razon3: 'Genera reportes automáticos de avance y cumplimiento.'
};

// COMERCIAL
const comercialExample1: ProjectHeaderData = {
  direccion: 'COMERCIAL',
  gerencia: 'Gerencia Comercial',
  nombreImplementacion: 'CRM Avanzado para Gestión de Clientes',
  razon1: 'Centraliza la información de clientes y mejora el seguimiento de oportunidades.',
  razon2: 'Automatiza procesos de venta y mejora la experiencia del cliente.',
  razon3: 'Proporciona analíticas de ventas para mejor toma de decisiones.'
};

const comercialExample2: ProjectHeaderData = {
  direccion: 'COMERCIAL',
  gerencia: 'Gerencia Comercial',
  nombreImplementacion: 'Plataforma de Marketing Digital',
  razon1: 'Desarrolla presencia digital y automatiza campañas de marketing.',
  razon2: 'Mejora la generación de leads y conversión de prospectos.',
  razon3: 'Integra múltiples canales digitales en una sola plataforma.'
};

// DESARROLLO
const desarrolloExample1: ProjectHeaderData = {
  direccion: 'DESARROLLO',
  gerencia: 'Gerencia de Desarrollo',
  nombreImplementacion: 'Sistema de Gestión de Proyectos Inmobiliarios',
  razon1: 'Centraliza la gestión de desarrollos inmobiliarios desde la concepción hasta entrega.',
  razon2: 'Mejora el control de tiempos, costos y calidad en desarrollos.',
  razon3: 'Facilita la comunicación con inversionistas y compradores.'
};

const desarrolloExample2: ProjectHeaderData = {
  direccion: 'DESARROLLO',
  gerencia: 'Gerencia de Desarrollo',
  nombreImplementacion: 'Plataforma de Ventas Inmobiliarias Digital',
  razon1: 'Moderniza el proceso de ventas con herramientas digitales interactivas.',
  razon2: 'Mejora la experiencia del cliente con tours virtuales y configuradores.',
  razon3: 'Acelera el proceso de cierre de ventas y documentación.'
};

// ASSET MANAGEMENT
const assetExample1: ProjectHeaderData = {
  direccion: 'ASSET MANAGEMENT',
  gerencia: 'Gerencia de Asset Management',
  nombreImplementacion: 'Sistema de Gestión de Activos Inmobiliarios',
  razon1: 'Optimiza la gestión y rentabilidad de los activos inmobiliarios.',
  razon2: 'Automatiza procesos de mantenimiento y administración de propiedades.',
  razon3: 'Mejora el control financiero y reporte de desempeño de activos.'
};

// CLÍNICA SANTA CLARITA
const clinicaExample1: ProjectHeaderData = {
  direccion: 'CLÍNICA SANTA CLARITA',
  gerencia: 'Dirección Médica',
  nombreImplementacion: 'Sistema de Historia Clínica Electrónica',
  razon1: 'Digitaliza completamente los expedientes médicos para mejor acceso y seguridad.',
  razon2: 'Mejora la coordinación entre especialidades y continuidad de atención.',
  razon3: 'Cumple con normativas de salud y facilita reportes epidemiológicos.'
};

const clinicaExample2: ProjectHeaderData = {
  direccion: 'CLÍNICA SANTA CLARITA',
  gerencia: 'Dirección Médica',
  nombreImplementacion: 'Plataforma de Telemedicina',
  razon1: 'Expande el acceso a servicios médicos mediante consultas remotas.',
  razon2: 'Reduce tiempos de espera y mejora la eficiencia operativa.',
  razon3: 'Permite seguimiento continuo de pacientes crónicos.'
};

export const implementacionesData = {
  // ATISA - Desarrollo
  desarrollo: [
    {
      header: {
        direccion: 'DESARROLLO',
        gerencia: 'Gerencia de Desarrollo',
        nombreImplementacion: 'Sistema de Gestión de Proyectos Inmobiliarios',
        razon1: 'Centraliza la gestión de desarrollos inmobiliarios desde la concepción hasta entrega.',
        razon2: 'Mejora el control de tiempos, costos y calidad en desarrollos.',
        razon3: 'Facilita la comunicación con inversionistas y compradores.'
      },
      implementacion: createBaseSectionData(1.3),
      operacion: createBaseOperationData(1.3)
    },
    {
      header: {
        direccion: 'DESARROLLO',
        gerencia: 'Gerencia de Desarrollo',
        nombreImplementacion: 'Plataforma de Ventas Inmobiliarias Digital',
        razon1: 'Moderniza el proceso de ventas con herramientas digitales interactivas.',
        razon2: 'Mejora la experiencia del cliente con tours virtuales y configuradores.',
        razon3: 'Acelera el proceso de cierre de ventas y documentación.'
      },
      implementacion: createBaseSectionData(1.1),
      operacion: createBaseOperationData(1.1)
    }
  ],

  // ATISA - Costos y Proyectos (antes proyectos-presupuestos)
  'costos-proyectos': [
    {
      header: {
        direccion: 'COSTOS Y PROYECTOS',
        gerencia: 'Gerencia de Proyectos',
        nombreImplementacion: 'Sistema de Control de Proyectos PMO',
        razon1: 'Estandariza la gestión de proyectos con metodologías PMI.',
        razon2: 'Mejora el control de tiempos, costos y recursos.',
        razon3: 'Facilita el reporte ejecutivo y toma de decisiones.'
      },
      implementacion: createBaseSectionData(1.0),
      operacion: createBaseOperationData(1.0)
    }
  ],

  administracion: [
    {
      header: administracionExample1,
      implementacion: administracionImplementacion1,
      operacion: administracionOperacion1
    },
    {
      header: administracionExample2,
      implementacion: createBaseSectionData(0.8),
      operacion: createBaseOperationData(0.8)
    },
    {
      header: administracionExample3,
      implementacion: createBaseSectionData(0.6),
      operacion: createBaseOperationData(0.6)
    }
  ],

  fiscal: [
    {
      header: fiscalExample1,
      implementacion: createBaseSectionData(1.2),
      operacion: createBaseOperationData(1.2)
    },
    {
      header: fiscalExample2,
      implementacion: createBaseSectionData(0.9),
      operacion: createBaseOperationData(0.9)
    }
  ],

  legal: [
    {
      header: {
        direccion: 'LEGAL',
        gerencia: 'Gerencia Legal',
        nombreImplementacion: 'Sistema de Gestión Jurídica Digital',
        razon1: 'Centraliza la gestión de asuntos legales y contratos.',
        razon2: 'Automatiza seguimiento de procesos y vencimientos.',
        razon3: 'Mejora el control de riesgos legales y cumplimiento normativo.'
      },
      implementacion: createBaseSectionData(0.7),
      operacion: createBaseOperationData(0.7)
    }
  ],

  finanzas: [
    {
      header: finanzasExample1,
      implementacion: createBaseSectionData(1.1),
      operacion: createBaseOperationData(1.1)
    },
    {
      header: finanzasExample2,
      implementacion: createBaseSectionData(0.9),
      operacion: createBaseOperationData(0.9)
    }
  ],

  'capital-humano': [
    {
      header: capitalHumanoExample1,
      implementacion: createBaseSectionData(0.8),
      operacion: createBaseOperationData(0.8)
    },
    {
      header: capitalHumanoExample2,
      implementacion: createBaseSectionData(0.7),
      operacion: createBaseOperationData(0.7)
    }
  ],

  tecnologia: [
    {
      header: tecnologiaExample1,
      implementacion: createBaseSectionData(1.5),
      operacion: createBaseOperationData(1.5)
    },
    {
      header: tecnologiaExample2,
      implementacion: createBaseSectionData(1.3),
      operacion: createBaseOperationData(1.3)
    }
  ],

  'cadena-suministros': [
    {
      header: {
        direccion: 'CADENA DE SUMINISTRO',
        gerencia: 'Gerencia de Supply Chain',
        nombreImplementacion: 'Sistema ERP de Gestión de Inventarios',
        razon1: 'Optimiza la gestión de inventarios y cadena de suministros.',
        razon2: 'Reduce costos de almacenamiento y mejora rotación.',
        razon3: 'Automatiza procesos de compras y gestión de proveedores.'
      },
      implementacion: createBaseSectionData(1.2),
      operacion: createBaseOperationData(1.2)
    }
  ],

  maquinaria: [
    {
      header: maquinariaExample1,
      implementacion: createBaseSectionData(1.4),
      operacion: createBaseOperationData(1.4)
    },
    {
      header: maquinariaExample2,
      implementacion: createBaseSectionData(1.1),
      operacion: createBaseOperationData(1.1)
    }
  ],

  'movimiento-tierra': [
    {
      header: {
        direccion: 'MOVIMIENTO DE TIERRA',
        gerencia: 'Gerencia de Operaciones',
        nombreImplementacion: 'Sistema de Control Topográfico GPS',
        razon1: 'Mejora la precisión en trabajos de movimiento de tierra.',
        razon2: 'Reduce desperdicios y optimiza rendimientos.',
        razon3: 'Facilita el control de calidad y cumplimiento de especificaciones.'
      },
      implementacion: createBaseSectionData(1.3),
      operacion: createBaseOperationData(1.3)
    }
  ],

  construccion: [
    {
      header: construccionExample1,
      implementacion: createBaseSectionData(1.6),
      operacion: createBaseOperationData(1.6)
    },
    {
      header: construccionExample2,
      implementacion: createBaseSectionData(1.0),
      operacion: createBaseOperationData(1.0)
    }
  ],

  comercial: [
    {
      header: comercialExample1,
      implementacion: createBaseSectionData(0.9),
      operacion: createBaseOperationData(0.9)
    },
    {
      header: comercialExample2,
      implementacion: createBaseSectionData(0.8),
      operacion: createBaseOperationData(0.8)
    }
  ],

  'asset-management': [
    {
      header: assetExample1,
      implementacion: createBaseSectionData(1.2),
      operacion: createBaseOperationData(1.2)
    }
  ],

  'clinica-santa-clarita': [
    {
      header: clinicaExample1,
      implementacion: createBaseSectionData(1.4),
      operacion: createBaseOperationData(1.4)
    },
    {
      header: clinicaExample2,
      implementacion: createBaseSectionData(1.0),
      operacion: createBaseOperationData(1.0)
    }
  ]
};
