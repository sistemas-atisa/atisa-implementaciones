import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
const SixMsAnalysis = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const sixMsData = [{
    title: "#1 Mano de obra (Personal y Capacitación)",
    question: "¿Qué implica?",
    description: "Analizar si la implementación afecta la cantidad de personal requerido, la carga de trabajo o la necesidad de capacitación.",
    examples: "Necesidad de contratar, reasignar personal, impacto en productividad o requerimientos de capacitación."
  }, {
    title: "#2 Metodología (Procesos y Mejores Prácticas)",
    question: "¿Qué implica?",
    description: "Identificar cambios en los procesos operativos, flujos de trabajo o metodologías utilizadas.",
    examples: "Optimización de procesos, implementación de nuevas prácticas, digitalización, automatización, mejora en tiempos de entrega."
  }, {
    title: "#3 Medición (Indicadores y Evaluación del Desempeño)",
    question: "¿Qué implica?",
    description: "Definir cómo se medirá el éxito de la implementación y qué métricas se utilizarán para evaluar su impacto.",
    examples: "KPIs, productividad, tiempos de ejecución, costos antes y después, calidad de entregables, satisfacción del cliente o stakeholders."
  }, {
    title: "#4 Maquinaria (Equipos y Tecnología)",
    question: "¿Qué implica?",
    description: "Determinar si la implementación requiere nueva maquinaria, herramientas, software o actualizaciones tecnológicas.",
    examples: "Compra o mantenimiento de maquinaria, implementación de software, o herramientas para automatización de procesos."
  }, {
    title: "#5 Materiales (Insumos y Suministros)",
    question: "¿Qué implica?",
    description: "Evaluar si la implementación afecta los materiales utilizados, su disponibilidad, costos o calidad.",
    examples: "Cambio de proveedores, uso de materiales más eficientes, reducción de desperdicios."
  }, {
    title: "#6 Medio Ambiente (Contexto Global y Factores Externos)",
    question: "¿Qué implica?",
    description: "Analizar la disponibilidad de flujo y otros factores como regulaciones, economía, política, mercado y geografía que puedan influir en la implementación.",
    examples: "Cambios en leyes, fluctuaciones económicas, estabilidad política, disponibilidad de insumos, desastres naturales."
  }];
  return <Card className="mt-8 bg-white border-gray-200 shadow-lg">
      <div className="p-6 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors duration-200" onClick={() => setIsCollapsed(!isCollapsed)}>
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            📊 Análisis de las 6M's
          </h2>
          <span className="text-sm text-gray-600 italic"> </span>
        </div>
        {isCollapsed ? <ChevronDown className="h-5 w-5 text-gray-500" /> : <ChevronUp className="h-5 w-5 text-gray-500" />}
      </div>
      
      {!isCollapsed && <div className="px-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sixMsData.map((item, index) => <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold text-red-600 mb-2">{item.title}</h3>
                <p className="text-sm font-medium text-gray-800 mb-1">{item.question}</p>
                <p className="text-sm text-gray-700 mb-3">{item.description}</p>
                <div>
                  <span className="text-sm font-medium text-gray-800">Ejemplos: </span>
                  <span className="text-sm text-gray-600">{item.examples}</span>
                </div>
              </div>)}
          </div>
        </div>}
    </Card>;
};
export default SixMsAnalysis;